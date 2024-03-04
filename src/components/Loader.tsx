import React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';

interface ILoaderProps {
  text?: string;
}

export const Loader: React.FC<ILoaderProps> = ({ text }) => {
  return (
    <SemanticLoader size="large" active inline="centered">
      {text}
    </SemanticLoader>
  );
};
