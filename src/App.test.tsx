import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './services/redux/store';
import { Provider } from 'react-redux';
import { IChildren } from './types';

const ApplicationWrapper = ({ children }: IChildren) => <Provider store={store}>{children}</Provider>;

test('App Render', async () => {
  render(<App />, { wrapper: ApplicationWrapper });

  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
