import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const useTrackEvent = (event: string, event_data: Record<string, string>, deps: unknown[]) => {
  useEffect(() => {
    ReactGA.event(event, event_data);
  }, [deps, event, event_data]);
};
