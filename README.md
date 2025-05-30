## This project was created to fulfill the Automated test requirements of the Test Automation Engineer assignment from spriteCloud
### Author: [Mohammed Rasool Abdul Azeez](https://www.linkedin.com/in/mohammed-rasool-abdul-azeez/)
#### Email: razuldt@gmail.com

### Software/OS versions that were used to create/update the project:
1. Cypress version: ```14.4.0```
2. Nodejs version: ```18.19.1```
3. Language: JavaScript
4. IDE: ```VS Code```
5. OS: ```MacOS Sequoia 15.0```

### Assumptions:
- I made the following assumptions:
  - The application works on all browsers (to reduce the scope of cross-browser testing). So all the automated tests were mostly run on the ```Electron v130``` browser
  - The automated tests run as expected on MacOS. The automated test runs may not work completely on other Operating systems (Windows/Linux).

### Pre-Requisites to run tests on a machine:
1. Install Node.js version (```18.x```)
2. Clone this project
3. Open the project in an IDE
4. Open up a terminal and run: ```npm install``` (to download/configure Cypress along with other required dependencies.)

### Application Pre-Requisite setup before running the automated tests (IMPORTANT !):
- **<ins>Please make sure that the Sauce Demo website (https://www.saucedemo.com/) is accessible before running the automated tests.</ins>**
- **<ins>The test data is already pre-configured in the ```cypress/fixtures/testData.json``` file.</ins>**

### Automated test scenarios:
1. **Scenario 1: Login Functionality Tests**
   - Automated Test Steps:
     - Test failed login with invalid credentials
     - Test failed login with locked out user
     - Verify appropriate error messages for both scenarios

2. **Scenario 2: Product Sorting Tests**
   - Automated Test Steps:
     - Sort products by name (Z to A)
     - Verify product sorting order
     - Validate sorting functionality

3. **Scenario 3: Checkout Process Tests**
   - Automated Test Steps:
     - Add two specific items to cart (backpack and bike light)
     - Calculate and verify total price
     - Complete checkout process with user information
     - Verify final price including tax
     - Validate order completion

4. **Scenario 4: API Tests (ReqRes.in)**
   - Automated Test Steps:
     - Test user list retrieval with pagination (page 2)
     - Test successful login with valid credentials
     - Test user update with specific data
     - Test user deletion
     - Test failed login with missing password
     - Test error handling for non-existent user
     - Test delayed response (3 seconds) and validate response time

### Scenario/Tests location:
- UI Tests are located in: ```./cypress/e2e/uitests/```
  - Login tests: ```login.cy.js```
  - Sorting tests: ```sorting.cy.js```
  - Checkout tests: ```checkout.cy.js```
- API Tests are located in: ```./cypress/e2e/apitests/reqres_api.cy.js```

### Framework information/details:
1. **Hooks (before, beforeEach and afterEach):**
   - The ```beforeEach``` hook:
     - In Login tests: Loads test data from ```cypress/fixtures/testData.json```
     - In Sorting and Checkout tests: Logs in as a standard user before each test
   - The ```afterEach``` hook will run after each test to log out of the application, ensuring a clean state for the next test.

2. **Page Objects:**
   - Located at: ```./cypress/support/pages/```
   - InventoryPage.js - Contains inventory page methods for product listing and sorting
   - CartPage.js - Contains cart page methods for managing items
   - CheckoutPage.js - Contains checkout page methods for completing purchase

3. **Test Data:**
   - Located at: ```cypress/fixtures/testData.json```

4. **Global re-usable functions (Commands):**
   - Located at: ```./cypress/support/commands.js```
   - Contains custom commands for API requests and common UI interactions

5. **BaseUrl (for UI test) and Environment variables:**
   - Located at: ```./cypress.config.js```
   - API Key for ReqRes.in is stored in: ```./cypress.env.json```

### Running the automated tests:

#### Run the E2E automation suite (all tests) headlessly (on Electron v130) and Generate the Mochawesome report:
1. We have MochAwesome Reporter v3.5.1 configured within NPM scripts (```scripts``` within ```package.json```).
2. Open up a terminal and run: ```npm run cypress:test:all:report```
   - This NPM script will:
     - Delete all old reports from ```cypress/reports/```
     - Run all the tests
     - Generate a new MochAwesome report with all test results combined
3. The MochAwesome Report will be located at: ```cypress/reports/index.html```