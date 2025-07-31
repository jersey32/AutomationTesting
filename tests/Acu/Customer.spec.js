const { test, expect } = require('@playwright/test');

test('Create Customer', async ({ page }) => {
    await page.goto('https://acumaticadev.e2cc.com/ESquaredNPL/(W(10))/Main?ScreenId=AR303000');
    await page.getByRole('textbox', { name: 'Username' }).fill('eSquaredDev');
    await page.getByRole('textbox', { name: 'Password' }).fill('eSquared1!');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.locator('iframe[name="main"]').contentFrame().getByRole('textbox', { name: 'Account Name:' }).fill('Test Customer');
    await page.locator('iframe[name="main"]').contentFrame().getByRole('textbox', { name: 'Address Line 1:' }).fill('123 Test St');
    await page.locator('iframe[name="main"]').contentFrame().getByRole('textbox', { name: 'City:' }).fill('Arizona');
    await page.locator('iframe[name="main"]').contentFrame().getByRole('textbox', { name: 'State:' }).fill('AZ');
    await page.locator('iframe[name="main"]').contentFrame().getByRole('textbox', { name: 'Postal Code:' }).fill('85001');
    
    await page.locator('iframe[name="main"]').contentFrame().getByRole('textbox', { name: 'Account Email:' }).fill('jbaron32@e2cc.com');
    await page.locator('iframe[name="main"]').contentFrame().getByRole('button', { name: 'Save' }).click();
});