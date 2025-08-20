import { Page, Locator } from '@playwright/test';

// The Products Page Object
// This file will handle all interactions on the inventory page, such as adding items to the cart and sorting.
export class ProductsPage {
    readonly page: Page;
    readonly productsTitle: Locator;
    readonly sortDropdown: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsTitle = page.locator('.title');
        this.sortDropdown = page.locator('.product_sort_container');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    /**
     * Asserts that the user is on the products page.
     */
    async assertOnProductsPage() {
        await this.productsTitle.waitFor({ state: 'visible' });
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
    }

    /**
     * Adds an item to the cart by its index.
     * @param index The index of the item to add, starting from 0.
     */
    async addItemToCartByIndex(index: number) {
        await this.page.getByRole('button', { name: 'Add to cart' }).nth(index).click();
    }

    /**
     * Gets the price of all items on the page.
     * @returns A Promise that resolves to an array of item prices as numbers.
     */
    async getItemPrices() {
        const prices = await this.page.locator('.inventory_item_price').allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    /**
     * Selects a sorting option from the dropdown.
     * @param option The value of the sorting option to select.
     */

    
    async sortItems(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option);
    }

    /**
     * Navigates to the shopping cart.
     */
    async goToCart() {
        await this.cartLink.click();
    }
}
