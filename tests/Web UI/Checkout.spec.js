import { test, expect } from '@playwright/test';
import { LoginPage, SAUCEDEMO_URL } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { SAUCEDEMO_ITEMS } from '../pages/menu-page.js';

let loginPage;
let inventoryPage;
let checkoutPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  checkoutPage = new CheckoutPage(page);
  await loginPage.loginSauceDemo(process.env.SAUCEDEMO_USERNAME, process.env.SAUCEDEMO_PASSWORD);
});

test('Checkout', async ({ page }) => {
  for (const itemName of SAUCEDEMO_ITEMS) {
    await inventoryPage.addItemToCart(itemName);
  }

  await inventoryPage.goToCart();
  expect(page.url()).toContain('cart.html');
  const cartListVisible = await inventoryPage.isCartListVisible();
  expect(cartListVisible).toBeTruthy();
  const itemCount = await inventoryPage.getCartItemCount();
  expect(itemCount).toBe(SAUCEDEMO_ITEMS.length);
  const cartItems = await inventoryPage.getCartItemNames();
  SAUCEDEMO_ITEMS.forEach(item => expect(cartItems.some(name => name.includes(item))).toBeTruthy());

  await checkoutPage.clickCheckoutButton();
  expect(checkoutPage.isCheckoutStepOneURL()).toBeTruthy();

  await checkoutPage.fillFirstName('John');
  await checkoutPage.fillLastName('Doe');
  await checkoutPage.fillPostalCode('12345');
  await checkoutPage.clickContinueButton();

  expect(checkoutPage.isCheckoutStepTwoURL()).toBeTruthy();
  const summaryVisible = await checkoutPage.isSummaryInfoVisible();
  const subtotalVisible = await checkoutPage.isSummarySubtotalVisible();
  const totalVisible = await checkoutPage.isSummaryTotalVisible();
  const taxVisible = await checkoutPage.isSummaryTaxVisible();

  expect(summaryVisible).toBeTruthy();
  expect(subtotalVisible).toBeTruthy();
  expect(totalVisible).toBeTruthy();
  expect(taxVisible).toBeTruthy();

  await checkoutPage.clickFinishButton();

  expect(checkoutPage.isCheckoutCompleteURL()).toBeTruthy();
  const headerText = await checkoutPage.getCompleteHeaderText();
  const completeText = await checkoutPage.getCompleteText();

  expect(headerText).toContain('Thank you for your order!');
  expect(completeText).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

  await checkoutPage.clickBackHome();
  expect(checkoutPage.isInventoryURL()).toBeTruthy();
});
