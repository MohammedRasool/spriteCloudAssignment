class InventoryPage {
    // Selectors
    sortDropdown = '.product_sort_container'
    productNames = '.inventory_item_name'
    productPrices = '.inventory_item_price'
    cartLink = '.shopping_cart_link'
    removeButtons = '[data-test^="remove-"]'
    continueShoppingButton = '[data-test="continue-shopping"]'

    // Actions
    sortProducts(sortOption) {
        cy.get(this.sortDropdown).select(sortOption)
    }

    addItemToCart(item) {
        cy.fixture('testData.json').then((testData) => {
            cy.get(`[data-test="${testData.products[item].selector}"]`).click()
        })
    }

    removeAllItemsFromCart() {
        this.goToCart()
        
        // Get the body element of the page
        cy.get('body').then(($body) => {
            // Check if any remove buttons exist in the cart
            if ($body.find(this.removeButtons).length > 0) {
                // If remove buttons exist, click each one to remove items
                cy.get(this.removeButtons).each(($button) => {
                    cy.wrap($button).click()
                })
            }
            // Return to inventory page
            cy.get(this.continueShoppingButton).click()
        })
    }

    goToCart() {
        cy.get(this.cartLink).click()
    }

    // Validations
    verifyProductSorting() {
        // Initialize an empty array to store product names
        const productNames = []
        
        // Get all product name elements and iterate through each one
        cy.get(this.productNames).each(($el) => {
            // Extract the text content of each product name and add it to the array
            productNames.push($el.text())
        }).then(() => {
            // Create a copy of the array, sort it alphabetically, then reverse it for Z-A order
            const sortedNames = [...productNames].sort().reverse()
            // Compare the actual order of products on the page with the expected Z-A sorted order
            expect(productNames).to.deep.equal(sortedNames)
        })
    }

    getProductPrice(index) {
        return cy.get(this.productPrices).eq(index).invoke('text')
            .then(price => parseFloat(price.replace('$', '')))
    }
}

export default new InventoryPage() 