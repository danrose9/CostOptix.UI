import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import { isAuthCookieAvailable } from '../utils/processToken';

const InitializeApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useMemo(() => {
    if (isAuthCookieAvailable()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>{isAuthenticated ? <Navigate to="/lp" /> : <Navigate to="/home" />}</>
  );
};
export default InitializeApp;
