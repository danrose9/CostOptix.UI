import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../pages/home/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

describe('Home Page', () => {
  test('should render Home Page', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
  });

  test('should contain buttons', () => {
    const { getByTestId } = render(
      <Router>
        <HomePage />
      </Router>
    );

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
