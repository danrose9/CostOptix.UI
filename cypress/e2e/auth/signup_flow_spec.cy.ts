import * as appRoutes from '../../../src/app/router/appRoutes';

describe('Login flow', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  test('organization has not signed up and user selects signup', () => {
    cy.get('[data-testid="get-started-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SIGNUP}`);
    cy.fillSignUpForm(Cypress.env('aad_username_93456387'));
    cy.get('[data-testid="next-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
    cy.contains('Continue with Azure').should('be.visible').click();
    cy.loginToAAD(Cypress.env('aad_username_93456387'), Cypress.env('aad_password_93456387'));
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.COST_DASHBOARD}`);
    cy.contains(Cypress.env('aad_userfullname_93456387')).should('be.visible');
    cy.logout();

    // delete organization from database
    // cy.deleteOrganization(Cypress.env('aad_organizationname_93456387'));
  });

  // test('organization has not signed up and user selects login', () => {
  // cy.get('[data-testid="get-started-button"]').click();
  // cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SIGNUP}`);
  // cy.fillSignUpForm(Cypress.env('aad_username'));
  // cy.get('[data-testid="next-button"]').click();
  // cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
  // cy.contains('Continue with Azure').should('be.visible').click();
  // cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'));
  // cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.COST_DASHBOARD}`);
  // cy.contains(Cypress.env('aad_userfullname')).should('be.visible');
  // cy.logout();
  // });
});
