export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthTokenResponse {
  access_token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface AuthUser {
  email: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}