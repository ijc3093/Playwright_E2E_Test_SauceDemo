# Playwright E2E Test SauceDemo
This project includes a thorough end-to-end (E2E) test suite for the SauceDemo application, which was developed with TypeScript and Playwright. To guarantee a scalable, maintainable, and supportive architecture, the test suite is created using fixtures, utility functions, and the Page Object Model (POM) design pattern. This post shows how to create an automated test for "www.SauceDemo.cow" using Playwright's built-in test runner, @playwright/test, and Node.js. Also, this purpose is to ensure that the application's functions are verified when testing it.

# Technical & Structural Requirements
This test suite was developed using the "Five-Year" philosophy, which emphasizes long-term code quality and collaboration.

    - The Page Object Model (POM) abstracts all selectors and page-specific interactions into dedicated page classes (e.g., LoginPage.ts, ProductsPage.ts, CartPage.ts, CheckoutPage.ts and CheckoutOveriewPage).  This maintains test files clean, readable, and focused on the user experience.

    - A custom loggedInPage fixture is used to handle test state and minimize redundant login procedures. This encourages code reuse and ensures a tidy test body.

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
    git clone https://github.com/ijc3093/Playwright_E2E_Test_SauceDemo.git
    cd saucedemo-playwright

    Note: Because this is a sample project, simply copy the provided code files and arrange them in the appropriate directory structure.

2. Install Dependencies
Use npm to install all of the required packages. This will also install the Playwright browser.
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
![Screenshot](https://github.com/ijc3093/Playwright_E2E_Test_SauceDemo/blob/master/Blank%20Diagram.svg)
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


The test suite's long-term health was considered when the project's architecture and strategic decisions were decided.  The goal was to develop a framework that would be simple to read, maintain, and scale for years.

# Project Architecture
The project is built on three core pillars:
    
    - The Page Object Model (POM): It serves as the foundation for the test suite. Instead of clogging up tests with web selectors, all element locations and interactions for a certain page (such as the Login or Products page) are concentrated in their own classes. 

    - Playwright Fixtures are used for developing a specified state prior to running a test. For example, the loggedInPage fixture takes care of the login procedure automatically.

    - Utility/Helper Functions: Reusable logic that is not specific to a page, such as developing a random zip code for a checkout form, is stored in a separate utils directory.  This keeps Page Objects lean and focused on their primary function: interacting with UI elements.

# Strategic Decisions
Aside from the fundamental design, some important decisions were made to handle sophisticated scenarios and ensure the test suite is robust:
    
    - Handling the Performance Glitch User: Rather of utilizing a static waitForTimeout() function, which can make testing slow and unreliable, we use Playwright's built-in auto-waiting feature.  Playwright intelligently waits for items to become visible and actionable before taking an action, automatically mitigating performance lag without relying on fragile, hardcoded delays.

    - Verifying Broken Images: For the problem_user, simply testing if an image is viewable is insufficient, as a broken picture may still be displayed. The test's assertion takes a step further, directly verifying the image element's src attribute to ensure it points to the known broken image URL (/static/media/sl-404.168b1cce.jpg).

    - Validating Product Sorting: The product sorting test employs a strong two-step technique. First, it starts the sorting process on the page. Then it retrieves the list of prices, makes a copy of it, organizes it in memory, and compares the two lists. This method provides a high level of assurance that the objects are correctly sorted, as opposed to simply testing if the UI looks right.

So, these architectural and strategic decisions were made to ensure that the test suite is not only functional, but also of high quality and long-term value to any team.

