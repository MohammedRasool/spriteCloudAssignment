import InventoryPage from '../../support/pages/InventoryPage'
import CartPage from '../../support/pages/CartPage'
import CheckoutPage from '../../support/pages/CheckoutPage'

describe('Checkout process', () => {
    beforeEach(() => {
        cy.loginAsStandardUser()
    })

    afterEach(() => {
        cy.logout()
    })

    it('should complete checkout with two items and validate final price', () => {
        // Remove any existing items from cart
        InventoryPage.removeAllItemsFromCart()
        
        // Add items to cart
        InventoryPage.addItemToCart('backpack')
        InventoryPage.addItemToCart('bikeLight')
        
        // Get first item price
        InventoryPage.getProductPrice(0).then(firstPrice => {
            // Get second item price
            InventoryPage.getProductPrice(1).then(secondPrice => {
                const totalPrice = firstPrice + secondPrice

                // Go to cart and verify items
                InventoryPage.goToCart()
                CartPage.verifyCartItemCount(2)
                
                // Proceed to checkout
                CartPage.proceedToCheckout()
                
                // Fill checkout information
                CheckoutPage.fillCheckoutInformation()
                
                // Verify total price and complete checkout
                CheckoutPage.verifyTotalPriceWithTax(totalPrice)
                CheckoutPage.completeCheckout()
                
                // Verify order completion
                CheckoutPage.verifyOrderCompletion()
            })
        })
    })
}) 