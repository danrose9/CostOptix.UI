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
import { ServiceConnectionProviderType } from 'provider-types';
import { CloudProviderType } from 'cloud-billingaccounts-types';

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

const mockCloudBillingAccounts = {
  providerAccountId: '73bf9c05-bd27-4332-a610-bb1a50300369',
  providerName: '73bf9c05-bd27-4332-a610-bb1a50300369',
  providerType: 'Azure',
  billingAccounts: [
    {
      billingAccountId: 'KODF-MKVG-BG7-PGB',
      billingAccountName: 'Development',
      currency: 'GBP',
    },
    {
      billingAccountId: '2420669c-1b60-4463-9b29-d6a844c84119',
      billingAccountName: 'Staging',
      currency: 'EUR',
    },
    {
      billingAccountId: '08a3054c-eec3-4040-98f3-e927ba3f3209',
      billingAccountName: 'Production',
      currency: 'USD',
    },
  ],
} as CloudProviderType;

describe('test service connection modal form', () => {
  const user = userEvent.setup();
  const card = ServiceConnectionCard[1];

  beforeEach(() => {
    render(
      <AddServiceConnectionModal cloudProvider={card as ServiceConnectionProviderType}>
        <AddServiceAzure />
      </AddServiceConnectionModal>,
      { wrapper: ApplicationWrapper }
    );
  });

  test('should render initial modal and close modal', () => {
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

  test('Azure service connection form accepts input and is valid', () => {
    const addNewButton = screen.getByRole('button', { name: 'Add new connection' });
    fireEvent.click(addNewButton);

    const applicationId = screen.getByRole('textbox', { name: /applicationId/i });
    const secretValue = screen.getByRole('textbox', { name: /secretValue/i });
    const directoryId = screen.getByRole('textbox', { name: /directoryId/i });

    expect(applicationId).toBeInTheDocument();
    expect(secretValue).toBeInTheDocument();
    expect(directoryId).toBeInTheDocument();

    fireEvent.change(applicationId, { target: { value: '123' } });
  });

  test('Continue button should be enabled on valid fill', () => {});
  /*
  test('Continue button should be disabled on invalid form', () => {
    // Unfinished
  });

  test('Continue button should remove all errors on click', () => {
    // Unfinished
  });

  test('Manage modal should render and close', () => {
    // Unfinished
  });
  */
});

describe('test service connection options', () => {
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
    expect(element.childElementCount).toBe(3);
  });

  test('Disable/enable should toggle', () => {
    // Unfinished
  });
});

describe('correct modal should show for each provider', () => {
  // 0 - {Office 365}, 1 - {Azure}, 2 - {AWS}, 3 - {SalesForce}, 4 - {Google}
  var providerArray = [1, 2];

  providerArray.forEach((n) => {
    const card = ServiceConnectionCard[n];

    test('the modal showing for ' + card.provider + ', is for the ' + card.provider + ' card', async () => {
      render(
        <AddServiceConnectionModal cloudProvider={card as ServiceConnectionProviderType}></AddServiceConnectionModal>,
        { wrapper: ApplicationWrapper }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Add new connection' }));

      expect(screen.getByTestId('provider-steps-1')).toHaveTextContent(`Log into your ${card.provider} account`);
    });

    test('href links should work', () => {
      render(
        <AddServiceConnectionModal cloudProvider={card as ServiceConnectionProviderType}></AddServiceConnectionModal>,
        { wrapper: ApplicationWrapper }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Add new connection' }));
      expect(screen.getByRole('link', { name: card.href })).toHaveAttribute('href', card.href);
    });
  });
});

describe('billing account selection modal', () => {
  test('test all elements are selected when select all is checked', () => {
    // Unfinished
  });
  test('test all elements are selected when select all is unchecked', () => {
    // Unfinished
  });
  test('cancel button clears selection array', () => {
    // render(<AddServiceConnectionModal provider={ServiceConnectionCard[0]}></AddServiceConnectionModal>);
    // fireEvent.click(screen.getByRole('button', { name: 'Add new connection' }));
    // fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    // const secondModal = screen.getByTestId('second-modal');
  });
});
