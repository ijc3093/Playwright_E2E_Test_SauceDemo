import { Page, Locator } from '@playwright/test';

// The Checkout Page Object
// This file will handle filling out the checkout information.
export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    /**
     * Fills out the checkout information form.
     * @param firstName The user's first name.
     * @param lastName The user's last name.
     * @param zipCode The user's postal code.
     */
    async fillInfo(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    /**
     * Clicks the continue button to proceed to the next step.
     */
    async continueToOverview() {
        await this.continueButton.click();
    }
}
