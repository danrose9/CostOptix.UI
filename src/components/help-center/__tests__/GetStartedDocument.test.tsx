import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GetStartedDocument from '../GetStartedDocument';
import * as images from '../../../assets/index';

describe('GetStartedDocument', () => {
  it('renders the document with all segments', () => {
    render(<GetStartedDocument />);

    // Check for main heading
    expect(screen.getByText('Get Started')).toBeInTheDocument();

    // Descriptions for all GetStartedSegment components
    const descriptions = [
      'Signup and create a new CostOptix account to get started.',
      'Connect your cloud services to CostOptix and start analyzing your spend.',
      'Create a cost container and analyze resource spend across different service providers.',
      'Get insights into your cloud spend and start optimizing your costs.',
    ];

    descriptions.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    // If using alt text for images, check for images by alt text
    // This assumes your images have alt attributes reflecting the heading or description
    // Example: <img src={image} alt={`${heading} icon`} />
    // You'd check like so:
    // expect(screen.getByAltText('Setup a new account icon')).toHaveAttribute('src', images.CHECKLIST_ICON);
    // Add similar assertions for other images, adjusting alt text as necessary

    // Since we cannot directly check images src attribute without an alt text or role in RTL,
    // and assuming there's no dynamic alt text or roles provided,
    // this part of the test is more challenging to implement directly.
    // One way around this limitation is to ensure that each image in your component has an alt text or is wrapped in a descriptive element (like a button with a title) that can be queried.
  });
});
