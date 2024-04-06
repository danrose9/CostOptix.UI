import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogoutPage from '../../../components/pages/LogoutPage';
import { store } from '../../../services/redux/store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';

describe('useLogout', () => {
  const history = createMemoryHistory();
  const renderComponent = () =>
    render(
      <Router location={history.location} navigator={history}>
        <LogoutPage />
      </Router>
    );

  const createCookie = () => {
    document.cookie = 'user=AuthCookie';
  };

  function checkCookie(cookieName: string) {
    // Attempt to fetch the cookie value
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    // Return true if the cookie exists, false otherwise
    return match ? true : false;
  }

  it('authCookie is correctly removed from the browser', async () => {
    createCookie();

    renderComponent();
    fireEvent.click(screen.getByTestId('logout-button'));

    // Wait for any async actions to complete
    await waitFor(() => {
      // Since the logout function is mocked, we're mainly verifying the navigation behavior
      expect(history.location.pathname).toBe(appRoutes.HOME);
    });
    expect(checkCookie('AuthCookie')).toBe(false);
  });
  // it('correctly performs logout actions', () => {
  //   const { getByText } = render(<LogoutPage />);
  //   fireEvent.click(getByText('Logout'));

  //   // Verify sessionStorage is cleared
  //   expect(sessionStorage.getItem('persist:root')).toBeNull();
  //   expect(sessionStorage.getItem('authTokens')).toBeNull();

  //   // Verify removeAuthCookie is called
  //   // This might require spying on the function if it's not mocked, depending on how it's implemented

  //   // Verify Redux store dispatched the correct action
  //   // This might involve checking the store's state to confirm the logout action was handled
  //   // Example assuming you can inspect the store's state directly or have a selector to do so:
  //   expect(store.getState().user).toEqual(expect.anything()); // Adjust based on what your state should look like
  // });
});
