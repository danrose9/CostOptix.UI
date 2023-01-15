import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CostDashboard from '../../pages/cost-dashboard/CostDashboard';
import { MostExpensiveInstance, FastestGrowingInstance } from '../../pages/cost-dashboard';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApplicationWrapper } from '../helpers';

import { Provider } from 'react-redux';
import { store } from '../../services/redux/store';

afterEach(() => {
  cleanup();
});

describe('Cost Dashboard', () => {
  test('should render Cost Dashboard', () => {
    render(<CostDashboard />, { wrapper: ApplicationWrapper });
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

describe('Fastest Growing resource widget', () => {
  test('should render widget', () => {
    render(<FastestGrowingInstance />, {
      wrapper: ApplicationWrapper,
    });
  });

  // test click header
  // test click row
});
