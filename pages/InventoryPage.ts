// pages/InventoryPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { sortOptions } from '../utils/data';

/**
 * This is the inventory (product) page.  
 * Implements the Page Object Model design pattern.
 */
export class InventoryPage {
  private readonly page: Page;
  private readonly productsContainer: Locator;
  private readonly sortDropdown: Locator;
  private readonly addToCartButton: Locator;
  private readonly cartIcon: Locator;
  private readonly inventoryItems: Locator;

  /**
   * Creates a Playwright Page object as the InventoryPage's initialization parameter.  
   * The Playwright Page element.
   */
  constructor(page: Page) {
    this.page = page;
    this.productsContainer = page.locator('[data-test="inventory-container"]');
    this.sortDropdown = page.locator('.product_sort_container');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  /**
   * Ensure that the products container is visible, indicating a successful login.
   */
  async assertPageLoaded() {
    await expect(this.productsContainer).toBeVisible();
  }

  /**
   * Sorts the products by a specified option. 
   * @param option  Sorting options include 'az', 'za', 'lohi', and 'hilo'.
   */
  async sortProducts(option: string) {
    await this.sortDropdown.selectOption({ value: sortOptions[option] });
  }

  /**
   * Clicks the "Add to Cart" button for a certain product.
   * @param Product Name  The name of the product to be added.
   */
  async addItemToCart(productName: string) {
    const item = this.page.locator(`[data-test="inventory-item"]:has-text("${productName}")`);
    const addToCartButton = item.locator('[data-test^="add-to-cart"]');
    await addToCartButton.click();
  }

  /**
   * Clicks the shopping cart icon to navigate to the cart page.
   */
  async clickShoppingCart() {
    await this.cartIcon.click();
  }

  /**
   * Gets a list of product prices from the page.
   * @Returns An array of product prices represented as numerical values.
   */
  async getProductPrices(): Promise<number[]> {
    const prices = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Gets the list of product names from the page.
   * @returns An array of product names as strings.
   */
  async getProductNames(): Promise<string[]> {
    const names = await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    return names;
  }
  
  /**
   * Gets the source attribute for the first product image.
   * @returns the src attribute for the first product image.
   */
  // async getFirstProductImageSrc(): Promise<string | null> {
  //   const firstImage = this.page.locator('#inventory_item_img').first();
  //   return firstImage.getAttribute('src');
  // }
}