/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { EnvConfiguration } from 'src/config/app.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import type { JwtRefreshUser } from '../types/auth-user.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      // Extrae el refresh token desde la cookie httpOnly, nunca del body
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.['refresh_token'] ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: EnvConfiguration().jwt_refresh_secret,
      passReqToCallback: true,
    });
  }

  validate(
    req: Request,
    payload: { sub: string; email: string },
  ): JwtRefreshUser {
    const refreshToken = req.cookies?.['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException();
    return { id: payload.sub, email: payload.email, refreshToken };
  }
}
