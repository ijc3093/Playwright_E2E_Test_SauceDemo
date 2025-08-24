// pages/CheckoutPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { UserInfo } from '../utils/data';

/**
 * Represents checkout pages (steps 1 and 2).  
 * Implements the Page Object Model design pattern.
 */
export class CheckoutPage {
  private readonly page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly completeMessage: Locator;

  /**
   * Initializes the CheckoutPage with a Playwright Page object.
   * @param page The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeMessage = page.locator('[data-test="complete-header"]');
  }

  /**
   * Fill in checkout information and proceed. 
   * @param userInfo  The user's information (first and last name, postal code).
   */
  async enterInformation(userInfo: UserInfo) {
    await this.firstNameInput.fill(userInfo.firstName);
    await this.lastNameInput.fill(userInfo.lastName);
    await this.postalCodeInput.fill(userInfo.postalCode);
    await this.continueButton.click();
  }

  /**
   * Obtains the item amount and tax from the checkout summary.
   * @Returns  An object containing the item total and tax as numbers.
   */
  async getSummaryTotals(): Promise<{ itemTotal: number; tax: number; }> {
    const itemTotalText = await this.page.locator('[data-test="subtotal-label"]').textContent();
    const taxText = await this.page.locator('[data-test="tax-label"]').textContent();
    
    const itemTotal = parseFloat(itemTotalText?.replace('Item total: $', '') || '0');
    const tax = parseFloat(taxText?.replace('Tax: $', '') || '0');

    return { itemTotal, tax };
  }
  
  /**
   * Obtains the final total from the checkout summary.
   * @Returns  The ultimate total expressed numerically.
   */
  async getFinalTotal(): Promise<number> {
    const totalText = await this.page.locator('[data-test="total-label"]').textContent();
    return parseFloat(totalText?.replace('Total: $', '') || '0');
  }

  /**
   * Clicks the finish button to complete the purchase.
   */
  async clickFinish() {
    await this.finishButton.click();
  }

  /**
   * Ensures that the purchase completion notification is visible.
   */
  async assertPurchaseComplete() {
    await expect(this.completeMessage).toBeVisible();
    await expect(this.completeMessage).toHaveText('Thank you for your order!');
  }
}