import React from 'react';

export interface TourStep {
  content: React.ReactNode;
  locale?: { skip: React.ReactNode };
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  target: string;
  title?: string;
  disableBeacon?: boolean;
}

export const TOUR_STEPS: TourStep[] = [
  {
    target: '[product-tour="tour-start"]',
    content:
      'This is your default dashboard. Each widget gives you a different view of your spend across different providers.',
    disableBeacon: true,
  },
  {
    target: '[product-tour="active-providers"]',
    content:
      'These are the connected billing accounts. You can add or remove providers and billing accounts through the Service Connections page.',
  },
  {
    target: '[product-tour="most-expensive"]',
    content: 'You can drill into each resource to get a detailed view of your spend',
  },
  {
    target: '#cost-containers',
    content: 'foo',
  },
];
