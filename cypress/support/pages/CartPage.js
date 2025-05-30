class CartPage {
    // Selectors
    cartItems = '.cart_item'
    checkoutButton = '[data-test="checkout"]'

    // Actions
    proceedToCheckout() {
        cy.get(this.checkoutButton).click()
    }

    // Validations
    verifyCartItemCount(count) {
        cy.get(this.cartItems).should('have.length', count)
    }
}

export default new CartPage() 