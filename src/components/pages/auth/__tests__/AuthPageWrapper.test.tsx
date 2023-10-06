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

  test('shows Privacy Policy content on click', () => {
    const privacyPolicyButton = screen.getByText(/Privacy Policy/i);
    fireEvent.click(privacyPolicyButton);

    // Assuming you have some identifiable text or element in your PrivacyPolicy component
    const privacyPolicyContent = screen.getByTestId('privacy-03');
    expect(privacyPolicyContent).toBeInTheDocument();
  });

  test('shows Terms of Service content on click', () => {
    const termsOfServiceButton = screen.getByText(/Terms of Service/i);
    fireEvent.click(termsOfServiceButton);

    // Assuming you have some identifiable text or element in your TermsOfService component
    const termsOfServiceContent = screen.getByTestId('terms-03');
    expect(termsOfServiceContent).toBeInTheDocument();
  });
});
