import React from 'react';
import { createRoot } from 'react-dom/client';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import { Provider } from 'react-redux';
import './App.css';
import { store, persistor } from './services/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById('root') as HTMLElement) ;

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
