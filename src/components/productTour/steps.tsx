import React from 'react';

// Define the type for each step
interface TourStep {
  content: React.ReactNode;
  locale?: { skip: React.ReactNode };
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  target: string;
  title?: string;
  // Add other properties as needed
}

// Define the tour steps
const tourSteps: TourStep[] = [
  {
    content: <h2>Let's begin our journey</h2>,
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
    placement: 'center',
    target: 'body',
  },
];

export default tourSteps;
