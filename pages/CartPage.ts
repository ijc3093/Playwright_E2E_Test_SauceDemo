// pages/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';

/**
 * Displays the shopping cart page.  
 * It implements the Page Object Model pattern.
 */
export class CartPage {
  private readonly page: Page;
  private readonly checkoutButton: Locator;

  /**
   * Build a Playwright Page object as the CartPage's initialization parameter.  
   * @param Page The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Clicks the checkout button.
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Confirms that a product is in the cart.
    * @param Product Name  To verify, provide the product's name.
   */
  async assertProductInCart(productName: string) {
    const item = this.page.locator(`[data-test="inventory-item"]:has-text("${productName}")`);
    await expect(item).toBeVisible();
  }
}