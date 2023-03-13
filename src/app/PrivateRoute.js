import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reduxState } from '../services/redux/reduxState';
import * as appRoutes from './appRoutes';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state[reduxState.USER_PROFILE]);
  return isAuthenticated ? children : <Navigate to={appRoutes.HOME} />;
};

export default PrivateRoute;
