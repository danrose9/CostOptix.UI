import React from 'react';
import { isAuthenticated } from '../../services/api/processToken';

export const withAuth = (ComponentToBeRendered) => (props) => {
  if (isAuthenticated()) return <ComponentToBeRendered {...props} />;
  return null;
};

export const withNoAuth = (ComponentToBeRendered) => (props) => {
  if (!isAuthenticated()) return <ComponentToBeRendered {...props} />;
  return null;
};
