interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

const elements = {
  productCard: (name: string) => {
    const getCard = () => cy.contains('[data-testid="product-card"] h2', name).parent().parent();

    return {
      self: () => getCard(),
      addButton: () => getCard().find('[data-testid="product-card-add-button"]'),
      removeButton: () => getCard().find('[data-testid="product-card-remove-button"]'),
      image: () => getCard().find('img'),
      price: () => getCard().find('h3'),
    };
  },
  header: () => cy.get('[data-testid="header"]'),
};

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

viewports.forEach(({ name, width, height }) => {
  describe(`Home page (Viewport: ${name})`, () => {
    let products: Product[] = [];

    const intercept = () => {
      cy.intercept('/products', (req) => {
        delete req.headers['if-none-match'];
      }).as('products');
    };

    const waitInterception = () => {
      cy.wait('@products').then(({ response }) => {
        products = response?.body;
      });
    };

    beforeEach(() => {
      cy.viewport(width, height);
    });

    describe('Render fetched products', () => {
      it('Given i am on the home page', () => {
        intercept();
        cy.visit('/');
        waitInterception();
      });

      it('Then product should be visible', () => {
        products.forEach(({ name, price, imageUrl }) => {
          elements
            .productCard(name)
            .self()
            .within(() => {
              cy.contains('h3', price).should('exist');
              cy.get('img').should('have.attr', 'src').and('include', imageUrl);
            });
        });
      });
    });

    describe('Add and remove a product from cart', () => {
      it('Given i am on the home page', () => {
        cy.visit('/');
      });

      it('Then product should be visible', () => {
        elements.productCard(products[0].name).self().should('be.visible');
      });

      it('When i add an item to the cart', () => {
        elements.productCard(products[0].name).addButton().click();
      });

      it('Then it should increase product quantity', () => {
        elements.productCard(products[0].name).self().find('button').contains('1').should('exist');
        elements.header().find('span').contains('1').should('exist');
      });

      it('When i decrease quantity', () => {
        elements.productCard(products[0].name).removeButton().click();
      });

      it('Then it should decrease product quantity', () => {
        elements.productCard(products[0].name).self().find('button').contains('0').should('not.exist');
        elements.header().find('span').contains('0').should('exist');
      });
    });
  });
});
