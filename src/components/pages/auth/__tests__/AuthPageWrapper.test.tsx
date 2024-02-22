import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthPageWrapper from '../AuthPageWrapper';

describe('AuthPageWrapper', () => {
  beforeEach(() => {
    render(<AuthPageWrapper>Test Children</AuthPageWrapper>);
  });

  test('renders Privacy Policy button', () => {
    const privacyPolicyButton = screen.getByText(/Privacy Policy/i);
    expect(privacyPolicyButton).toBeInTheDocument();
  });

  test('renders Terms of Service button', () => {
    const termsOfServiceButton = screen.getByText(/Terms of Service/i);
    expect(termsOfServiceButton).toBeInTheDocument();
  });
});
