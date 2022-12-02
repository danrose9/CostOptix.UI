import React from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';

export const withAuth = (ComponentToBeRendered) => (props) => {
  const { isAuthenticated } = useSelector(
    (state) => state[reduxState.USER_PROFILE]
  );

  if (isAuthenticated) return <ComponentToBeRendered {...props} />;
  return null;
};

export const withNoAuth = (ComponentToBeRendered) => (props) => {
  const { isAuthenticated } = useSelector(
    (state) => state[reduxState.USER_PROFILE]
  );

  if (!isAuthenticated) return <ComponentToBeRendered {...props} />;
  return null;
};
