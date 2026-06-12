import { test, expect } from '@playwright/test';
import { SAUCEDEMO_URL, SAUCEDEMO_USERNAME, SAUCEDEMO_PASSWORD } from '../pages/login.js';
import { SAUCEDEMO_ITEMS } from '../pages/menu-page.js';

test.beforeEach(async ({ page }) => {
  await page.goto(SAUCEDEMO_URL);
  await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME);
  await page.fill('#password', process.env.SAUCEDEMO_PASSWORD);
  await page.click('#login-button');
});

test('Checkout', async ({ page }) => {
  for (const itemName of SAUCEDEMO_ITEMS) {
    const item = page.locator(`.inventory_item:has-text("${itemName}")`);
    await expect(item).toBeVisible();
    await item.locator('.btn_inventory').click();
  }

  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(`${SAUCEDEMO_URL}cart.html`);
  await expect(page.locator('.cart_list')).toBeVisible();
  await expect(page.locator('.cart_item')).toHaveCount(SAUCEDEMO_ITEMS.length);
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(SAUCEDEMO_ITEMS);

  await page.click('.checkout_button');
  await expect(page).toHaveURL(`${SAUCEDEMO_URL}checkout-step-one.html`);
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  await expect(page).toHaveURL(`${SAUCEDEMO_URL}checkout-step-two.html`);
  await expect(page.locator('.summary_info')).toBeVisible();
  await expect(page.locator('.summary_subtotal_label')).toBeVisible();
  await expect(page.locator('.summary_total_label')).toBeVisible();
  await expect(page.locator('.summary_tax_label')).toBeVisible();

  await page.click('.btn_action.cart_button');

  await expect(page).toHaveURL(`${SAUCEDEMO_URL}checkout-complete.html`);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  await page.getByLabel('Back Home').click();
  await expect(page).toHaveURL(`${SAUCEDEMO_URL}inventory.html`);
});
