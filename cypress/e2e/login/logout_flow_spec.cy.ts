import * as appRoutes from '../../../src/app/router/appRoutes';

describe('Logout Flow', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  test('should clear sessionStorage and reset redux state on logout', () => {
    // Login to the app
    cy.login(Cypress.env('aad_reddogdev_username_1'), Cypress.env('aad_reddogdev_password_1'));

    // Perform the logout operation
    cy.logout();

    cy.purgeSession();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.ROOT}`);
  });
});
