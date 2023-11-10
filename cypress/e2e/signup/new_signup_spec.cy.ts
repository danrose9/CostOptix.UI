import * as appRoutes from '../../../src/app/router/appRoutes';

describe('Login flow', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  test('#1. organization has not signed up and user selects signup', () => {
    // Starts at Home page
    cy.get('[data-testid="get-started-button"]').click();

    // Starts signup flow
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SIGNUP}`);
    cy.fillSignUpForm(Cypress.env('aad_93456387_username_1'), Cypress.env('aad_93456387_orgname'));
    cy.get('[data-testid="next-button"]').click();

    // Redirects to Login page
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
    cy.contains('Continue with Azure').should('be.visible').click();
    cy.loginToAAD(Cypress.env('aad_93456387_username_1'), Cypress.env('aad_93456387_password_1')).wait(1000);

    // Redirects to Cost Dashboard page
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.COST_DASHBOARD}`);
    cy.contains(Cypress.env('aad_93456387_fullname_1')).should('be.visible').wait(3000);

    // Deletes organization from database
    cy.deleteOrganization(Cypress.env('aad_93456387_orgname'));
  });
});
