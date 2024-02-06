import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const useTrackPageView = (pageName: string, deps: unknown[]) => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: pageName, title: pageName });
  }, [deps, pageName]);
};
