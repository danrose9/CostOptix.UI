import { defineConfig } from 'cypress';

export default defineConfig({
  // projectId: 'f6noip',
  e2e: {
    baseUrl: 'https://dev.costoptix.com',
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
    aad_username_93456387: 'admin@M365x93456387.onmicrosoft.com',
    aad_password_93456387: 'Gqnw%OT=854fV~0%',
    aad_organizationname_93456387: 'Contoso',
    aad_userfullname_93456387: 'MOD Administrator',
  },
});
