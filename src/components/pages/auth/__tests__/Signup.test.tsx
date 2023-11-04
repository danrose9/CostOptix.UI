import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Signup from '../Signup';
import * as appRoutes from '../../../../app/router/appRoutes';

describe('Signup Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path={appRoutes.LOGIN} element={<div>Login Page</div>} />
          <Route path={appRoutes.HOME} element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  });

  test('should render the Signup component', () => {
    expect(screen.getByText('Welcome to CostOptix')).toBeInTheDocument();
  });

  test('should navigate to HOME when CloseButton is clicked', () => {
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('should navigate to LOGIN when LoginContainer is clicked', () => {
    const loginContainer = screen.getByText('Already signed up? Log in with single sign on');
    fireEvent.click(loginContainer);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});

describe('IdP button Component', () => {
  let emailInput: Node | Window,
    organizationInput: Node | Window,
    termsCheckbox: Node | Window,
    nextButton: HTMLElement;

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path={appRoutes.LOGIN} element={<div>Login Page</div>} />
          <Route path={appRoutes.HOME} element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    emailInput = screen.getByPlaceholderText('Contact email address');
    organizationInput = screen.getByPlaceholderText('Organization');
    termsCheckbox = screen.getByLabelText('I agree to the');
    nextButton = screen.getByText('Next');
  });

  test('IdpContainer button is disabled when the email address is invalid', () => {
    // Fill out the form with invalid email address
    fireEvent.change(emailInput, { target: { value: 'test@example' } });
    fireEvent.change(organizationInput, { target: { value: 'Test Organization' } });
    fireEvent.click(termsCheckbox);

    // Check if the button is disabled
    expect(nextButton).toBeDisabled();
  });

  test('IdpContainer button is enabled when the form is correctly completed', async () => {
    // Initially, the button should be disabled
    expect(nextButton).toBeDisabled();

    // Fill out the form correctly
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(organizationInput, { target: { value: 'Test Organization' } });
    fireEvent.click(termsCheckbox);

    // Check if the button is enabled
    expect(nextButton).toBeEnabled();
  });

  test('IdpContainer button is disabled when the organiation name is missing', () => {
    // Fill out the form no organization
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(termsCheckbox);

    // Check if the button is disabled
    expect(nextButton).toBeDisabled();
  });

  test('IdpContainer button is disabled when the terms is not approved', () => {
    // Fill out the form no organization
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(organizationInput, { target: { value: 'Test Organization' } });

    // Check if the button is disabled
    expect(nextButton).toBeDisabled();
  });
});
