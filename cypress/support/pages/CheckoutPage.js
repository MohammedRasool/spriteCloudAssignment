class CheckoutPage {
    // Selectors
    firstNameInput = '[data-test="firstName"]'
    lastNameInput = '[data-test="lastName"]'
    postalCodeInput = '[data-test="postalCode"]'
    continueButton = '[data-test="continue"]'
    finishButton = '[data-test="finish"]'
    subtotalLabel = '.summary_subtotal_label'
    completeHeader = '.complete-header'

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
    verifyTotalPrice(expectedTotal) {
        cy.get(this.subtotalLabel).invoke('text').then((text) => {
            const total = parseFloat(text.match(/\$(\d+\.\d+)/)[1])
            expect(total).to.equal(expectedTotal)
        })
    }

    verifyOrderCompletion() {
        cy.get(this.completeHeader).should('contain', 'Thank you for your order!')
    }

    verifyTotalPriceWithTax(expectedItemTotal) {
        // Get the tax from the page and add it to the expected item total
        cy.get('.summary_tax_label').invoke('text').then(taxText => {
            const tax = parseFloat(taxText.match(/\$(\d+\.\d+)/)[1]);
            const expectedFinalTotal = +(expectedItemTotal + tax).toFixed(2); // round to 2 decimals

            // Get the displayed total (after taxes)
            cy.get('.summary_total_label').invoke('text').then(totalText => {
                const displayedTotal = parseFloat(totalText.match(/\$(\d+\.\d+)/)[1]);
                expect(displayedTotal).to.equal(expectedFinalTotal);
            });
        });
    }
}

export default new CheckoutPage() 