import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { BASE, REFRESH_TOKEN } from './apiEndpoints';
import { AuthToken, DecodedToken, AUTHTOKEN } from './types';
import { isTokenValid, refreshToken } from './processToken';

const originalRequest = async (url: string, config: any): Promise<Response> => {
  url = `${BASE}${url}`;
  const response = await fetch(url, config);
  return response;
};

const customFetcher = async (url: string, config: RequestInit = {}): Promise<Response> => {
  let authTokens: AuthToken = sessionStorage.getItem(AUTHTOKEN)
    ? (JSON.parse(sessionStorage.getItem(AUTHTOKEN) as string) as AuthToken)
    : null!;

  if (!isTokenValid(authTokens.accessToken)) {
    authTokens = await refreshToken(authTokens);
  }

  config['headers'] = {
    Authorization: `Bearer ${authTokens.accessToken}`,
    'Content-Type': 'application/json',
  };

  let response = await originalRequest(url, config);
  return response;
};

export default customFetcher;
