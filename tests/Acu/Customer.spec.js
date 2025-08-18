const { test, expect } = require('@playwright/test');


test('Create Customer', async ({ page }) => {
  // Go to login page and sign in
  await page.goto('https://acumaticadev.e2cc.com/ESquaredNPL/(W(10))/Main?ScreenId=AR303000');
  await page.getByRole('textbox', { name: 'Username' }).fill('eSquaredDev');
  await page.getByRole('textbox', { name: 'Password' }).fill('eSquared1!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for the iframe to be available and get its frame
  const iframeLocator = page.locator('iframe[name="main"]');
  await iframeLocator.waitFor();
  const frame = await iframeLocator.contentFrame();

  // Fill customer details
  await frame.getByRole('textbox', { name: 'Account Name:' }).fill('Test Customer');
  await frame.getByRole('textbox', { name: 'Address Line 1:' }).fill('123 Test St');
  await frame.getByRole('textbox', { name: 'City:' }).fill('Arizona');
  await frame.getByRole('textbox', { name: 'State:' }).fill('AZ');
  await frame.getByRole('textbox', { name: 'Postal Code:' }).fill('85001');
  await frame.getByRole('textbox', { name: 'Account Email:' }).fill('jbaron32@e2cc.com');
  await frame.getByRole('textbox', { name: 'Business 1:' }).fill('123-456-7890');

  // Save the customer
  await frame.getByRole('button', { name: 'Save' }).click();
});