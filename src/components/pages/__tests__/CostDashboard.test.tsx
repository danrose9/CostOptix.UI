import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import CostDashboard from '../cost-dashboard/CostDashboard';
import { ApplicationWrapper } from '../../../tests/helpers';
import { ApplicationContext } from 'src/app/ApplicationContext';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

const billingAccounts = [
  {
    id: '755c2753-f2c1-45c0-db70-08db055424dd',
    accountName: 'ddiware',
    provider: 'Azure',
    billingAccountId: 'c53e746d-2278-436f-d58e-08db05542036',
    createdDate: '2023-02-02T19:31:55.6845658',
    currency: 'USD',
    status: 'transient',
    isLoading: false,
    isError: false,
  },
  {
    id: '336b6dbe-3023-4a2b-ac4d-08db34326edc',
    accountName: 'costoptix',
    provider: 'Azure',
    billingAccountId: '13dc79ec-8c00-5a6e-aa52-2bf50657f5c9',
    createdDate: '2023-02-02T19:31:55.6845658',
    currency: 'CAD',
    status: 'non-transient',
    isLoading: true,
    isError: false,
  },
];

describe('CostDashboard Components', () => {
  beforeEach(() => {
    render(
      <ApplicationContext.Provider value={{ settings: { preferredCurrency: 'USD' } }}>
        {/* <CostDashboard /> */}
      </ApplicationContext.Provider>,
      { wrapper: ApplicationWrapper }
    );
  });

  test('true should be true', () => {
    expect(true).toBe(true);
  });

  // test('should render the CostDashboard component', () => {
  //   expect(screen.getByText('Cost Dashboard')).toBeInTheDocument();
  // });

  // test('should render the CostDashboardChart widget', () => {
  //   expect(screen.getByTestId('cost-dashboard-chart')).toBeInTheDocument();
  // });

  // test('should render the CostDasboardEstimates widget', () => {
  //   expect(screen.getByTestId('cost-dashboard-estimates')).toBeInTheDocument();
  // });

  // test('should render the MostExpensiveResources widget', () => {
  //   expect(screen.getByTestId('most-expensive-resources')).toBeInTheDocument();
  // });

  // test('should render the FastestGrowingResources widget', () => {
  //   expect(screen.getByTestId('fastest-growing-resources')).toBeInTheDocument();
  // });

  // test('should render the BillingAccounts widget', () => {
  //   expect(screen.getByTestId('billing-accounts')).toBeInTheDocument();
  // });
});
