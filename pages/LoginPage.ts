// pages/LoginPage.ts
import { Page, expect, Locator } from '@playwright/test';

/**
 * This displays the login page.  
 * Performs the Page Object Model design pattern.
 */
export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  /**
   * Creates a Playwright Page object as the LoginPage's initialization parameter. 
   * @param page The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page.
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  /**
   * Fills the username and password fields.
   * @param username The username to enter.
   * @param password The password to enter.
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Ensure that the current page is the inventory page by checking the URL.
   */
  async assertLoginSuccessful() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  /**
   * Ensure that a specific error message is visible.
   * @param expectedMessage The expected error message text.
   */
  async assertErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}