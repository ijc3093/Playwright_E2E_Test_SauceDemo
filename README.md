# Playwright E2E Test SauceDemo
This project includes a thorough end-to-end (E2E) test suite for the SauceDemo application, which was developed with TypeScript and Playwright. To guarantee a scalable, maintainable, and supportive architecture, the test suite is created using fixtures, utility functions, and the Page Object Model (POM) design pattern. This post shows how to create an automated test for "www.SauceDemo.cow" using Playwright's built-in test runner, @playwright/test, and Node.js. Also, this purpose is to ensure that the application's functions are verified when testing it.

# Technical & Structural Requirements
This test suite was developed using the "Five-Year" philosophy, which emphasizes long-term code quality and collaboration.

- The Page Object Model (POM) abstracts all selectors and page-specific interactions into dedicated page classes (e.g., LoginPage.ts, ProductsPage.ts, CartPage.ts, CheckoutPage.ts and CheckoutOveriewPage).  This maintains test files clean, readable, and focused on the user experience.

- A custom loggedInPage fixture is used to handle test state and minimize redundant login procedures.  This encourages code reuse and ensures a tidy test body..

- Utility/Helper Functions: Reusable logic, such as data generators, is placed in a separate utils directory to keep our core test and page object files focused.

- Data-Test Selectors: All key element selectors rely on the application's data-test attributes.  This makes the tests more resistant to changes to the user interface.

# Project Structure
The project is broken down into the following directories to maintain a clear separation of objectives.

    src/: Contains all of the test-related code.

    pages/: A directory containing all Page Object Model classes.

    utils/: A directory with reusable assistance and utility routines.

    tests/: A directory containing all.spec.ts test files.

# Setup Instructions
To get this project up and running, follow these simple steps.

# Prerequisites
Node.js (version 18 or higher recommended)

    npm (or yarn)

1. Clone the Repository (or copy files)
    git clone https://github.com/your-username/saucedemo-playwright.git
    cd saucedemo-playwright

    Note: Because this is a sample project, simply copy the provided code files and arrange them in the appropriate directory structure.

2. Install Dependencies
Use npm to install all of the required packages.  This will also install the Playwright browser.
    npm install
    or, if you use yarn
    yarn install

# Using VS Code extension
1. Step 1: Create a new folder and open in VS Code
    - Go to Extensions section and install Playwright extension from Microsoft
    - Go to View tab and select "Command Palett.." to display "> Command Palette and type playwright >" then select select "install playwright"
    - Select the browsers and click ok
    - It will install the libraries and create the project folders


How to Run the Tests
You can run the entire test suite or specific tests from the command line.

Run All Tests
To run the full suite of E2E tests:

    npm test

Run Tests in UI Mode
To have an interactive experience with a test runner UI, use

    npx playwright test --ui

Run a Specific Test File
To execute a particular test file, such as the one in this project, use the following command:

    npx playwright test tests/Main.spec.ts

Run Headless or Headed
By default, tests run in headless mode (without the browser displayed).  To run tests in headed mode (with the browser displayed), use the --headed parameter.
    
    npx playwright test tests/Main.spec.ts --headed

Run debug
Tests are executed in debug mode with end-to-end control by the user.  To run tests in debug mode (with the browser displayed), use the --debug flag.

    npx playwright test tests/Main.spec.ts --debug

If you have any queries or want to contribute, please see the project's code and documentation.


# Architecture Screen
![Screenshot](https://github.com/ijc3093/Playwright_E2E_Test_SauceDemo/blob/master/Blank%20Diagram.png)
Here is an architectural explanation of how to automate testing for SauceDemo Swag Labs with Playwright, a browser, TypeScript, and Node.js:

# Core components and their interactions
The architecture is based on the interaction of these components:
- TypeScript: A superset of JavaScript that provides static typing to improve code maintainability and debugging.
- CLI (Command Line Interface): Used to run Playwright tests and maybe configure test runs (e.g., certain browsers, parallelism).
- Playwright: An open-source testing platform that allows for accurate cross-browser end-to-end testing.
- Browser: The web browser (Chromium, Firefox, Safari, etc.) in which the tests are executed.
- Node.js: The JavaScript runtime environment that runs between Playwright and TypeScript code using Visual Studio Code.

# How these components interact as follows:
1. Creating Test Scripts (TypeScript/Node.js): 
    - Use TypeScript for stronger typing and greater tooling support.
    - These scripts define the actions that will be done on the SauceDemo application (for example, login, sorting the price, asce and desc, add items to cart, and checkout) as well as the expected results.

2. Playwright and Browser Launch: 
    - Node.js environment launch Playwright, which then launches preferring browser.
    - To provide effective interaction and control, Playwright interfaces with the browser via the Chrome DevTools Protocol (CDP) and WebSockets.

3. Test Execution (Browser Automation): 
    - Playwright automates interactions with SauceDemo by running TypeScript commands in the browser, such as clicking buttons and filling forms.
    - It relies on built-in locators and auto-wait methods to verify that elements are ready before performing operations, resulting in more robust tests.
