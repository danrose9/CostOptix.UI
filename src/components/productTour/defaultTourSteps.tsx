import React from 'react';
import * as appRoutes from '../../app/router/appRoutes';
import { TourStep } from './types';

export const targets = {
  DEMO_STEP_1: '[product-tour="tour-start"]',
  DEMO_STEP_2: '[product-tour="active-providers"]',
  DEMO_STEP_3: '[product-tour="most-expensive"]',
  DEMO_STEP_4: 'cost-containers',
  DEMO_STEP_5: '[product-tour="cost-container"]',
  DEMO_STEP_6: '[product-tour="service-connection"]',
};

export const DEFAULT_TOUR_STEPS: TourStep[] = [
  {
    target: targets.DEMO_STEP_1,
    content:
      'This is your default dashboard. Each widget gives you a different view of your spend across different providers.',
    disableBeacon: true,
  },
  {
    target: targets.DEMO_STEP_2,
    content:
      'These are the connected billing accounts. You can add or remove providers and billing accounts through the Service Connections page.',
  },
  {
    target: targets.DEMO_STEP_3,
    content: 'You can drill into each resource to get a detailed view of your spend',
  },
  {
    target: `#${targets.DEMO_STEP_4}`,
    content:
      'CostOptix allows to you collect and create multiple views of your services so you can easily visualize your spend.',
    redirectTo: appRoutes.COST_CONTAINERS,
  },
  {
    target: targets.DEMO_STEP_5,
    content:
      'Cost Containers are a virtual grouping of resources across different service providers or billing accounts.',
    redirectTo: appRoutes.SERVICE_PROVIDERS,
  },
  {
    target: targets.DEMO_STEP_6,
    content:
      'To get started, create a new service connection. You can add or remove providers and billing accounts through each connection.',
    redirectTo: appRoutes.COST_DASHBOARD,
  },
];
