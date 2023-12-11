import React, { useState, useEffect } from 'react';
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

// const PrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
//   const [authStatus, setAuthStatus] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const isAuthenticated = await checkIsAuthenticated();
//       setAuthStatus(isAuthenticated);
//     };

//     checkAuthentication();
//   }, []);

//   if (authStatus === null) {
//     return <div>Loading...</div>; // or some loading indicator
//   }

//   return authStatus ? <>{children}</> : <Navigate to={appRoutes.HOME} />;
// };
