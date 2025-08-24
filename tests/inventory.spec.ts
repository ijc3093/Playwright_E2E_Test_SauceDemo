// tests/inventory.spec.ts
import { test } from '../utils/fixtures';
import { InventoryPage } from '../pages/InventoryPage';
import { products } from '../utils/data';

test.describe('Inventory and Sorting Scenarios', () => {

  test('should correctly sort products from Price (low to high)', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    
    // Sort products by price low to high
    await inventoryPage.sortProducts('lohi');
    
    // Get the product prices from the page
    const prices = await inventoryPage.getProductPrices();
    
    // Check if the prices are sorted in ascending order
    for (let i = 0; i < prices.length - 1; i++) {
      test.expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('should correctly sort products from Price (high to low)', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    
    // Sort products by price high to low
    await inventoryPage.sortProducts('hilo');
    
    // Get the product prices from the page
    const prices = await inventoryPage.getProductPrices();
    
    // Test to see if the prices are sorted in descending order
    for (let i = 0; i < prices.length - 1; i++) {
      test.expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });
});