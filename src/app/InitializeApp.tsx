import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import { isAuthCookieAvailable } from '../utils/processToken';

interface IInitializeAppProps {}

const InitializeApp: React.FC<IInitializeAppProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useMemo(() => {
    if (isAuthCookieAvailable()) {
      setIsAuthenticated(true);
    }
  }, []);

  return <>{isAuthenticated ? <Navigate to="/lp" /> : <Navigate to="/" />}</>;
};

export default InitializeApp;
