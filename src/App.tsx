import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApplicationContextProvider } from './app/ApplicationContext';

import AppContent from './app/AppContent';
import ReactGA from 'react-ga';

const TRACKING_ID = 'G-6KPES2WMQB';
ReactGA.initialize(TRACKING_ID);

export const App = () => {
  sessionStorage.setItem('application version', process.env.REACT_APP_VERSION as string);

  return (
    <>
      <Router>
        <ApplicationContextProvider>
          <AppContent />
        </ApplicationContextProvider>
      </Router>
    </>
  );
};

export default App;
