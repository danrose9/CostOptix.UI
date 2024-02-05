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

  // Dismiss welcome message
  cy.get('.actions > :nth-child(2) > :nth-child(1)').click();

  // Redirect to Service Providers page as there are no billing accounts
  cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.SERVICE_PROVIDERS}`);
  log.snapshot('after');
  log.end();
});

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

Cypress.Commands.add('fillSignUpForm', (username: string, organization: string) => {
  const log = Cypress.log({
    displayName: 'Fill out signup form',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });
  log.snapshot('before');

  cy.get('input#organization').type(organization);
  cy.get('input#email').type(username);
  cy.contains('label', 'I agree to the').click();

  log.snapshot('after');
  log.end();
});

Cypress.Commands.add('deleteOrganization', (organization: string) => {
  const log = Cypress.log({
    displayName: 'Delete organization',
    message: [`🔐 Deleting organization | ${organization}`],
    autoEnd: false,
  });
  log.snapshot('before');

  cy.contains('Settings').click();
  cy.get('[data-testid="delete-account-button"]').should('be.visible').click();

  cy.get('button').contains('Return').should('be.visible').click();
  cy.get('[data-testid="delete-account-button"]').should('be.visible').click();

  cy.get('[data-testid="return-button"]').should('be.visible');
  cy.get('[data-testid="organization-name-input"]').should('be.visible').type(organization);
  cy.contains('button', 'Remove Account').should('be.visible').click().wait(2000);

  cy.get('[data-testid="get-started-button"]').should('be.visible');
  cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.ROOT}`);

  log.snapshot('after');
  log.end();
});

Cypress.Commands.add('purgeSession', () => {
  const log = Cypress.log({
    displayName: 'Purge all sessions',
    message: [`🔐 Clear all session cookies`],
    autoEnd: false,
  });
  log.snapshot('before');
  cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.ROOT}`);

  // check 'authToken' is purged from session storage
  cy.window().then((win) => {
    expect(win.sessionStorage.getItem('authToken')).to.be.null;
  });

  // check 'authToken' cookie is purged
  cy.getCookie('authToken').should('not.exist');

  // check 'persist:root' is purged from session storage
  cy.fixture('emptyState.json').then((emptyState) => {
    cy.window().then((win) => {
      const persistRoot = JSON.parse(win.sessionStorage.getItem('persist:root'));
      expect(persistRoot.userProfile).to.deep.equal(emptyState.userProfile);
    });
  });

  // check redux state is reset
  cy.visit('/');
  cy.fixture('emptyState.json').then((data) => {
    const expectedUserProfile = JSON.parse(data.userProfile);

    cy.window()
      .its('store')
      .invoke('getState')
      .its('userProfile')
      .should((actualUserProfile) => {
        expect(actualUserProfile).to.deep.equal(expectedUserProfile);
      });
  });

  log.snapshot('after');
  log.end();
});
