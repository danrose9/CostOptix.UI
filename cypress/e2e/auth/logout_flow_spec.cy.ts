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

    cy.wait(5000);
    // Check if sessionStorage is cleared
    cy.window().then((win) => {
      // expect(win.sessionStorage.getItem('persist:root')).to.not.contain(Cypress.env('aad_reddogdev_password_1'));
      expect(win.sessionStorage.getItem('authTokens')).to.be.null;
    });

    // Attempt to get the "AuthCookie" cookie

    cy.getCookie('AuthCookie').should('not.exist');

    // You can also check if the user is redirected to the login page or not
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.ROOT}`);
  });
});
