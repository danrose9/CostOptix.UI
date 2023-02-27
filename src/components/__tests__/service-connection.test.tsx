/*
 * Copyright (c) 2023 DDIWARE
 * ALL RIGHTS RESERVED
 */

import React from 'react';
import { render, cleanup, screen, fireEvent, getByDisplayValue, getByText, queryByText } from '@testing-library/react';
import { Table } from 'semantic-ui-react';
import { ServiceConnectionTable, AddServiceAzure } from '../../components/connections/index';
import AddServiceConnectionModal from '../connections/AddServiceConnectionModal';
import { ServiceConnections as ServiceConnectionCard } from '../../components/connections/ServiceConnections';
import { ApplicationWrapper } from '../../tests/helpers';
import userEvent from '@testing-library/user-event';
import { CustomerConnectedProvidersType } from 'billingaccount-types';

afterEach(() => {
  cleanup();
});

const mockBillingAccounts = {
  id: '755c2753-f2c1-45c0-db70-08db055424dd',
  providerId: 'c53e746d-2278-436f-d58e-08db05542036',
  createdDate: '2023-02-02T19:31:55.6845658',
  accountId: '13dc79ec-8c00-5a6e-aa52-2bf50657f5c9:0859969d-5dea-47cb-a0a2-3b49bd471e2c_2019-05-31',
  accountName: 'ddiware',
  currency: 'USD',
  isTransient: true,
  status: 'Disabled',
  provider: 'Azure',
} as CustomerConnectedProvidersType;

describe('Service Connection Modal', () => {
  const user = userEvent.setup();
  const provider = ServiceConnectionCard[0];

  beforeEach(() => {
    render(
      <AddServiceConnectionModal provider={provider}>
        <AddServiceAzure />
      </AddServiceConnectionModal>
    );
  });

  test('Add new connection should render modal and close modal', () => {
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

  test('Service Connection form accepts input and is valid', () => {
    /* Unfinished */
  });

  test('Continue button should be enabled on valid fill', () => {
    /* Unfinished */
  });

  test('Continue button should be disabled on invalid form', () => {
    /* Unfinished */
  });

  test('Manage modal should render and close', () => {
    /* Unfinished */
  });
});

describe('Correct modal should show for each provider', () => {
  var providerArray = [1, 2];

  providerArray.forEach((n) => {
    const provider = ServiceConnectionCard[n];
    test('Testing modal for ' + provider.provider, async () => {
      render(<AddServiceConnectionModal provider={provider}></AddServiceConnectionModal>);
      fireEvent.click(screen.getByRole('button', { name: 'Add new connection' }));
      expect(screen.getByTestId('sc-provider-header')).toHaveTextContent(
        `Add a new ${provider.provider} Service Connection`
      );
    });

    test('Test that the modal showing for ' + provider.provider + ', is for the ' + provider.provider + ' card', () => {
      /* Unfinished */
    });
  });
});

describe('AWS Service Connection', () => {
  test('href links should work', () => {
    /* Unfinished */
  });
});

describe('Service Connection Options', () => {
  beforeEach(() => {});
  test('More button should render dropdown', async () => {
    const { getByTestId, getAllByTestId } = render(
      <Table>
        <Table.Body>
          <ServiceConnectionTable account={mockBillingAccounts} />
        </Table.Body>
      </Table>,
      {
        wrapper: ApplicationWrapper,
      }
    );

    userEvent.hover(getByTestId('sc-dropdown'));

    // check dropdown has fired
    const scDropdown = expect(getByTestId('sc-dropdown-options') as HTMLElement).toBeTruthy();

    const element = getByTestId('sc-dropdown-options');
    // test first child
    expect(element.firstChild).toHaveTextContent('Manage Service');

    //test number of child nodes
    expect(element.childElementCount).toBe(4);
  });

  test('Disable/enable should toggle', () => {
    /* Unfinished */
  });
});

describe('Billing Account selection', () => {
  test('selection array is correctly update on selection', () => {
    /* Unfinished */
  });
  test('selection array is correctly update on de-selection', () => {
    /* Unfinished */
  });
  test('cancel button clears selection array', () => {
    /* Unfinished */
  });
});
