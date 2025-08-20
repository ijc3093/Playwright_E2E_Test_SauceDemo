
/**
 * Playwright Fixtures: Demonstrate your expertise by using fixtures to manage test states and dependencies. For example, create a fixture that provides a "logged-in page" to your tests, avoiding repetitive login steps in your test bodies.
*/

import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// We extend the base test object with a new fixture.
// This fixture, 'loggedInPage', will handle the login process.
const test = base.extend<{ loggedInPage: Page }>({
    loggedInPage: async ({ page }: any, use: (arg0: any) => any) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        // Once logged in, we "use" the page, which means we pass it to the test.
        // The test can now proceed with the logged-in state.
        await use(page);
    },
});

test.describe('SauceDemo E2E Test Suite - Fixture Refactored', () => {

    // This test now uses the loggedInPage fixture, which handles the login.
    // The test code is now focused on the post-login steps.
    test('should successfully add an item to the cart and proceed to checkout', async ({ loggedInPage }) => {
        const productsPage = new ProductsPage(loggedInPage);
        const cartPage = new CartPage(loggedInPage);
        const checkoutPage = new CheckoutPage(loggedInPage);

        // Add an item to the cart and navigate to the cart page.
        await productsPage.addItemToCartByIndex(0);
        await productsPage.goToCart();
        await expect(cartPage.cartItems).toHaveCount(1);

        // Navigate to the checkout page.
        await cartPage.goToCheckout();
        await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        // Use the CheckoutPage object to fill out the form.
        await checkoutPage.fillInfo('Jane', 'Doe', '67890');
        await checkoutPage.continueToOverview();

        // Assert that we have moved to the next page.
        await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(loggedInPage.locator('.title')).toHaveText('Checkout: Overview');
    });

    test('should show a locked out error for a locked_out_user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Perform the login with the locked out user credentials.
        await loginPage.navigate();
        await loginPage.login('locked_out_user', 'secret_sauce');

        // Assert that the error message is visible and contains the expected text.
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    // This test now uses the loggedInPage fixture and focuses on the sorting functionality.
    test('should sort products correctly by price', async ({ loggedInPage }) => {
        const productsPage = new ProductsPage(loggedInPage);

        // Use the ProductsPage object to perform actions.
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

});
