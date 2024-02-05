import * as appRoutes from '../../../src/app/router/appRoutes';

describe('Login flow', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  test('#4. user is signed up and is redirected to login successfully when clicking signup button', () => {
    cy.get('[data-testid="get-started-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SIGNUP}`);

    cy.fillSignUpForm(Cypress.env('aad_reddogdev_username_1'), Cypress.env('aad_reddogdev_orgname'));
    cy.get('[data-testid="next-button"]').click();
  });

  test('#3. user is signed up and can login successfully when clicking login button', () => {
    cy.login(Cypress.env('aad_reddogdev_username_1'), Cypress.env('aad_reddogdev_password_1'));
    cy.logout();
  });
});
