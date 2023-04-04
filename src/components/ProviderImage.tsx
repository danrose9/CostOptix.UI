import React from 'react';
import { Image } from 'semantic-ui-react';
import * as images from '../assets/index';
import { SemanticFLOATS, SemanticSIZES } from 'semantic-ui-react';

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

  return (
    <Image src={image} size={props.size} alt="ServiceProviderLogo" floated={props.floated} style={{ margin: 0 }} />
  );
};
