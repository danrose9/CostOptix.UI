import React from 'react';
import { Spinner, Shimmer } from '../Loader';

export function WithSpinner(Component) {
  return function WithSpinnerComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <Spinner />;
  };
}

export function WithShimmer(Component) {
  return function WithShimmerComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <Shimmer />;
  };
}
