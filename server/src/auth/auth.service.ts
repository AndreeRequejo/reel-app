/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // ─── Registro ────────────────────────────────────────────────
  async register(dto: RegisterDto) {
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) throw new ConflictException('El email ya está registrado');

    // Argon2id con parámetros OWASP recomendados
    const hash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64MB
      timeCost: 3, // iteraciones
      parallelism: 4,
    });

    const user = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      password: hash,
    });

    const { password, hashedRefreshToken, ...result } = user;
    return result;
  }

  // ─── Login ───────────────────────────────────────────────────
  async login(dto: LoginDto, res: Response) {
    const user = await this.usersService.findByEmail(dto.email);

    // Mismo mensaje genérico para email incorrecto y contraseña incorrecta
    // Evita user enumeration attack
    if (!user) {
      await argon2.hash('dummy_password');
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValid = await argon2.verify(user.password, dto.password);
    if (!passwordValid)
      throw new UnauthorizedException('Credenciales inválidas');

    const tokens = await this.generateTokens(user.id, user.email);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    this.setRefreshCookie(res, tokens.refreshToken);

    return { access_token: tokens.accessToken };
  }

  // ─── Refresh ─────────────────────────────────────────────────
  async refresh(userId: string, refreshToken: string, res: Response) {
    const user = await this.usersService.findById(userId);
    if (!user?.hashedRefreshToken)
      throw new ForbiddenException('Acceso denegado');

    // Verifica que el refresh token coincida con el guardado en DB
    const tokenValid = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!tokenValid) throw new ForbiddenException('Refresh token inválido');

    const tokens = await this.generateTokens(user.id, user.email);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    this.setRefreshCookie(res, tokens.refreshToken);

    return { access_token: tokens.accessToken };
  }

  // ─── Logout ──────────────────────────────────────────────────
  async logout(userId: string, res: Response) {
    // Invalida el refresh token en DB
    await this.usersService.clearRefreshToken(userId);

    // Limpia la cookie
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { message: 'Sesión cerrada' };
  }

  // ─── Helpers privados ────────────────────────────────────────
  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    // Guarda el hash del refresh token, nunca el token en plano
    const hash = await argon2.hash(refreshToken, { type: argon2.argon2id });
    await this.usersService.updateRefreshToken(userId, hash);
  }

  private setRefreshCookie(res: Response, token: string) {
    res.cookie('refresh_token', token, {
      httpOnly: true, // JS nunca puede leerla
      secure: process.env.NODE_ENV === 'production', // solo HTTPS en prod
      sameSite: 'strict', // protección CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en ms
      path: '/auth/refresh', // cookie solo se envía a esta ruta
    });
  }
}
