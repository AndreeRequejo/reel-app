import type { Request } from 'express';

export type JwtAccessUser = {
  id: string;
  email: string;
};

export type JwtRefreshUser = JwtAccessUser & {
  refreshToken: string;
};

export type RequestWithUser<TUser> = Request & {
  user: TUser;
};
