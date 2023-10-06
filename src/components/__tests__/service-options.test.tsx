/*
 * Copyright (c) 2023 DDIWARE
 * ALL RIGHTS RESERVED
 */

import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { Table } from 'semantic-ui-react';
import { ServiceConnectionRow } from '../../components/connections/index';
import { ApplicationWrapper } from '../../tests/helpers';
import userEvent from '@testing-library/user-event';

const RenderServiceConnectionRows = (CustomerConnectedBillingAccounts: any[]) => {
  return render(
    <Table>
      <Table.Body>
        {CustomerConnectedBillingAccounts.map((billingAccount: any, index: any) => {
          return <ServiceConnectionRow billingAccount={billingAccount} key={index} />;
        })}
      </Table.Body>
    </Table>,
    {
      wrapper: ApplicationWrapper,
    }
  );
};

afterEach(() => {
  cleanup();
});

describe('test service connection options', () => {
  test('More button should render dropdown', async () => {
    const CustomerConnectedBillingAccounts = [
      {
        accountId: '/billingProfiles/60dffedd-d0cd-40c5-a2bf-783383d52ba6',
        accountName: 'MyHome-dev',
        createdDate: '2023-04-15T14:19:57.806782',
        currency: 'GBP',
        id: '9428049d-57a4-4809-9ba2-08db3b587085',
        provider: 'Azure',
        providerId: '110b4410-6724-4f90-7505-08db3385df55',
        status: 'Disabled',
        statusReason: 'Disabled on 2023-04-16 21:06:18',
      },
    ];

    RenderServiceConnectionRows(CustomerConnectedBillingAccounts);

    userEvent.hover(screen.getByTestId('sc-dropdown'));

    // check dropdown has fired
    expect(screen.getAllByTestId('sc-dropdown-options') as HTMLElement[]).toBeTruthy();

    const element = screen.getByTestId('sc-dropdown-options');

    // test first child
    expect(element.firstChild).toHaveTextContent('Manage Service');

    // test enable option is available
    expect(element).toHaveTextContent('Enable');

    //test number of child nodes
    expect(element.childElementCount).toBe(3);
  });

  test('Disable/enable should toggle', () => {
    const CustomerConnectedBillingAccounts = [
      {
        accountId: '/billingProfiles/60dffedd-d0cd-40c5-a2bf-783383d52ba6',
        accountName: 'MyHome-dev',
        createdDate: '2023-04-15T14:19:57.806782',
        currency: 'GBP',
        id: '9428049d-57a4-4809-9ba2-08db3b587085',
        provider: 'Azure',
        providerId: '110b4410-6724-4f90-7505-08db3385df55',
        status: 'Enabled',
        statusReason: 'Disabled on 2023-04-16 21:06:18',
      },
    ];

    RenderServiceConnectionRows(CustomerConnectedBillingAccounts);

    // click service connections options button
    userEvent.hover(screen.getByTestId('sc-dropdown'));

    // check dropdown has fired
    expect(screen.getAllByTestId('sc-dropdown-options') as HTMLElement[]).toBeTruthy();
    const element = screen.getByTestId('sc-dropdown-options');

    // click the disable option
    userEvent.hover(screen.getByTestId('sc-dropdown-disable'));

    // test status now reads disable
    expect(element).toHaveTextContent('Disable');
  });

  test('transient should only have one option', () => {
    const CustomerConnectedBillingAccounts = [
      {
        accountId: '/billingProfiles/60dffedd-d0cd-40c5-a2bf-783383d52ba6',
        accountName: 'MyHome-dev',
        createdDate: '2023-04-15T14:19:57.806782',
        currency: 'GBP',
        id: '9428049d-57a4-4809-9ba2-08db3b587085',
        provider: 'Azure',
        providerId: '110b4410-6724-4f90-7505-08db3385df55',
        status: 'Transient',
        statusReason: null,
      },
    ];

    RenderServiceConnectionRows(CustomerConnectedBillingAccounts);

    // click service connections options button
    userEvent.hover(screen.getByTestId('sc-dropdown'));

    // check dropdown has fired
    expect(screen.getAllByTestId('sc-dropdown-options') as HTMLElement[]).toBeTruthy();
    const element = screen.getByTestId('sc-dropdown-options');

    // test for only one child element
    expect(element.childElementCount).toBe(1);

    // test element is 'Manage Service'
    expect(element).toHaveTextContent('Manage Service');
  });

  test('the correct number of service connections render', () => {
    const CustomerConnectedBillingAccounts = [
      {
        accountId: '13dc79ec-8c00-5a6e-aa52-2bf50657f5c9:0859969d-5dea-47cb-a0a2-3b49bd471e2c_2019-05-31',
        accountName: 'ddiware',
        createdDate: '2023-02-02T19:31:55.6845658',
        currency: 'USD',
        id: '755c2753-f2c1-45c0-db70-08db055424dd',
        provider: 'Azure',
        providerId: 'c53e746d-2278-436f-d58e-08db05542036',
        status: 'Enabled',
        statusReason: null,
      },
      {
        accountId: '/billingProfiles/60dffedd-d0cd-40c5-a2bf-783383d52ba6',
        accountName: 'MyHome-dev',
        createdDate: '2023-04-15T14:19:57.806782',
        currency: 'GBP',
        id: '9428049d-57a4-4809-9ba2-08db3b587085',
        provider: 'Azure',
        providerId: '110b4410-6724-4f90-7505-08db3385df55',
        status: 'Disabled',
        statusReason: 'Disabled on 2023-04-16 21:06:18',
      },
      {
        accountId: '/billingProfiles/af789aab-770e-4b30-aa89-b3beff721a21',
        accountName: 'MyHome-prod (Billing Profile)',
        createdDate: '2023-04-15T14:19:57.838885',
        currency: 'GBP',
        id: 'fa27113a-1c04-461f-9ba4-08db3b587085',
        provider: 'Azure',
        providerId: '110b4410-6724-4f90-7505-08db3385df55',
        status: 'Failed',
        statusReason: 'Missing permissions on a subscription',
      },
    ];

    RenderServiceConnectionRows(CustomerConnectedBillingAccounts);

    expect(screen.getByText('MyHome-prod (Billing Profile)')).toBeInTheDocument();
    expect(screen.getByText('MyHome-dev')).toBeInTheDocument();
    expect(screen.getByText('ddiware')).toBeInTheDocument();
  });
});
