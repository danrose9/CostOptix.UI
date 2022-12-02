import React from 'react';

import { render, cleanup } from '@testing-library/react';
import CostDashboard from '../cost-dashboard/CostDashboard';
import {
  MostExpensiveInstance,
  FastestGrowingInstance,
} from '../cost-dashboard';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../../services/redux/store';

afterEach(() => {
  cleanup();
});

describe('Cost Dashboard', () => {
  test('should render Cost Dashboard', () => {
    render(
      <Provider store={store}>
        <Router>
          <CostDashboard />
        </Router>
      </Provider>
    );
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
    render(
      <Provider store={store}>
        <Router>
          <MostExpensiveInstance isCurrencyConflict={false} />
        </Router>
      </Provider>
    );
  });

  test('column width is correct', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <MostExpensiveInstance isCurrencyConflict={true} />
        </Router>
      </Provider>
    );

    expect(getByTestId('header-cell-1')).toHaveProperty('colSpan', 4);
  });
});

describe('Fastest Growing resource widget', () => {
  test('should render widget', () => {
    render(
      <Provider store={store}>
        <Router>
          <FastestGrowingInstance />
        </Router>
      </Provider>
    );
  });

  // test click header
  // test click row
});
