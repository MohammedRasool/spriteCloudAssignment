class CheckoutPage {
    // Selectors
    firstNameInput = '[data-test="firstName"]'
    lastNameInput = '[data-test="lastName"]'
    postalCodeInput = '[data-test="postalCode"]'
    continueButton = '[data-test="continue"]'
    finishButton = '[data-test="finish"]'
    completeHeader = '.complete-header'
    taxLabel = '.summary_tax_label'
    totalLabel = '.summary_total_label'

    // Actions
    fillCheckoutInformation() {
        cy.fixture('testData.json').then((testData) => {
            cy.get(this.firstNameInput).type(testData.checkout.firstName)
            cy.get(this.lastNameInput).type(testData.checkout.lastName)
            cy.get(this.postalCodeInput).type(testData.checkout.postalCode)
            cy.get(this.continueButton).click()
        })
    }

    completeCheckout() {
        cy.get(this.finishButton).click()
    }

    // Validations
    verifyOrderCompletion() {
        cy.get(this.completeHeader).should('contain', 'Thank you for your order!')
    }

    verifyTotalPriceWithTax(expectedItemTotal) {
        // Get the tax from the page and add it to the expected item total
        cy.get(this.taxLabel).invoke('text').then(taxText => {
            const tax = parseFloat(taxText.match(/\$(\d+\.\d+)/)[1]);
            const expectedFinalTotal = +(expectedItemTotal + tax).toFixed(2); // round to 2 decimals

            // Get the displayed total (after taxes)
            cy.get(this.totalLabel).invoke('text').then(totalText => {
                const displayedTotal = parseFloat(totalText.match(/\$(\d+\.\d+)/)[1]);
                expect(displayedTotal).to.equal(expectedFinalTotal);
            });
        });
    }
}

export default new CheckoutPage() 