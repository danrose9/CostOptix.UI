const { version } = require('../../../package.json');

export const APP = {
  NAME: 'CostOptix',
  VERSION: `${version}`,
  RELEASE: '', // ALPHA, BETA, RC, RELEASE
  COPYRIGHT: '© 2024 DDIWARE LTD. ALL RIGHTS RESERVED.',
};

export const APP_FOOTER = {
  LONG: `${APP.NAME} v${APP.VERSION} ${APP.RELEASE} ${APP.COPYRIGHT}`,
  SHORT: `${APP.RELEASE}  ${APP.COPYRIGHT}`,
};

export const ENVIRONMENT = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  LOCAL: 'local',
};

export const TITLE = {
  TERMS: 'Terms of Service',
  PRIVACY: 'Privacy Policy',
};

export const defaultPageSize = 10;

export const TRIAL_LENGTH = '30 day';
