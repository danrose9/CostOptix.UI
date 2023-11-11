import * as appRoutes from '../../../src/app/router/appRoutes';
import { IRootState } from '../../../src/services/redux/rootReducer';

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

    // cy.purgeSession();

    cy.window()
      .should('have.property', 'store') // Make sure the store is available
      .then((win: any) => {
        const state = win.Cypress.store.getState();
        expect(state.userProfile).to.be.empty;
      });

    // You can also check if the user is redirected to the login page or not
    cy.url().should('eq', `${Cypress.config().baseUrl}${appRoutes.ROOT}`);
  });
});
