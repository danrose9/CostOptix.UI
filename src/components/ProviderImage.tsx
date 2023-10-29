import React from 'react';
import { Image } from 'semantic-ui-react';
import * as images from '../assets/index';
import { SemanticFLOATS, SemanticSIZES } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledImage = styled(Image)`
  margin: 0 0.5em !important;
`;

interface IProps {
  provider: string;
  size?: SemanticSIZES;
  floated?: SemanticFLOATS;
}

export const ProviderImage = (props: IProps) => {
  const Providers: Record<string, keyof typeof Image> = {
    AWS: images.AWS96,
    Azure: images.AZURE96,
    Google: images.GOOGLE96,
    Salesforce: images.SALESFORCE96,
    Microsoft: images.MICROSOFT96,
  };

  const image = Providers[props.provider];

  return <StyledImage src={image} size={props.size} alt="ServiceProviderLogo" floated={props.floated} />;
};
