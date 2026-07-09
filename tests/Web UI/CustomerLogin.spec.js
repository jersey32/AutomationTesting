import { test, expect } from '@playwright/test';
import { LoginPage, SAUCEDEMO_URL } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

let loginPage;
let inventoryPage;

test.describe('Authenticated', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.loginSauceDemo(process.env.SAUCEDEMO_USERNAME, process.env.SAUCEDEMO_PASSWORD);
  });

  test('Customer Login', async () => {
    const inventoryListVisible = await inventoryPage.isInventoryListVisible();
    const cartVisible = await inventoryPage.isShoppingCartVisible();
    const twitterVisible = await inventoryPage.isTwitterIconVisible();
    const facebookVisible = await inventoryPage.isFacebookIconVisible();
    const linkedinVisible = await inventoryPage.isLinkedinIconVisible();

    expect(inventoryListVisible).toBeTruthy();
    expect(await inventoryPage.getTitleText()).toContain('Products');
    expect(cartVisible).toBeTruthy();
    expect(twitterVisible).toBeTruthy();
    expect(facebookVisible).toBeTruthy();
    expect(linkedinVisible).toBeTruthy();
  });

  test('Customer Logout', async ({ page }) => {
    await inventoryPage.openMenu();
    await inventoryPage.logout();
    expect(page.url()).toBe(SAUCEDEMO_URL);
    const logoVisible = await inventoryPage.isLoginLogoVisible();
    expect(logoVisible).toBeTruthy();
  });
});

test('Customer Login with incorrect user/pass', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto(SAUCEDEMO_URL);
  await loginPage.fill('#user-name', 'standard_user');
  await loginPage.fill('#password', 'secret_sauces');
  await loginPage.click('#login-button');
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
});
