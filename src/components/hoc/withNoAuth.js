import React from 'react';
import { isAuthenticated } from '../../services/api/processToken';

export const withNoAuth = (ComponentToBeRendered) => {
  const Authenticate = (props) => {
    if (!isAuthenticated()) return false && <ComponentToBeRendered {...props} />;
    return null;
  };
  return Authenticate;
};
