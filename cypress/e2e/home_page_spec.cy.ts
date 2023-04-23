describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');

    cy.url().should('include', '/home');
  });
});
