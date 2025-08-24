<!-- README.md -->
### Sauce Labs Playwright Test Suite

This project is a full Playwright test suite for the Sauce Labs sample e-commerce website.  It is built on a long-term, maintainable architecture that employs best practices such as the Page Object Model (POM), custom fixtures, and utility functions.

### Project Setup 
Step-by-step about how to install Using the init command
    Node.js: Ensure you have Node.js installed.
    A code editor: Visual Studio Code is recommended.
    
    Step 1: Set up the project using CLI
    Open the terminal, create a new directory, then execute the Playwright initialization command. This command defines a basic project structure and generates a playwright.config.js file.

    mkdir sauce_demo_playwright_typescript
    cd sauce_demo_playwright_typescript
    npm init -y

    Step 2: Install Playwright
    npm init playwright@latest


### Setup Instructions

1.  **Clone the repository:**
    `git clone <repository-url>`

2.  **Navigate to the project directory:**
    `cd Playwright_E2E_Test_SauceDemo`

3.  **Install dependencies:**
    `npm install`

4.  **Run the tests:**
    - To run all tests: `npx playwright test`
    - To run tests in headed mode: `npx playwright test --headed`

### Choose the default options:
- Use TypeScript or JavaScript? TypeScript
- Where to put your end-to-end tests? tests
- Add a GitHub Actions workflow? Yes if you want
- Install Playwright browsers? Yes
- This will install @playwright/test and the necessary browser binaries

### Using VS Code extension
1. Step 1: Create a new folder and open in VS Code
    - Go to Extensions section and install Playwright extension from Microsoft
    - Go to View tab and select "Command Palett.." to display "> Command Palette and type playwright >" then select select "install playwright"
    - Select the browsers and click ok
    - It will install the libraries and create the project folders
    
2. Step 2: Write the test script
    - Inside the tests directory, you will see a file called example.spec.ts.  You can either edit this file or create a new one, such as login.spec.ts.
    - Add the code below to your test file. The Playwright Test runner provides the test and expect functions used in this script.
    - Login-test.ts in the test directory differs from example.spec.js and login.spec.js because to the specification that it be run only with npx playwright test. Node may run login-test.ts without the term "spec"
    - For example: npx playwright test login.spec.ts while node login-test.ts.
    
    
    ### Inside that directory, you can run several commands:
        cd tests 
        npx playwright test
            Except result: Runs the end-to-end tests...
            
        npx playwright test --ui
            Starts the interactive UI mode.

        npx playwright test --project=chromium
            Runs the tests only on Desktop Chrome.

        npx playwright test example
            Runs the tests in a specific file.

        npx playwright test --debug
            Runs the tests in debug mode.

        npx playwright codegen
            Auto generate tests with Codegen.

        We suggest that you begin by typing:

        npx playwright test

cd tests
    npx playwright test
    npx playwright test --workers 3
    npx playwright test --handed 
    npx playwright test --debug  

Go to View > Command Palette and type playwright > select install playwright,
   type playwright and select "Testing: Focus on Playwright View"
   This is for running the proejct


### Project Architecture
The project is designed to be scalable and easy to manage, following a "Five-Year Philosophy."

