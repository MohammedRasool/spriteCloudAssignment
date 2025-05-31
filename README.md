## This project was created to fulfill the Automated test requirements of the Test Automation Engineer assignment from spriteCloud
### Author: [Mohammed Rasool Abdul Azeez](https://www.linkedin.com/in/mohammed-rasool-abdul-azeez/)
#### Email: razuldt@gmail.com

## Table of Contents
- [Software/OS Versions](https://github.com/MohammedRasool/TrengoAssignment#softwareos-versions-that-were-used-to-createupdate-the-project)
- [Assumptions](https://github.com/MohammedRasool/spriteCloudAssignment#assumptions)
- [Pre-Requisites to run tests on a machine](https://github.com/MohammedRasool/spriteCloudAssignment#pre-requisites-to-run-tests-on-a-machine)
- [Application Setup](https://github.com/MohammedRasool/spriteCloudAssignment#application-pre-requisite-setup-before-running-the-automated-tests-important-)
- [Test Scenarios](https://github.com/MohammedRasool/spriteCloudAssignment#automated-test-scenarios)
- [Test Locations](https://github.com/MohammedRasool/spriteCloudAssignment#scenariotests-location)
- [Framework Details](https://github.com/MohammedRasool/spriteCloudAssignment#framework-informationdetails)
- [Running Tests](https://github.com/MohammedRasool/spriteCloudAssignment#run-the-automation-suite-locally-headless-via-cli-and-generate-the-mochawesome-report)
  - [Local Execution](https://github.com/MohammedRasool/spriteCloudAssignment#run-the-automation-suite-locally-headless-via-cli-and-generate-the-mochawesome-report)
  - [Pipeline Execution](https://github.com/MohammedRasool/spriteCloudAssignment#run-the-automated-tests-via-pipeline-github-actions-workflow--cypress-cloud-integration)
- [Test Results](https://github.com/MohammedRasool/spriteCloudAssignment#run-results)
- [Future Improvements](https://github.com/MohammedRasool/spriteCloudAssignment#future-improvements)

## Software/OS versions that were used to create/update the project:
1. Cypress version: ```14.4.0```
2. Nodejs version: ```18.19.1```
3. Language: JavaScript
4. IDE: ```VS Code```
5. OS: ```MacOS Sequoia 15.0```

## Assumptions:
- I made the following assumptions:
  - The application works on all browsers (to reduce the scope of cross-browser testing). So all the automated tests were mostly run on the ```Electron v130``` browser
  - The automated tests run as expected on MacOS. The automated test runs may not work completely on other Operating systems (Windows/Linux).

## Pre-Requisites to run tests on a machine:
1. Install Node.js version (```18.x```)
2. Clone this project
3. Open the project in an IDE
4. Open up a terminal and run: ```npm install``` (to download/configure Cypress along with other required dependencies.)

## Application Pre-Requisite setup before running the automated tests (IMPORTANT !):
- **<ins>Please make sure that the Sauce Demo website (https://www.saucedemo.com/) is accessible before running the automated tests.</ins>**
- **<ins>The test data is already pre-configured in the ```cypress/fixtures/testData.json``` file.</ins>**

## Automated test scenarios:
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

## Scenario/Tests location:
- UI Tests are located in: ```./cypress/e2e/uitests/```
  - Login tests: ```login.cy.js```
  - Sorting tests: ```sorting.cy.js```
  - Checkout tests: ```checkout.cy.js```
- API Tests are located in: ```./cypress/e2e/apitests/reqres_api.cy.js```

## Framework information/details:
1. **Hooks (before, beforeEach and afterEach):**
   - The ```beforeEach``` hook:
     - In Login tests: Loads test data from ```cypress/fixtures/testData.json```
     - In Sorting and Checkout tests: Logs in as a standard user before each test
   - The ```afterEach``` hook will run after each test to log out of the application, ensuring a clean state for the next test.

2. **Page Objects:**
   - Located at: ```./cypress/support/pages/```
   - ```InventoryPage.js``` - Contains inventory page methods for product listing and sorting
   - ```CartPage.js``` - Contains cart page methods for managing items
   - ```CheckoutPage.js``` - Contains checkout page methods for completing purchase

3. **Test Data:**
   - Located at: ```cypress/fixtures/testData.json```

4. **Global re-usable functions (Commands):**
   - Located at: ```./cypress/support/commands.js```
   - Contains custom commands for API requests and common UI interactions

5. **BaseUrl (for UI test) and Environment variables:**
   - Located at: ```./cypress.config.js```
   - API Key for ReqRes.in was locally stored in : ```./cypress.env.json```, but this file was not pushed to the repo for security reasons. The API Key is therefore stored as a GitHub secret (`REQRES_API_KEY`)

## Run the automation suite locally (headless via CLI) and Generate the Mochawesome report:
1. We have MochAwesome Reporter v3.5.1 configured within NPM scripts (```scripts``` within ```package.json```).
2. Open up a terminal and run: ```npm run cypress:test:all:report```
   - This NPM script will:
     - Delete all old reports from ```cypress/reports/```
     - Run all the tests
     - Generate a new MochAwesome report with all test results combined
3. The MochAwesome Report will be located at: ```cypress/reports/index.html```

## Run the automated tests via Pipeline: GitHub Actions workflow + Cypress Cloud integration

The project uses GitHub Actions for continuous integration and Cypress Cloud for test reporting. The workflow is configured in `.github/workflows/cypress-cloud.yml`.

### Workflow Triggers
- Automatic runs on:
  - Push to main branch
  - Pull requests to main branch
- Manual trigger option available

### Workflow Steps
1. **Checkout Code**: Retrieves the latest code from the repository
2. **Setup Node.js**: Configures Node.js environment with npm caching
3. **Install Dependencies**: Installs project dependencies using `npm ci`
4. **Cypress Cloud**: Runs tests and records results to Cypress Cloud

### Cypress Cloud Features
- **Test Recording**: All test runs are recorded and available in the Cypress Cloud dashboard
- **Parallel Execution**: Tests run in parallel for faster execution
- **Test Grouping**: Results are grouped under "UI Tests" for better organization
- **Build Tracking**: Each test run is uniquely identified by the commit SHA
- **Comprehensive Dashboard**: Access to:
  - Test results and history
  - Video recordings of test runs
  - Screenshots of failures
  - Performance metrics
  - Test duration statistics

### Required Secrets
The following secrets must be configured in GitHub:
- `CYPRESS_RECORD_KEY`: Authentication key for Cypress Cloud
- `REQRES_API_KEY`: API key for ReqRes.in API tests

## Run results:
- ### Mochawesome report (Local run)
  - Report is attached here: ```./mochawesome_report.html``` (screenshot seen below)
  - ![Image](https://github.com/user-attachments/assets/e0dc3a8c-fc7f-4a0d-88f0-379f8a74615e)

- ### Github Action workflow passed (Pipeline run)
  - Pipeline runs link: https://github.com/MohammedRasool/spriteCloudAssignment/actions (screenshot seen below)
  - ![Image](https://github.com/user-attachments/assets/dad9db99-43e3-4bf9-9fec-b261eacc75f9)

- ### Cypress cloud results (triggered by Github Actions pipeline run)
  - ![Image](https://github.com/user-attachments/assets/586c8f59-6cb3-41be-a0d4-1cabf044ffa6)

## Future Improvements
1. **Visual Regression Testing**
   - Implement visual testing using tools like Percy or Applitools
   - Compare UI changes across different environments
   - Automate visual validation of UI components

2. **API Testing Enhancements**
   - Implement API mocking using MSW (Mock Service Worker)
   - Create more reliable and isolated API tests
   - Reduce dependency on external services

3. **Test Stability**
   - Implement retry mechanisms for flaky tests
   - Add better error handling and recovery
   - Improve test reliability and consistency

4. **CI/CD Pipeline**
   - Add parallel test execution across different browsers
   - Implement cross-browser testing strategy
   - Add Slack/Teams notifications for test results
   - Improve test result visibility

5. **Debugging and Logging**
   - Add more detailed logging capabilities
   - Implement better debugging tools
   - Improve error tracking and reporting

6. **Mobile Testing**
   - Add mobile automation support
   - Implement mobile-specific test scenarios
   - Support for both iOS and Android platforms