import InventoryPage from '../../support/pages/InventoryPage'

describe('Product sorting Z-A', () => {
  beforeEach(() => {
    cy.loginAsStandardUser()
  })

  afterEach(() => {
    cy.logout()
  })

  it('should sort items by name Z-A and validate the sorting', () => {
    InventoryPage.sortProducts('za')
    InventoryPage.verifyProductSorting()
  })
}) 