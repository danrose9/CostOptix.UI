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

  test('should render correct image for AWS', () => {
    const { getByAltText } = render(<ProviderImage provider="AWS" size="mini" floated={'right'} />);
    const image: HTMLImageElement = screen.getByAltText('ServiceProviderLogo');

    expect(image.src).toContain(providers.AWS);
    expect(image).toBeInTheDocument();
  });

  test('should render correct image for Azure', () => {
    const { getByAltText } = render(<ProviderImage provider="Azure" size="mini" floated={'right'} />);
    const image: HTMLImageElement = screen.getByAltText('ServiceProviderLogo');
    expect(image.src).toContain(providers.Azure);
    expect(image).toBeInTheDocument();
  });
});
