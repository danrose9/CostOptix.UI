import * as appRoutes from '../../../src/app/router/appRoutes';

describe('Login flow', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  test('#1. organization has not signed up and user selects signup', () => {
    cy.get('[data-testid="get-started-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SIGNUP}`);

    cy.fillSignUpForm(Cypress.env('aad_93456387_username_1'));
    cy.get('[data-testid="next-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
    cy.contains('Continue with Azure').should('be.visible').click();

    cy.loginToAAD(Cypress.env('aad_93456387_username_1'), Cypress.env('aad_93456387_password_1'));
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.COST_DASHBOARD}`);
    cy.contains(Cypress.env('aad_93456387_fullname_1')).should('be.visible');
    cy.contains('Settings').click();
    cy.get('[data-testid="delete-account-button"]').click();
    // cy.deleteOrganization(Cypress.env('aad_organizationname_93456387'));
  });

  // test('#2. organization has not signed up and user selects login', () => {
  //   cy.get('[data-testid="login-ext-button"]').click();
  //   cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);

  //   cy.contains('Continue with Azure').should('be.visible').click();
  //   cy.loginToAAD(Cypress.env('aad_93456387_username_1'), Cypress.env('aad_93456387_password_1'));

  //   cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SIGNUP}?error=UserNotSignedUp`);
  //   cy.contains('Please complete the form above to sign up').should('be.visible');

  //   cy.fillSignUpForm(Cypress.env('aad_93456387_username_1'));
  //   cy.get('[data-testid="next-button"]').click();

  //   cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
  //   cy.contains('Continue with Azure').should('be.visible').click();
  //   cy.loginToAAD(Cypress.env('aad_93456387_username_1'), Cypress.env('aad_93456387_password_1'));
  //   cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.COST_DASHBOARD}`);
  //   cy.contains(Cypress.env('aad_93456387_fullname_1')).should('be.visible');

  //   cy.logout();

  //   // delete organization from database
  //   // cy.deleteOrganization(Cypress.env('aad_organizationname_93456387'));
  // });
});
