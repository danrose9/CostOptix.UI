import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import * as appRoutes from './router/appRoutes';
import { useIsDemo } from '../components/hoc/withDemo';

import { isAuthCookieAvailable } from '../utils/processToken';

interface IInitializeAppProps {}

const InitializeApp: React.FC<IInitializeAppProps> = (props) => {
  const isDemo = useIsDemo();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useMemo(() => {
    if (isAuthCookieAvailable()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>{isAuthenticated ? <Navigate to={appRoutes.LANDING_PAGE} state={isDemo} /> : <Navigate to={appRoutes.ROOT} />}</>
  );
};

export default InitializeApp;
