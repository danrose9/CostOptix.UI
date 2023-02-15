import React from 'react';
import { render, cleanup, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceConnectionTable from '../../components/connections/ServiceConnectionTable';
import { ServiceConnections as ServiceConnectionCard } from '../../components/connections/ServiceConnections';
import { ApplicationWrapper } from '../../tests/helpers';
import userEvent from '@testing-library/user-event';
import AddServiceConnectionModal from '../../components/connections/AddServiceConnectionModal';

afterEach(() => {
  cleanup();
});

describe('Common Service Connection', () => {
  const user = userEvent.setup();
  const provider = ServiceConnectionCard[0];

  test('Add new connection should render modal and close', () => {
    const xyz = render(<AddServiceConnectionModal provider={provider}></AddServiceConnectionModal>);
    const addNewButton = screen.getByRole('button', { name: 'Add new connection' });

    // Check button is in dom
    expect(addNewButton).toBeInTheDocument();
    fireEvent.click(addNewButton);

    // Check 'Close' button is in dom
    const closeButton = screen.getByRole('button', { name: 'Close' });
    const continueButton = screen.getByRole('button', { name: 'Continue' });

    // Check buttons render
    expect(closeButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toBeDisabled();

    fireEvent.click(closeButton);
    expect(continueButton).not.toBeInTheDocument();
  });
  test('Service Connection form accepts input and is valid', () => {});

  test('More button should render dropdown', async () => {
    const { getByTestId } = render(<ServiceConnectionTable card={provider} />, {
      wrapper: ApplicationWrapper,
    });

    const scDropdown = screen.queryByTestId('sc-dropdown') as HTMLElement;

    /* Unfinished */
  });
});

describe('Azure Service Connection', () => {
  test('Continue button should be enabled on valid fill', () => {});
  test('Continue button should be disabled on invalid form', () => {});
});

describe('AWS Service Connection', () => {
  test('', () => {});
});
