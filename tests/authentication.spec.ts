// tests/authentication.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/data';

test.describe('Authentication Scenarios', () => {

  test('should allow a standard user to log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.assertLoginSuccessful();
  });

  test('should show a specific error message for a locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should show a generic error message for invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, 'wrong_password');
    await loginPage.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });
});