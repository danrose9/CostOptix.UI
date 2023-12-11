import React from 'react';
import { Navigate } from 'react-router-dom';
import * as appRoutes from './appRoutes';
import { isAuthenticated } from '../../services/api/processToken';

interface IPrivateRoute {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to={appRoutes.HOME} />;
};

export default PrivateRoute;
