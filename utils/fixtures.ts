// utils/fixtures.ts
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from './data';

// Define the shape of our custom fixtures
interface MyFixtures {
  loggedInPage: Page;
}

/**
 * The base test is extended to include a custom fixture for a logged-in page.
 * This prevents repeated login steps across numerous tests.
 */
export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.assertLoginSuccessful();
    await use(page); // Use the page in the logged-in state
  },
});