import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import * as appRoutes from './router/appRoutes';
import { useIsDemo } from '../components/hoc/withDemo';

import { isAuthCookieAvailable } from '../services/api/processToken';

interface IInitializeAppProps {}

/*
  This component will check for the presence of an Auth cookie and if isDemo is true.
  If the cookie is present, the user will be redirected to the landing page.
  isAuthCookieAvailable will also fecth the user's profile
*/

const InitializeApp: React.FC<IInitializeAppProps> = (props) => {
  console.log('initializeApp');
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
