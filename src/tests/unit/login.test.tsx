import React from 'react';
import ReactDOM from 'react-dom';
import { Login, LoginDemo } from '../../components/auth/Login';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('Login Button', () => {
  test('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login></Login>, div);
  });

  test('renders button correctly', () => {
    const { getByTestId } = render(<Login color="black"></Login>);
    expect(getByTestId('login-ext-button')).toHaveStyle('font-size: 1.7em');
    expect(getByTestId('login-ext-button')).toBeVisible();
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<Login color="black"></Login>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
