import { defineConfig } from 'cypress';

export default defineConfig({
  // projectId: 'f6noip',
  e2e: {
    baseUrl: 'https://costoptix.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalModifyObstructiveThirdPartyCode: true,
  },
  env: {
    aad_reddogdev_username_1: 'zzz_testuser1@reddogdev.onmicrosoft.com',
    aad_reddogdev_fullname_1: 'zzz_testuser1',
    aad_reddogdev_password_1: 'Bodo4132&6',
    aad_reddogdev_orgname: 'Red Dog Development',

    aad_93456387_username_1: 'admin@M365x93456387.onmicrosoft.com',
    aad_93456387_password_1: 'Gqnw%OT=854fV~0%',
    aad_93456387_fullname_1: 'MOD Administrator',
    aad_93456387_orgname: 'Contoso',
  },
});
