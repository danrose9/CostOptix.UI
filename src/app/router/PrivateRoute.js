import React from 'react';
import { Navigate } from 'react-router-dom';
import * as appRoutes from './appRoutes';
import { isAuthenticated } from '../../utils/processToken';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={appRoutes.HOME} />;
};

export default PrivateRoute;
