import * as appRoutes from '../../../src/app/router/appRoutes';

describe('Login flow', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  test('user is signed up and can login successfully when clicking login button', () => {
    cy.get('[data-testid="login-ext-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
    cy.contains('Continue with Azure').should('be.visible').click();
    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'));
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.COST_DASHBOARD}`);

    cy.logout();
  });

  test('user is signed up and can login successfully when clicking signup button', () => {
    cy.get('[data-testid="get-started-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SIGNUP}`);

    cy.fillSignUpForm(Cypress.env('aad_username'));
    cy.get('[data-testid="next-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
    cy.contains('Continue with Azure').should('be.visible').click();
    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'));
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.COST_DASHBOARD}`);
    cy.contains(Cypress.env('aad_userfullname')).should('be.visible');
    cy.logout();
  });
});
