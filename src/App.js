import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContent from '../src/app/AppContent';

require('dotenv').config();
console.log(process.env);

export const App = () => {
  sessionStorage.setItem('application version', process.env.REACT_APP_VERSION);

  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
};
export default App;
