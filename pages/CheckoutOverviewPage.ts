import { Page, Locator } from '@playwright/test';

// The Checkout Overview Page Object
// This file handles the final confirmation and finishing of the purchase.
export class CheckoutOverviewPage {
    readonly page: Page;
    readonly finishButton: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.pageTitle = page.locator('.title');
    }

    /**
     * Asserts that the user is on the checkout overview page.
     */
    async assertOnOverviewPage() {
        await this.pageTitle.waitFor({ state: 'visible' });
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');
    }

    /**
     * Clicks the finish button to complete the purchase.
     */
    async finishPurchase() {
        await this.finishButton.click();
    }
}
