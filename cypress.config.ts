import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalModifyObstructiveThirdPartyCode: true,
  },
  env: {
    aad_username: 'zzz_testuser1@reddogdev.onmicrosoft.com',
    aad_password: 'Bodo4132&6',
    aad_organizationname: 'Red Dog Development',
    aad_userfullname: 'zzz_testuser1',
  },
});
