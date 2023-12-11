export const AUTHTOKEN = 'authTokens';

export type AuthToken = {
  accessToken: string;
  accessTokenExpiresOn?: string;
  email?: string;
  name?: string;
  refreshToken: string;
  userId?: string;
};

export interface DecodedToken {
  exp: number;
}
