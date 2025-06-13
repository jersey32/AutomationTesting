const { test, expect } = require('@playwright/test');
const { PassThrough } = require('stream');


const items = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket'
];

const username = 'standard_user';
const Password = 'secret_sauce';

async function login(page, username, password) {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
}

test('Checkout', async ({ page }) => {
    await login(page, username, Password);
    await page.goto('https://www.saucedemo.com/inventory.html');

    for (const itemName of items) {
        const item = page.locator(`.inventory_item:has-text("${itemName}")`);
        await expect(item).toBeVisible();
        await item.locator('.btn_inventory').click();
    }

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.cart_list')).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(items.length);
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(items);
    await page.click('.checkout_button');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');   
    await page.fill('#postal-code', '12345');
    await page.click('#continue');

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.locator('.summary_subtotal_label')).toBeVisible();
    await expect(page.locator('.summary_total_label')).toBeVisible();
    await expect(page.locator('.summary_tax_label')).toBeVisible();
    
    await page.click('.btn_action.cart_button');
    
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await page.getByLabel('Back Home').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});