import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProviderImage } from '../ProviderImage';
import * as images from '../../assets/index';

afterEach(() => {
  cleanup();
});

describe('Service Provider', () => {
  const providers = {
    AWS: images.AWS96,
    Azure: images.AZURE96,
    Google: images.GOOGLE96,
    Salesforce: images.SALESFORCE96,
    Microsoft: images.MICROSOFT96,
  };
  // for (const [key, value] of Object.entries(providers)) {
  //   console.log(`${key}: ${value}`);
  // }

  test('should render correct image for AWS', () => {
    const { getByAltText } = render(
      <ProviderImage provider="AWS" size="mini" />
    );
    const image = screen.getByAltText('ServiceProviderLogo');
    expect(image.src).toContain(providers.AWS);
    expect(image).toBeInTheDocument();
  });

  test('should render correct image for Azure', () => {
    const { getByAltText } = render(
      <ProviderImage provider="Azure" size="mini" />
    );
    const image = screen.getByAltText('ServiceProviderLogo');
    expect(image.src).toContain(providers.Azure);
    expect(image).toBeInTheDocument();
  });
});
