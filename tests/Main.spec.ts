
/**
 * Technical & Structural Requirements: The "Five-Year" Philosophy Your code's architecture is a primary evaluation criterion. It must be structured for long-term maintainability, scalability, and collaboration.
 * Abstract all page logic and selectors into dedicated page classes. Your test files (*.spec.ts) should be clean, readable, and focused on test steps, not implementation details.
*/
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Make sure the path is correct
import { ProductsPage } from '../pages/ProductsPage'; // Import the ProductsPage class
import { CartPage } from '../pages/CartPage'; // Import the CartPage class
import { CheckoutPage } from '../pages/CheckoutPage'; // Import the CheckoutPage class


test.describe('Functionality Test', () => {

    test('should successfully log in as a standard user', async ({ page }) => {
        // 1. Create an instance of the LoginPage class.
        // This gives you access to all the methods and locators defined in that class.
        const loginPage = new LoginPage(page);

        // 2. Use the methods from the LoginPage object to perform actions.
        // This is much cleaner than writing "await page.goto(...)" and "await page.getByPlaceholder(...)" directly.
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // 3. Add assertions to verify the outcome of the action.
        // After logging in, we expect to be on the inventory page.
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');
    });


    test('should show a locked out error for a locked_out_user', async ({ page }) => {
        // Create a new instance for this test as well.
        const loginPage = new LoginPage(page);

        // Perform the login with the locked out user credentials.
        await loginPage.navigate();
        await loginPage.login('locked_out_user', 'secret_sauce');

        // Assert that the error message is visible and contains the expected text.
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });


    // New test case demonstrating the use of the ProductsPage object.
    test('should sort products correctly by price', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // First, log in as a standard user.
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // Now, use the ProductsPage object to perform actions.
        await productsPage.assertOnProductsPage();

        // Sort items by price (low to high).
        await productsPage.sortItems('lohi');
        const pricesAsc = await productsPage.getItemPrices();
        const sortedPricesAsc = [...pricesAsc].sort((a, b) => a - b);
        expect(pricesAsc).toEqual(sortedPricesAsc);

        // Sort items by price (high to low).
        await productsPage.sortItems('hilo');
        const pricesDesc = await productsPage.getItemPrices();
        const sortedPricesDesc = [...pricesDesc].sort((a, b) => b - a);
        expect(pricesDesc).toEqual(sortedPricesDesc);
    });


    // New test case demonstrating the use of the CheckoutPage object.
    test('should successfully proceed through the checkout process', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Login as a standard user.
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Add an item to the cart and navigate to the cart page.
        await productsPage.addItemToCartByIndex(0);
        await productsPage.goToCart();
        await cartPage.assertCartItemCount(1);

        // Navigate to the checkout page.
        await cartPage.goToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        // Use the CheckoutPage object to fill out the form.
        await checkoutPage.fillInfo('Henry', 'Ford', '75088');
        await checkoutPage.continueToOverview();

        // Assert that we have moved to the next page.
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(page.locator('.title')).toHaveText('Checkout: Overview');

        // 20. Ensure that checkout overview such as e.g., total price
        await expect(page.locator('.summary_info')).toContainText('Total: $'); 
        
        // 21. Complete the purchase 
        await page.click('#finish');
        
        // 22. Ensure that the "Thank You" page screen
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

});