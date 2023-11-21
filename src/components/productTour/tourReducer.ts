import { TOUR_STEPS } from './steps';

type TourAction = {
  type: 'START' | 'RESET' | 'STOP' | 'NEXT_OR_PREV' | 'RESTART';
  payload?: any;
};

export const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

export const tourReducer = (state = INITIAL_STATE, action: TourAction) => {
  console.log('tourReducer', action);
  switch (action.type) {
    case 'START':
      return { ...state, run: true };
    case 'RESET':
      return { ...state, stepIndex: 0 };
    case 'STOP':
      return { ...state, run: false };
    case 'NEXT_OR_PREV':
      return { ...state, ...action.payload };
    case 'RESTART':
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};