-   **tests/**: This directory contains all of the test files (*.spec.ts).  Each file focuses on a certain feature or user journey.  The tests themselves are clean and readable since they only include high-level steps and assertions, abstracting all implementation specifics.
-   **pages/**: This is where the **Page Object Model (POM)** comes into play.  Each file in this directory represents a different web page or significant component (e.g., `LoginPage.ts`, `InventoryPage.ts`).  POM classes encapsulate selectors and interaction methods for their individual pages, centralizing UI logic and making tests more resistant to front-end changes.
-   **utils/**: This category contains reusable utility methods and data that are not limited to a single page.
    -   `data.ts`: This file contains constant data such as user credentials, allowing the tests to be data-driven and easily updated.
    -   `priceCalculator.ts` is a helpful function for performing difficult calculations while keeping the test logic clean.
-   **fixtures/**: This category provides custom Playwright fixtures.  The usage of fixtures (e.g., `loggedInPage`) helps us to easily manage test state and prevent duplicate setup code (such as logging in) across several tests, encouraging the DRY (Don't Repeat Yourself) concept.

### Strategic Decisions

### Advanced Scenario 1: Handling Problematic UI (`problem_user`)

The `problem_user` has incorrect product pictures.  The best long-term answer to this problem is **Visual Regression Testing**.  Tools like Playwright's built-in `toMatchSnapshot` or third-party solutions are ideal for this because they compare a screenshot of the user interface to a baseline image and fail if there are any visual differences.

As requested, a functional check was included for this assignment.  The test logs in as the `problem_user`, examines the image sources (`src`), and concludes that they are not the expected, right images.  Specifically, the test determines whether the`src` property of the first product picture is a generic placeholder or differs from the typical user's image`src`, finding the problem without the usage of a visual tool.

### Advanced Scenario 2: Handling Performance Issues (`performance_glitch_user`)

The `performance_glitch_user` causes severe slowness.  The strategy is to use Playwright's built-in **auto-waiting mechanism** and **smart assertions**.  Playwright waits for items to be visible, enabled, and stable before executing an action (e.g., a `click`).  Similarly, assertions such as `expect(locator).toBeVisible()` or `expect(locator).toContainText()` will retry for a defined delay duration until the condition is met.

This method eliminates the need for brittle, hardcoded `page.waitForTimeout(milliseconds)` calls, which are a common source of flakiness in automated tests.  The test for this user is written in the same manner as any other test, and Playwright's inherent resilience elegantly handles the performance lag, providing dependability and stability.


Here is an architectural explanation of how to automate testing for SauceDemo Swag Labs with Playwright, a browser, TypeScript, and Node.js:

### Core components and their interactions
The architecture is based on the interaction of these components:
- TypeScript: A superset of JavaScript that provides static typing to improve code maintainability and debugging.
- CLI (Command Line Interface): Used to run Playwright tests and maybe configure test runs (e.g., certain browsers, parallelism).
- Playwright: An open-source testing platform that allows for accurate cross-browser end-to-end testing.
- Browser: The web browser (Chromium, Firefox, Safari, etc.) in which the tests are executed.
- Node.js: The JavaScript runtime environment that runs between Playwright and TypeScript code using Visual Studio Code.

### How these components interact as follows:
1. Creating Test Scripts (TypeScript/Node.js): 
    - Use TypeScript for stronger typing and greater tooling support.
    - These scripts define the actions that will be done on the SauceDemo application (for example, login, sorting the price, asce and desc, add items to cart, and checkout) as well as the expected results.

2. Playwright and Browser Launch: 
    - Node.js environment launch Playwright, which then launches preferring browser.
    - To provide effective interaction and control, Playwright interfaces with the browser via the Chrome DevTools Protocol (CDP) and WebSockets.

3. Test Execution (Browser Automation): 
    - Playwright automates interactions with SauceDemo by running TypeScript commands in the browser, such as clicking buttons and filling forms.
    - It relies on built-in locators and auto-wait methods to verify that elements are ready before performing operations, resulting in more robust tests.

4. Assertions and Validation: 
    - Use Playwright's assertions, such as expect(page), to validate actions. toHaveText(...)) to ensure that the program behaves properly and that the UI is correct.
    - These assertions will automatically retry until the desired condition is met or a timeout occurs, decreasing flakiness in testing.


### Testing Product Images are wrong for the problem_user
1. Visual regression testing

    - Visual regression testing is the most robust and reliable testing approach for a SauceDemo user like the "problem_user" who purposely breaks product graphics.

    - How it Works: The test suite would start by running for a known "good" user (such as standard_user) and saving a snapshot of the product page. This screenshot becomes the baseline.

    - Detection: When the same test is repeated for the problem_user, the visual regression tool will generate a fresh screenshot. The comparison would fail immediately because the broken image would be visually distinct from the baseline, indicating the issue.

    - Why it is ideal: This method improves a simple functional check since it analyzes the actual visual result displayed to the user, rather than simply the underlying code or a specific URL.  It can detect subtle errors such as layout modifications, stylistic difficulties, or unexpected image changes that might otherwise go undetected (img.src). ToContain('broken_url') may miss.

### Architecture Screen
![Screenshot](https://github.com/ijc3093/Playwright_E2E_Test_SauceDemo/blob/master/Blank%20Diagram.svg)

```typescript
// pages/LoginPage.ts
import { Page, expect, Locator } from '@playwright/test';

/**
 * Represents the login page.
 * Implements the Page Object Model pattern.
 */


