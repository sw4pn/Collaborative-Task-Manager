export interface IJwtTokenPayload {
  userId: string;
}

export interface JwtAccessPayload {
  userId: string;
}

export interface JwtRefreshPayload {
  userId: string;
}

export interface IRegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginResponse {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}
