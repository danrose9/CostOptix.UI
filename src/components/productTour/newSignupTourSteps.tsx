import { TourStep } from './types';

export const targets = {
  DEMO_STEP_1: '[product-tour="service-connection-start"]',
  DEMO_STEP_2: '[product-tour="add-connection-button"]',
};

export const NEW_SIGNUP_TOUR_STEPS: TourStep[] = [
  {
    target: targets.DEMO_STEP_1,
    content:
      'To get started, create a new service connection. You can add or remove providers and billing accounts through each connection.',
    disableBeacon: true,
  },
  {
    target: targets.DEMO_STEP_2,
    content:
      'Simply add a new connection, complete the steps and select each billing account you want to connect to CostOptix.',
    disableBeacon: false,
  },
];
