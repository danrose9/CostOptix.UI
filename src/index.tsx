// ============================================================================================================
// <copyright file="Index.tsx"
//  © 2023 DDI Software
//  ALL RIGHTS RESERVED.
// </copyright>
// ============================================================================================================

import React from 'react';
import { createRoot } from 'react-dom/client';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import { Provider } from 'react-redux';
import './App.css';
import { store, persistor } from './services/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import ReactGA from 'react-ga4';
import reportWebVitals from './reportWebVitals';
const GA_MEASUREMENT_ID = process.env.REACT_APP_GTAG;

ReactGA.initialize(GA_MEASUREMENT_ID as string);

declare global {
  interface Window {
    Cypress: any;
  }
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// To log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// expose store when run in Cypress
type CypressWindow = Window & typeof globalThis & { Cypress: any; store: any };
const testWindow = window as CypressWindow;

if (testWindow.Cypress) {
  testWindow.store = store;
}
