import React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';
import styled from 'styled-components';

interface ILoaderProps {
  text?: string;
}

const StyledLoader = styled(SemanticLoader)`
  font-size: 1.5em;
`;

export const Loader: React.FC<ILoaderProps> = ({ text }) => {
  return (
    <>
      <StyledLoader>{text}</StyledLoader>
    </>
  );
};
