import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as appRoutes from './appRoutes';
import { isAuthenticated } from '../../services/api/processToken';

interface IPrivateRoute {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
  const [renderRoute, setRenderRoute] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      setRenderRoute(authenticated);
    };

    checkAuthentication();
  }, []);

  if (renderRoute === null) {
    return null;
  }

  return renderRoute ? <>{children}</> : <Navigate to={appRoutes.HOME} />;
};

export default PrivateRoute;
