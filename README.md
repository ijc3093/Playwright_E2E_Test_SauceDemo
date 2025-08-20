# Playwright E2E Test SauceDemo
This project includes a thorough end-to-end (E2E) test suite for the SauceDemo application, which was developed with TypeScript and Playwright. To guarantee a scalable, maintainable, and supportive architecture, the test suite is created using fixtures, utility functions, and the Page Object Model (POM) design pattern. This post shows how to create an automated test for "www.SauceDemo.cow" using Playwright's built-in test runner, @playwright/test, and Node.js. Also, this purpose is to ensure that the application's functions are verified when testing it.


# Technical & Structural Requirements
This test suite was developed following the "Five-Year" Philosophy, emphasizing long-term code quality and collaboration.

- Page Object Model (POM): All selectors and page-specific interactions are abstracted into dedicated page classes (LoginPage.ts, ProductsPage.ts, etc.). This keeps the test files clean, readable, and focused on the user journey.

- Playwright Fixtures: A custom loggedInPage fixture is used to manage test state and avoid repetitive login steps. This promotes code reuse and a clean test body.

- Utility/Helper Functions: Reusable logic, such as data generators, is isolated in a separate utils directory, ensuring that our core test and page object files remain focused.

- Data-Test Selectors: All key element selectors use the data-test attributes provided by the application. This makes the tests resilient to UI changes.

# Project Structure
The project is organized into the following directories to maintain a clear separation of concerns:

    src/: Contains all the test-related code.

    pages/: A directory for all Page Object Model classes.

    utils/: A directory for reusable helper and utility functions.

    tests/: A directory for all .spec.ts test files.

# Setup Instructions
To get this project up and running, follow these simple steps.

# Prerequisites
Node.js (version 18 or higher recommended)

    npm (or yarn)

1. Clone the Repository (or copy files)
    git clone https://github.com/your-username/saucedemo-playwright.git
    cd saucedemo-playwright

    Note: Since this is a sample project, you can simply copy the provided code files and place them in the correct directory structure.

2. Install Dependencies
Use npm to install all the necessary packages. This will also install the Playwright browsers.
    npm install
    or, if you use yarn
    yarn install

How to Run the Tests
You can run the entire test suite or specific tests from the command line.

Run All Tests
To run the full suite of E2E tests:

    npm test

Run Tests in UI Mode
For an interactive experience with a test runner UI, use:

    npx playwright test --ui

Run a Specific Test File
To run a specific test file, such as the one in this project, use the following command:

    npx playwright test tests/SauceDemo.spec.ts

Run Headless or Headed
Tests run in headless mode by default (the browser is not visible). To run tests in headed mode (with the browser visible), use the --headed flag:

    npm test -- --headed

If you have any questions or would like to contribute, please refer to the project's code and documentation.
