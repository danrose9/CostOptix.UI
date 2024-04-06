import * as appRoutes from '../../../src/app/router/appRoutes';

describe('Login flow', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  /* 
    For a login test, you will need to:
    1. Create an Organization in the by calling the API directly
    2. Create a user in the organization in the by calling the API directly
    3. Click the "Login" button or the "Get Started" button and login with the user you created
    4. Click the "Logout" button to logout
    5. Purge the user and organization you created
  */

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
