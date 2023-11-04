// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import * as appRoutes from '../../src/app/router/appRoutes';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// cypress/support/e2e.ts

function loginViaAAD(username: string, password: string) {
  const baseUrl = Cypress.config('baseUrl');

  // Login to your AAD tenant.
  cy.origin(
    'login.microsoftonline.com',
    {
      args: {
        username,
      },
    },
    ({ username }) => {
      cy.get('input[type="email"]').type(username, {
        log: false,
      });
      cy.get('input[type="submit"]').click();
    }
  );

  // depending on the user and how they are registered with Microsoft, the origin may go to live.com
  cy.origin(
    'login.microsoftonline.com',
    {
      args: {
        password,
      },
    },
    ({ password }) => {
      cy.get('input[type="password"]').type(password, {
        log: false,
      });
      cy.get('input[type="submit"]').click();
      cy.get('#idBtn_Back').click();
    }
  );
}

Cypress.Commands.add('logout', () => {
  const log = Cypress.log({
    displayName: 'Azure Active Directory Logout',
    message: [`🔐 Logging out`],
    autoEnd: false,
  });
  log.snapshot('before');

  cy.get('[data-testid="navbarItem-3"]').click();
  cy.contains('Log Out').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGOUT}`);
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.HOME}`);

  log.snapshot('after');
  log.end();
});

Cypress.Commands.add('loginToAAD', (username: string, password: string) => {
  const log = Cypress.log({
    displayName: 'Azure Active Directory Login',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });
  log.snapshot('before');

  loginViaAAD(username, password);

  log.snapshot('after');
  log.end();
});

Cypress.Commands.add('fillSignUpForm', (username: string) => {
  const log = Cypress.log({
    displayName: 'Fill out signup form',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });
  log.snapshot('before');

  cy.get('input#organization').type('Cypress Test Org');
  cy.get('input#email').type(username);
  cy.contains('label', 'I agree to the Terms of Service').click();

  log.snapshot('after');
  log.end();
});

Cypress.Commands.add('login', (username: string, password: string) => {
  const log = Cypress.log({
    displayName: 'CostOptix Login',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });
  log.snapshot('before');

  cy.get('[data-testid="login-ext-button"]').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.LOGIN}`);
  cy.contains('Continue with Azure').should('be.visible').click();
  cy.loginToAAD(username, password);
  cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.COST_DASHBOARD}`);
  log.snapshot('after');
  log.end();
});
