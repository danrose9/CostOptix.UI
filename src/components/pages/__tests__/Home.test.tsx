import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../homepage/HomePage';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApplicationWrapper } from '../../../tests/helpers';
import renderer from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
import { IRootState, rootReducer } from '../../../services/redux/rootReducer';
import { reduxState } from '../../../services/redux/reduxState';

// Mock the store
const mockStore = configureStore<IRootState>({
  reducer: rootReducer,
  preloadedState: {
    [reduxState.USER_PROFILE]: {
      organization: {
        name: 'Test Organization',
      },
    },
  },
});

afterEach(() => {
  cleanup();
});

describe('Home Page', () => {
  test('should render Home Page', () => {
    render(<HomePage />, { wrapper: ApplicationWrapper });
  });

  test('should contain buttons', () => {
    const { getByTestId } = render(<HomePage />, { wrapper: ApplicationWrapper });

    expect(getByTestId('login-ext-button')).toBeEnabled();
    expect(getByTestId('login-demo-button')).toBeEnabled();
    expect(getByTestId('get-started-button')).toBeEnabled();
  });

  test('matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <Router>
            <HomePage />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
