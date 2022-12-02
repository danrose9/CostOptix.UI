import React from 'react';
import * as images from '../assets/index';
import { Image } from 'semantic-ui-react';

export const ProductName = () => {
  return (
    <div>
      <Image src={images.LOGOWHITE} size="medium" centered />
    </div>
  );
};
