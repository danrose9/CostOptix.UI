import React from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';

interface WithDemoProps {
  [key: string]: any;
}

export const useIsDemo = () => {
  return useSelector((state: IRootState) => state[reduxState.USER_PROFILE].isDemo);
};

export const withDemo =
  <P extends WithDemoProps>(ComponentToBeRendered: React.ComponentType<P>) =>
  (props: P) => {
    const isDemo = useIsDemo();

    if (isDemo) return <ComponentToBeRendered {...props} />;
    return null;
  };

export const withOutDemo =
  <P extends WithDemoProps>(ComponentToBeRendered: React.ComponentType<P>) =>
  (props: P) => {
    const isDemo = useIsDemo();

    if (!isDemo) return <ComponentToBeRendered {...props} />;
    return null;
  };
