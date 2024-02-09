import React from 'react';
import CookieConsent from 'react-cookie-consent';

export interface ICookieBannerProps {}

export function CookieBanner(props: ICookieBannerProps) {
  return (
    <>
      <CookieConsent>This site uses cookies.</CookieConsent>
    </>
  );
}

export default CookieBanner;
