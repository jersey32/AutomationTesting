import { test, expect } from '@playwright/test';
import { SAUCEDEMO_URL } from '../pages/login.js';

test.describe('Authenticated', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SAUCEDEMO_URL);
    await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME);
    await page.fill('#password', process.env.SAUCEDEMO_PASSWORD);
    await page.click('#login-button');
  });

  test('Customer Login', async ({ page }) => {
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    await expect(page.locator('.social_twitter')).toBeVisible();
    await expect(page.locator('.social_facebook')).toBeVisible();
    await expect(page.locator('.social_linkedin')).toBeVisible();
  });

  test('Customer Logout', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL(SAUCEDEMO_URL);
    await expect(page.locator('.login_logo')).toBeVisible();
  });
});

test('Customer Login with incorrect user/pass', async ({ page }) => {
  await page.goto(SAUCEDEMO_URL);
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauces');
  await page.click('#login-button');
  await expect(page.locator('.error-message-container')).toBeVisible();
  await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});
