import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import * as appRoutes from './router/appRoutes';

import { isAuthCookieAvailable } from '../services/api/processToken';
import { useBillingAccountCount } from 'src/hooks/useBillingAccountCount';
import { Loader } from 'src/components/Loader';

interface IInitializeAppProps {}

/*
  This component will check for the presence of an Auth cookie and if isDemo is true.
  If the cookie is present, the user will be redirected to the landing page.
  isAuthCookieAvailable will also fecth the user's profile
*/

const InitializeApp: React.FC<IInitializeAppProps> = (props) => {
  // flag to be used to set if organization has configured any billing accounts
  const { billingAccountCount, isLoading } = useBillingAccountCount();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useMemo(() => {
    if (isAuthCookieAvailable()) {
      setIsAuthenticated(true);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={appRoutes.LANDING_PAGE} state={billingAccountCount} />
      ) : (
        <Navigate to={appRoutes.ROOT} />
      )}
    </>
  );
};

export default InitializeApp;
