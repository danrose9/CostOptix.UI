import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LogoutPage from '../LogoutPage';
import { Logout } from '../../auth/Logout';
import * as appRoutes from '../../../app/router/appRoutes';

// Mock the Logout function
jest.mock('../../auth/Logout', () => ({
  Logout: jest.fn(),
}));

describe('LogoutPage', () => {
  const history = createMemoryHistory();

  const renderComponent = () =>
    render(
      <Router location={history.location} navigator={history}>
        <LogoutPage />
      </Router>
    );

  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByText(/You are about to be logged out from CostOptix/)).toBeInTheDocument();
  });

  it('closes the modal and navigates back on "No thanks, take me back" button click', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/No thanks, take me back/));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('calls Logout and navigates to home on "Yes, log me out" button click', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('logout-button'));
    expect(Logout).toHaveBeenCalled();
    expect(history.location.pathname).toBe(appRoutes.HOME);
  });
});
