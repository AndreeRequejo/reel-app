import { EnvConfiguration } from 'src/config/app.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtAccessUser } from '../types/auth-user.type';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: EnvConfiguration().jwt_access_secret,
    });
  }

  validate(payload: { sub: string; email: string }): JwtAccessUser {
    if (!payload.sub || !payload.email) throw new UnauthorizedException();
    return { id: payload.sub, email: payload.email };
  }
}
