import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from '../auth/Login';
import * as appRoutes from '../../../app/router/appRoutes';

describe('Login Component', () => {
  test('should render the Login component', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('Log in to CostOptix')).toBeInTheDocument();
  });

  test('should render the Azure IdPButton', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('Continue with Azure')).toBeInTheDocument();
  });

  test('should render LoginContainer when not in signup mode', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('Looking for the signup page?')).toBeInTheDocument();
  });

  test('should render TermsContainer when in signup mode', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/login', state: true }]}>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/By clicking "continue"/)).toBeInTheDocument();
  });

  test('should navigate to SIGNUP when LoginContainer is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path={appRoutes.SIGNUP} element={<div>Welcome to CostOptix</div>} />
        </Routes>
      </MemoryRouter>
    );

    const loginContainer = screen.getByTestId('navigate-button');
    fireEvent.click(loginContainer);

    expect(screen.getByText('Welcome to CostOptix')).toBeInTheDocument();
  });
});
