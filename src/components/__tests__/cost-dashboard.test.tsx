import React from 'react';
import { render, cleanup, getByTestId, getByText, screen, RenderResult } from '@testing-library/react';
import CostDashboard from '../pages/cost-dashboard/CostDashboard';
import { MostExpensiveInstance, FastestGrowingInstance } from '../pages/cost-dashboard';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApplicationWrapper } from '../../tests/helpers';
import BillingAccounts from '../pages/cost-dashboard/ActiveBillingAccounts';
import { IBillingAccount } from '../../types';
import { Provider } from 'react-redux';
import { store } from '../../services/redux/store';
import ActiveBillingAccounts from '../pages/cost-dashboard/ActiveBillingAccounts';
import { fetchBillingAccounts } from '../../services/redux/thunks/serviceProvidersThunk';

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

describe('Cost Dashboard', () => {
  // test('should render Cost Dashboard', () => {
  //   render(<CostDashboard />, { wrapper: ApplicationWrapper });
  // });

  const isCurrencyConflictCallback = () => {};

  const renderBillingAccounts = (): RenderResult =>
    render(
      <ActiveBillingAccounts isCurrencyConflictCallback={isCurrencyConflictCallback}>
        <BillingAccounts billingAccounts={billingAccounts} />
      </ActiveBillingAccounts>,
      { wrapper: ApplicationWrapper }
    );

  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve<any>({ json: () => Promise.resolve(billingAccounts) }));
  });

  test('active billing accounts should render', () => {
    const { getByTestId } = renderBillingAccounts();

    const initialState = screen.getByText(/Searching for billing accounts ../i);
    expect(initialState).toBeInTheDocument();
  });

  test('active billing accounts widget should render the correct number of billing accounts', () => {
    const activeBillingAccounts = renderBillingAccounts();
  });

  test('matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <CostDashboard />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Most Expensive resource widget', () => {
  test('should render widget', () => {
    render(<MostExpensiveInstance isCurrencyConflict={false} />, { wrapper: ApplicationWrapper });
  });

  test('column width is correct', () => {
    const { getByTestId } = render(<MostExpensiveInstance isCurrencyConflict={true} />, {
      wrapper: ApplicationWrapper,
    });

    expect(getByTestId('header-cell-1')).toHaveProperty('colSpan', 4);
  });
});

// describe('Fastest Growing resource widget', () => {
//   test('should render widget', () => {
//     render(<FastestGrowingInstance />, {
//       wrapper: ApplicationWrapper,
//     });
//   });

//   // test click header
//   // test click row
// });
