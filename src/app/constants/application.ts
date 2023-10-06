const { version } = require('../../../package.json');

export const APP = {
  NAME: 'CostOptix',
  VERSION: `${version}`,
  ENVIRONMENT: 'BETA',
  COPYRIGHT: '© 2023 DDIWARE. ALL RIGHTS RESERVED.',
};

export const APP_FOOTER = {
  CONTENT: `${APP.NAME} v${APP.VERSION} ${APP.ENVIRONMENT} ${APP.COPYRIGHT}`,
};
