import { store } from '../../../services/redux/store';
import { Logout, userLogout } from '../Logout';
import { removeAuthCookie } from '../../../services/api/processToken';

// Mock the store dispatch and sessionStorage
jest.mock('../../../services/redux/store', () => ({
  store: {
    dispatch: jest.fn(),
  },
}));

jest.mock('../../../services/api/processToken', () => ({
  removeAuthCookie: jest.fn(),
}));

// Mock sessionStorage
const sessionStorageMock = (function () {
  let store = {};

  return {
    getItem: function (key: string | number) {
      return (store as { [key: string]: any })[key] || null;
    },
    setItem: function (key: string | number, value: { toString: () => any }) {
      (store as { [key: string]: any })[key] = value.toString();
    },
    removeItem: function (key: string | number) {
      delete (store as { [key: string]: any })[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('Logout', () => {
  beforeEach(() => {
    // Set up some values in sessionStorage
    sessionStorage.setItem('persist:root', 'someValue');
    sessionStorage.setItem('authTokens', 'someToken');
  });

  test('should clear sessionStorage and reset redux state on logout', () => {
    Logout();

    expect(store.dispatch).toHaveBeenCalledWith(userLogout());
    expect(sessionStorage.getItem('persist:root')).toBeNull();
    expect(sessionStorage.getItem('authTokens')).toBeNull();
    expect(removeAuthCookie).toHaveBeenCalled();
  });
});
