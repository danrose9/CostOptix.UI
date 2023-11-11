import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContent from './app/AppContent';

export const App = () => {
  sessionStorage.setItem('application version', process.env.REACT_APP_VERSION as string);

  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
};

export default App;
