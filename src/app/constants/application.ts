const { version } = require('../../../package.json');

export const APP = {
  NAME: 'CostOptix',
  VERSION: `${version}`,
  RELEASE: 'BETA',
  COPYRIGHT: '© 2023 DDIWARE LTD. ALL RIGHTS RESERVED.',
};

export const APP_FOOTER = {
  CONTENT: `${APP.NAME} v${APP.VERSION} ${APP.RELEASE} ${APP.COPYRIGHT}`,
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
