import { useState, useCallback } from 'react';
import { store } from '../services/redux/store';
import { removeAuthCookieAsync, removeAuthCookie } from '../services/api/processToken';

export const useLogoutAsync = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await removeAuthCookieAsync();

      // Dispatching logout action to the Redux store
      store.dispatch({ type: 'USER_LOGOUT' });

      // Clearing session storage items
      sessionStorage.removeItem('persist:root');
      sessionStorage.removeItem('authTokens');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unexpected error occurred');

      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { logout, isLoading, error };
};

export const useLogout = () => {
  const logout = () => {
    try {
      removeAuthCookie();
      store.dispatch({ type: 'USER_LOGOUT' });
      sessionStorage.removeItem('persist:root');
      sessionStorage.removeItem('authTokens');
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  return { logout };
};
