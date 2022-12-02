import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { BASE, REFRESH_TOKEN } from '../services/api/apiEndpoints';

const useFetch = () => {
  const config = {};

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

  const callFetch = async (url) => {
    let authTokens = sessionStorage.getItem('authTokens')
      ? JSON.parse(sessionStorage.getItem('authTokens'))
      : null;

    const authToken = jwt_decode(authTokens.accessToken);
    const isExpired = dayjs.unix(authToken.exp).diff(dayjs()) < 1;

    if (isExpired) {
      authTokens = await refreshToken(authTokens);
    }
    config['headers'] = {
      Authorization: `Bearer ${authTokens?.accessToken}`,
    };
    let response = await originalRequest(url, config);
    return response;
  };

  return callFetch;
};

export default useFetch;
