import React from 'react';
import { Image } from 'semantic-ui-react';
import * as images from '../assets/index';

import { IProviderImage } from '../types';

export const ProviderImage = (props: IProviderImage) => {
  const Providers = {
    AWS: images.AWS96,
    Azure: images.AZURE96,
    Google: images.GOOGLE96,
    Salesforce: images.SALESFORCE96,
    Microsoft: images.MICROSOFT96,
  };

  const image = Providers[props.provider] ;

  return (
    <Image
      src={image}
      size={props.size}
      alt="ServiceProviderLogo"
      floated={props.floated}
    />
  );
};
