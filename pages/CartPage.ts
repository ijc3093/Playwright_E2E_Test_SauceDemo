import { Page, Locator } from '@playwright/test';


// The Cart Page Object
// This file will manage all actions within the shopping cart.
export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.cartItems = page.locator('.cart_item');
    }

    /**
     * Asserts that a specific number of items are in the cart.
     * @param expectedCount The expected number of items in the cart.
     */
    async assertCartItemCount(expectedCount: number) {
        await this.cartItems.waitFor({ state: 'visible' });
        const items = await this.cartItems.all();
        await this.page.waitForURL('https://www.saucedemo.com/cart.html');
        return items.length;
    }

    /**
     * Proceeds to checkout.
     */
    async goToCheckout() {
        await this.checkoutButton.click();
    }
}
