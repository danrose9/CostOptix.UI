export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  exp: number;
}
