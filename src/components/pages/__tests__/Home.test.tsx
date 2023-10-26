import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApplicationWrapper } from '../../../tests/helpers';
import renderer from 'react-test-renderer';

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
        <Router>
          <HomePage />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
