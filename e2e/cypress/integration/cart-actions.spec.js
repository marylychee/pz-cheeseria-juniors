/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

  })

  it('Performs the Purchase action ', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();
    cy.get('[data-cy=open-cart').click();
    cy.get('[data-cy=purchase').click();

    cy.get('[data-cy=cart]').should('include.text', 'Purchase Successful');

  })

})
