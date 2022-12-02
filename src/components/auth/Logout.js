import { store } from '../../services/redux/store';
import { removeAuthCookie } from '../../utils/processToken';

export const userLogout = () => {
  return { type: 'USER_LOGOUT' };
};

export const Logout = () => {
  store.dispatch(userLogout());

  sessionStorage.removeItem('persist:root');
  sessionStorage.removeItem('authTokens');
  removeAuthCookie();
};
