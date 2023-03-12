describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.contains('View Demo').click();
    cy.url().should('include', 'Demo Organization');
  });
});
