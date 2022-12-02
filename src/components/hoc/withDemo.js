import React from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';

export const withDemo = (ComponentToBeRendered) => (props) => {
  const { isDemo } = useSelector((state) => state[reduxState.USER_PROFILE]);

  if (isDemo) return <ComponentToBeRendered {...props} />;
  return null;
};

export const withNoDemo = (ComponentToBeRendered) => (props) => {
  const { isDemo } = useSelector((state) => state[reduxState.USER_PROFILE]);

  if (!isDemo) return <ComponentToBeRendered {...props} />;
  return null;
};
