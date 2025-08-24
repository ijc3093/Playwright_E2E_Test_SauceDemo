// tests/advanced.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users, products } from '../utils/data';

test.describe('Advanced Scenarios', () => {

  test('should reliably detect incorrect images for problem_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    //  Login as the problem user
    await loginPage.goto();
    await loginPage.login(users.problem.username, users.problem.password);
    await inventoryPage.assertPageLoaded();

    // Obtain the first product image's source attribute.
    //const firstImageSrc = await inventoryPage.getFirstProductImageSrc();
    
    // The check for the problematic picture path is hardcoded.  This method.
    // is a functional check to ensure the problem is present.
    // The "ideal" solution would be to conduct visual regression testing.
    //expect(firstImageSrc).toBe('/static/media/sl-404.168b1cce.jpg');

    // Iterate through each image to check that it is broken.
    const allProductImages = page.locator('#inventory_item_img').all();
    for (const image of await allProductImages) {
        await expect(image).toHaveAttribute('src', '/static/media/sl-404.168b1cce.jpg');
    }
  });

  test('should successfully add an item to cart despite performance glitch', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login as the performance glitch user
    await loginPage.goto();
    await loginPage.login(users.performanceGlitch.username, users.performanceGlitch.password);
    await inventoryPage.assertPageLoaded();

    // Add a product to the cart.  The lag will be handled by Playwright's autowaits.
    await inventoryPage.addItemToCart(products.backpack);
    
    // The existence of this indicator indicates that the activity was successful.
    // Playwright will wait till the cart icon with the '1' appears.
    // Before the assertion fails, ensure that it can manage the performance lag.
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');
  });
  });