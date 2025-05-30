// Base login command
Cypress.Commands.add('login', (userType) => {
    cy.fixture('testData.json').then((testData) => {
        const user = testData.users[userType]
        cy.visit('/')
        cy.get('[data-test="username"]').type(user.username)
        cy.get('[data-test="password"]').type(user.password)
        cy.get('[data-test="login-button"]').click()
    })
})

// Specific login commands
Cypress.Commands.add('loginAsStandardUser', () => {
    cy.login('standard')
})

Cypress.Commands.add('loginAsLockedUser', () => {
    cy.login('locked')
})

Cypress.Commands.add('loginWithInvalidCredentials', () => {
    cy.login('invalid')
})

Cypress.Commands.add('verifyErrorMessage', (expectedMessage) => {
  cy.get('[data-test="error"]').should('be.visible');
  cy.get('[data-test="error"]').should('contain', expectedMessage);
});

// Reusable API request helper
Cypress.Commands.add('apiRequest', (method, endpoint, body, failOnStatusCode) => {
    // Get API key from environment variable or config
    const apiKey = Cypress.env('REQRES_API_KEY')
    
    // Default headers
    const headers = {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
    }

    // Make the request
    return cy.request({
        method: method,
        url: endpoint,
        headers: headers,
        body: body,
        failOnStatusCode: failOnStatusCode
    })
})

// Specific API request commands
Cypress.Commands.add('getRequest', (endpoint, failOnStatusCode) => {
    return cy.apiRequest('GET', endpoint, null, failOnStatusCode)
})

Cypress.Commands.add('postRequest', (endpoint, body, failOnStatusCode) => {
    return cy.apiRequest('POST', endpoint, body, failOnStatusCode)
})

Cypress.Commands.add('putRequest', (endpoint, body, failOnStatusCode) => {
    return cy.apiRequest('PUT', endpoint, body, failOnStatusCode)
})

Cypress.Commands.add('deleteRequest', (endpoint, failOnStatusCode) => {
    return cy.apiRequest('DELETE', endpoint, null, failOnStatusCode)
})

// Logout command
Cypress.Commands.add('logout', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    cy.url().should('include', '/')
})