import React from 'react';
import { Loader } from '../Loader';

export function WithSpinner(Component) {
  return function WithSpinnerComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <Loader />;
  };
}
