
/**
 * Selectors: You must use the data-test attributes provided on the site for all key element selectors. Deliverables
 */

import { Page, Locator } from '@playwright/test';

// The Login Page Object
// This file will contain all the locators and actions related to the login page.
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Using data-test attributes for resilience
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    /**
     * Navigates to the SauceDemo login page.
     */
    async navigate() {
        await this.page.goto('https://www.saucedemo.com');
    }

    /**
     * Performs a login with the given credentials.
     * @param username The username to use for login.
     * @param password The password to use for login.
     */
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
