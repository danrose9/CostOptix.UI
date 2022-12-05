import { store } from '../services/redux/store';
import {
  fetchUserProfile,
  fetchUserPhoto,
} from '../services/redux/thunks/userProfileThunk';

const _ = require('lodash');

// Find auth_cookie and decode - OK
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

export const removeAuthCookie = () => {
  let cookie_name = 'AuthCookie=';
  document.cookie = cookie_name + '=; Max-Age=0';
};
