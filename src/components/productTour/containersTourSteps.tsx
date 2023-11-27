import React from 'react';
import * as appRoutes from '../../app/router/appRoutes';
import { TourStep } from './types';

export const targets = {
  DEMO_STEP_1: '[product-tour="cost-container"]',
};

export const CONTAINER_TOUR_STEPS: TourStep[] = [
  {
    target: targets.DEMO_STEP_1,
    content: 'foo',
    disableBeacon: true,
  },
];
