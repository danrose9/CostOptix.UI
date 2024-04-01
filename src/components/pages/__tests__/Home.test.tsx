import React from 'react';
import { render, cleanup, fireEvent, screen, waitFor, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  // test('should be able to click login button and then return home successfully', async () => {
  //   const user = userEvent.setup();
  //   render(<HomePage />, { wrapper: ApplicationWrapper });

  //   const loginButton = screen.getByTestId('login-ext-button');

  //   await user.click(loginButton);
  //   // Await the assertions inside waitFor
  //   await waitFor(() => {
  //     expect(screen.getByText('Log in to CostOptix')).toBeInTheDocument();
  //     // user.click(screen.getByTestId('close-button'));

  //     // expect(screen.getByText('wefkwefgwegewhbg')).toBeInTheDocument();
  //   });
  // });
});
