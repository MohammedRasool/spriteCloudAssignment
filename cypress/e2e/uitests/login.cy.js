describe('Failed login validation', () => {
  let testData

  beforeEach(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data
    })
  })

  it('should show error message for invalid login credentials', () => {
    cy.loginWithInvalidCredentials()
    cy.verifyErrorMessage(testData.errorMessages.invalidCredentials)
  })

  it('should show error message for locked out user', () => {
    cy.loginAsLockedUser()
    cy.verifyErrorMessage(testData.errorMessages.lockedUser)
  })
}) 