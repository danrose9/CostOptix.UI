describe('Azure Active Directory Authentication', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    // log into Azure Active Directory through our sample SPA using our custom command
    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'));
  });

  it('verifies the user logged in has the correct name', () => {
    cy.get('[data-testid="navbarItem-3"]').should('have.text', `${Cypress.env('aad_userfullname')}`);
    cy.get('[data-testid="sidebar-organizationName"]').should('have.text', `${Cypress.env('aad_organizationname')}`);
  });
});
