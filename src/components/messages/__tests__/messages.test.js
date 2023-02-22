import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  FailedToLoadBillingAccount,
  CurrencyConflictWarning,
  NoBillingAccountMessage,
  ServiceConnectionWarning,
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

describe('ServiceConnectionWarning', () => {
  test('should render message correct text', () => {
    const scWarning = render(<ServiceConnectionWarning content="Hello World!" />);
    expect(scWarning).toBeTruthy;
    expect(scWarning.baseElement).toHaveTextContent('Hello World!');
  });
});
