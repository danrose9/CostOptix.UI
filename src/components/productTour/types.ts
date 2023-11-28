export interface TourStep {
  content: React.ReactNode;
  locale?: { skip: React.ReactNode };
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  target: string;
  title?: string;
  disableBeacon?: boolean;
  redirectTo?: string;
}

export type InitialStateType = {
  key: Date;
  run: boolean;
  continuous: boolean;
  loading: boolean;
  stepIndex: number;
  steps: [];
};

export type TourAction = {
  type: 'START' | 'RESET' | 'STOP' | 'NEXT_OR_PREV' | 'RESTART';
  payload?: any;
};
