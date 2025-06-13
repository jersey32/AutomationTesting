const { test, expect } = require('@playwright/test');

const username = 'standard_user';
const Password = 'secret_sauce';

async function login(page, username, password) {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
}

test('Customer Login', async ({ page }) => {
    
    await login(page, username, Password);
    await expect(page.locator('.inventory_list')).toBeVisible(); 
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    await expect(page.locator('.social_twitter')).toBeVisible();
    await expect(page.locator('.social_facebook')).toBeVisible();
    await expect(page.locator('.social_linkedin')).toBeVisible();
});

test('Customer Logout', async ({ page }) => {
   await login(page, username, Password);
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('.login_logo')).toBeVisible();
});

test('Customer Login with incorrect user/pass', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauces');

    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});