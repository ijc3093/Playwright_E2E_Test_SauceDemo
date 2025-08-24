// tests/purchase.spec.ts
import { test } from '../utils/fixtures';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { products, userInfo } from '../utils/data';
import { calculateTotalPrice } from '../utils/priceCalculator';

test.describe('End-to-End Purchase Flow', () => {
  test('should complete a full purchase from login to checkout', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    const checkoutPage = new CheckoutPage(loggedInPage);

    // Add a product to the cart
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.clickShoppingCart();

    // Double check the product is in the cart and proceed to checkout
    await cartPage.assertProductInCart(products.backpack);
    await cartPage.clickCheckout();

    // Fill in user information and continue
    await checkoutPage.enterInformation(userInfo);

    // Get the item total and tax from the summary page
    const { itemTotal, tax } = await checkoutPage.getSummaryTotals();
    const expectedTotal = calculateTotalPrice(itemTotal, tax);
    
    // Get the final total from the page
    const finalTotalOnPage = await checkoutPage.getFinalTotal();
    
    // Ensure that the calculated total matches the total on the page
    test.expect(finalTotalOnPage).toEqual(expectedTotal);

    // Complete the purchase
    await checkoutPage.clickFinish();

    // Ensure the purchase is complete
    await checkoutPage.assertPurchaseComplete();
  });
});