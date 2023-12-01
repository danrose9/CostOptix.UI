import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { BASE, REFRESH_TOKEN } from './apiEndpoints';
import { AuthTokens, DecodedToken } from './types';

const AUTHTOKENS = 'authTokens';

const originalRequest = async (url: string, config: any): Promise<Response> => {
  url = `${BASE}${url}`;
  const response = await fetch(url, config);
  return response;
};

const refreshToken = async (authTokens: AuthTokens): Promise<any> => {
  let response = await fetch(BASE + REFRESH_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
    }),
  });
  let data = await response.json();

  sessionStorage.setItem(AUTHTOKENS, JSON.stringify(data));
  return data;
};

const isTokenValid = (accessToken: string) => {
  try {
    const authToken: DecodedToken = jwt_decode(accessToken);

    return dayjs.unix(authToken.exp).diff(dayjs()) > 1;
  } catch (err) {
    console.error('Error decoding token', err);
    return false;
  }
};

const customFetcher = async (url: string, config: RequestInit = {}): Promise<Response> => {
  let authTokens: AuthTokens = sessionStorage.getItem(AUTHTOKENS)
    ? (JSON.parse(sessionStorage.getItem(AUTHTOKENS) as string) as AuthTokens)
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
