import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApplicationContextProvider } from './app/ApplicationContext';
import { DocumentProvider } from './components/help-center/DocumentContext';
import AppContent from './app/AppContent';

export const App = () => {
  sessionStorage.setItem('application version', process.env.REACT_APP_VERSION as string);

  return (
    <>
      <Router>
        <ApplicationContextProvider>
          <DocumentProvider>
            <AppContent />
          </DocumentProvider>
        </ApplicationContextProvider>
      </Router>
    </>
  );
};

export default App;
