import React, { ReactNode } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../services/redux/store';
import { IChildren } from '../types';

export const ApplicationWrapper = ({ children }: IChildren) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);
