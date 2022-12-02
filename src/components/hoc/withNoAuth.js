import React from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';

export const withNoAuth = (ComponentToBeRendered) => {
  const Authenticate = (props) => {
    const { isAuthenticated } = useSelector(
      (state) => state[reduxState.USER_PROFILE]
    );

    if (!isAuthenticated)
      return isAuthenticated && <ComponentToBeRendered {...props} />;
    return null;
  };
  return Authenticate;
};
