import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  FailedToLoadBillingAccount,
  CurrencyConflictWarning,
  NoBillingAccountMessage,
} from '../index';

afterEach(() => {
  cleanup();
});

describe('Messages', () => {
  test('should render message', () => {
    render(<FailedToLoadBillingAccount size="small" />);
  });

  test('should render message', () => {
    render(<CurrencyConflictWarning onDismiss={null} />);
  });

  test('should render message', () => {
    render(<NoBillingAccountMessage onDismiss={null} />);
  });
});
