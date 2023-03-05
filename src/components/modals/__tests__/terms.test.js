import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BetaProgramSignup from '../BetaProgramSignup';
import TermsOfServiceModal from '../TermsOfServiceModal';

import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('Terms of Service', () => {
  test('should render Terms of Service button', () => {
    const { queryByText } = render(
      <Router>
        <BetaProgramSignup />
      </Router>
    );
    const termsButton = screen.getByTestId('terms-01');
    expect(termsButton).toBeInTheDocument();
    expect(termsButton).toHaveClass('ui primary button');
    expect(queryByText('Terms of Service')).toBeTruthy();
  });

  test('should render Terms of Service on button click', () => {
    render(
      <Router>
        <BetaProgramSignup />
      </Router>
    );
    const termsButton = screen.getByTestId('terms-01');
    fireEvent.click(termsButton);
    expect(screen.getAllByTestId('terms-02'));
    expect(screen.getAllByTestId('terms-03'));
  });
});
