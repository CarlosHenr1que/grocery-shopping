describe('@grocery-shopping/frontend-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should see home page', () => {
    cy.get('[data-testid="product-card"]').should('be.visible');
  });
});
