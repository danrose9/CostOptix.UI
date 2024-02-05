import * as appRoutes from '../../../src/app/router/appRoutes';

describe('Home page flow', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  test('verify a user can click login and then return to home screen successfully', () => {
    cy.get('[data-testid="login-ext-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
    cy.get('[data-testid="close-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.HOME}`);
  });

  test('verify a user can click signup and then return to home screen successfully', () => {
    cy.get('[data-testid="get-started-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SIGNUP}`);
    cy.get('[data-testid="close-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.HOME}`);
  });
});

describe('Legal Declarations', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.get('[data-testid="login-ext-button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
  });

  test('verify a user can click Terms and Conditions', () => {
    cy.contains('Terms of Service').click();
    cy.contains('Licence to use website').should('be.visible');
    cy.get('[data-testid="close-legal-modal-button"]').click();
    cy.contains('Looking for the signup page?').should('be.visible');
  });

  test('verify a user can click Privacy Policy', () => {
    cy.contains('Privacy Policy').click();
    cy.contains('Welcome to DDIware').should('be.visible');
    cy.get('[data-testid="close-legal-modal-button"]').click();
    cy.contains('Looking for the signup page?').should('be.visible');
  });
});
