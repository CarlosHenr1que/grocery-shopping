describe('@grocery-shopping/frontend-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should see home page', () => {
    cy.contains('Home').should('be.visible');
  });
});
