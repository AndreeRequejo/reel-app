import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import type {
  JwtAccessUser,
  JwtRefreshUser,
  RequestWithUser,
} from './types/auth-user.type';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 registros por minuto por IP
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 intentos por minuto
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(
    @Req() req: RequestWithUser<JwtRefreshUser>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, refreshToken } = req.user;
    return this.authService.refresh(id, refreshToken, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt-access'))
  logout(
    @Req() req: RequestWithUser<JwtAccessUser>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    return this.authService.logout(user.id, res);
  }
}
