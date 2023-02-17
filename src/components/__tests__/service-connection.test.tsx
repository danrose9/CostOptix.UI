/*
 * Copyright (c) 2023 DDIWARE
 * ALL RIGHTS RESERVED
 */

import React from 'react';
import { render, cleanup, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { Table } from 'semantic-ui-react';
import '@testing-library/jest-dom';
import ServiceConnectionTable from '../../components/connections/ServiceConnectionTable';
import { ServiceConnections as ServiceConnectionCard } from '../../components/connections/ServiceConnections';
import { ApplicationWrapper } from '../../tests/helpers';
import userEvent from '@testing-library/user-event';
import AddServiceConnectionModal from '../../components/connections/AddServiceConnectionModal';
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
  currency: 'CAD',
  isTransient: true,
  status: 'Disabled',
  provider: 'Azure',
} as CustomerConnectedProvidersType;
//   {
//     id: 'ed07bece-6106-477f-db71-08db055424dd',
//     providerId: 'c53e746d-2278-436f-d58e-08db05542036',
//     createdDate: '2023-02-02T19:31:55.6847625',
//     accountId: '13dc79ec-8c00-5a6e-aa52-2bf50657f5c9:c9c8a658-588d-41e0-a83d-a58789008573_2019-05-31/',
//     accountName: 'CostOptix Billing Profile Dev',
//     currency: 'GBP',
//     isTransient: true,
//     status: 'Disabled',
//     provider: 'Azure',
//   },
// ];

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
  test('Service Connection form accepts input and is valid', () => {
    /* Unfinished */
  });

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
});

describe('Azure Service Connection', () => {
  test('Continue button should be enabled on valid fill', () => {
    /* Unfinished */
  });
  test('Continue button should be disabled on invalid form', () => {
    /* Unfinished */
  });
});

describe('AWS Service Connection', () => {
  test('', () => {});
});

describe('Service Connection Options', () => {
  test('manage modal should render and close', () => {});
  test('disable/enable should toggle', () => {});
});
