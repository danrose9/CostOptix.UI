import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { BASE, REFRESH_TOKEN } from './apiEndpoints';

const originalRequest = async (url, config) => {
  url = `${BASE}${url}`;

  let response = await fetch(url, config);
  return response;
};

const refreshToken = async (authTokens) => {
  let response = await fetch(BASE + REFRESH_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
    }),
  });
  let data = await response.json();

  sessionStorage.setItem('authTokens', JSON.stringify(data));
  return data;
};

const isTokenValid = (accessToken) => {
  try {
    const authToken = jwt_decode(accessToken);
    return dayjs.unix(authToken.exp).diff(dayjs()) > 1;
  } catch (err) {
    console.error('Error decoding token', err);
    return false;
  }
};

const customFetcher = async (url, config = {}) => {
  let authTokens = sessionStorage.getItem('authTokens') ? JSON.parse(sessionStorage.getItem('authTokens')) : null;

  if (!isTokenValid(authTokens?.accessToken)) {
    authTokens = await refreshToken(authTokens);
  }

  config['headers'] = {
    Authorization: `Bearer ${authTokens?.accessToken}`,
    'Content-Type': 'application/json',
  };

  let response = await originalRequest(url, config);
  return response;
};

export default customFetcher;
