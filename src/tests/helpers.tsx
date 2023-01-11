import React, { ReactNode } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../services/redux/store';
import { Children } from '../types';

export const ApplicationWrapper = ({ children }: Children) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);
