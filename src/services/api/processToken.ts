import { store } from '../redux/store';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { fetchUserProfile, fetchUserPhoto } from '../redux/thunks/userProfileThunk';
import { AuthToken, DecodedToken, AUTHTOKEN } from './types';
import { BASE, REFRESH_TOKEN } from './apiEndpoints';

const _ = require('lodash');

/// <summary>
/// Gets the authCookie from the browser
/// <return> string </return>
/// <summary>
const getAuthCookie = () => {
  let cookie_name = 'AuthCookie=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookie_name) === 0) {
      return c.substring(cookie_name.length, c.length);
    }
  }

  return '';
};

/// <summary>
/// Checks if the authCookie is available and sets the authTokens in sessionStorage
/// <return> boolean </return>
/// <summary>
export const isAuthCookieAvailable = () => {
  const authCookie = getAuthCookie();

  if (_.isEmpty(authCookie)) {
    return false;
  } else {
    var cookieData = JSON.parse(authCookie);

    sessionStorage.setItem('authTokens', JSON.stringify(cookieData));
    store.dispatch(fetchUserProfile());
    store.dispatch(fetchUserPhoto());
    return true;
  }
};

/// <summary>
/// Removes the authTokens in sessionStorage
/// <summary>
export const removeAuthCookie = () => {
  let cookie_name = 'AuthCookie=';
  document.cookie = cookie_name + '=; Path=/; domain=.costoptix.com; Max-Age=0';
};

/// <summary>
/// Refreshes the accessToken and refreshToken
/// <input> authTokens: AuthTokens </input>
/// <return> Promise<any> </return>
/// <summary>
const refreshToken = async (authToken: AuthToken): Promise<any> => {
  let response = await fetch(BASE + REFRESH_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
    }),
  });
  let data = await response.json();

  sessionStorage.setItem(AUTHTOKEN, JSON.stringify(data));
  return data;
};

/// <summary>
/// Checks if the accessToken has not expired
/// <input> accessToken: string </input>
/// <return> boolean </return>
/// <summary>
const isTokenValid = (accessToken: string) => {
  try {
    const authToken: DecodedToken = jwt_decode(accessToken);

    return dayjs.unix(authToken.exp).diff(dayjs()) > 1;
  } catch (err) {
    console.error('Error decoding token', err);
    return false;
  }
};

/// <summary>
/// Fetches the authToken and refreshToken from sessionStorage
/// <return> AuthToken </return>
/// <summary>
const fetchTokens = (): AuthToken | null => {
  return sessionStorage.getItem(AUTHTOKEN)
    ? (JSON.parse(sessionStorage.getItem(AUTHTOKEN) as string) as AuthToken)
    : null;
};

/// <summary>
/// Checks if the user is authenticated
/// <return> boolean </return>
/// <summary>
export const isAuthenticated = () => {
  const authToken = fetchTokens();

  if (!authToken || !authToken.accessToken) {
    return false;
  }

  const isTokenGood = isTokenValid(authToken.accessToken);

  if (!isTokenGood) {
    const newToken = refreshToken(authToken);
    if (!newToken) {
      return false;
    }
  }

  return true;
};

/// <summary>
/// Checks if the accessToken is valid and refreshes it if necessary
/// <return> AuthToken </return>
/// <summary>
export const checkTokens = async (): Promise<AuthToken> => {
  let authTokens: AuthToken = fetchTokens()!;

  if (!isTokenValid(authTokens.accessToken)) {
    authTokens = await refreshToken(authTokens);
  }

  return authTokens;
};
