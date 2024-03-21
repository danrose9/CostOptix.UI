import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const eventTypes = {
  DEMO_LOGIN: 'demo_login',
  USER_ID: 'user_id',
  LOGIN_BUTTON: 'login_button',
  SIGNUP_BUTTON: 'signup_button',
  HELP_CENTER_BUTTON_CLICK: 'hc_button_click',
};

export const userTypes = {
  DEMO: 'demo',
  UNKNOWN: 'unknown',
};

export const useTrackEvent = (event: string, event_data: Record<string, string>, deps: unknown[]) => {
  useEffect(() => {
    ReactGA.event(event, event_data);
  }, [deps, event, event_data]);
};
