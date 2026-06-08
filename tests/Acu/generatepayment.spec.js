import { test } from '@playwright/test';

const BASE_URL = 'https://esquared-sandbox-25-2.acumatica.com/(W(13))/Main?ScreenId=SO301000&OrderType=SO&OrderNbr=053130';


test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ACU_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ACU_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
});

test('Generate Payment', async ({ page }) => {
 const frame = page.locator('iframe[name="main"]').contentFrame();
 await frame.locator('#ctl00_phDS_ds_ToolBar_MenuOpener').click();
 await frame.getByText('Generate Payment Link', { exact: true }).click();
 await frame.getByRole('button', { name: 'Yes' }).click();
});

test('View Payment', async ({ page }) => {
 const frame = page.locator('iframe[name="main"]').contentFrame();
 await frame.locator('#ctl00_phDS_ds_ToolBar_MenuOpener').click();
 await frame.getByText('View Payment Link', { exact: true }).click();
 await frame.getByText('Print Sales Order', { exact: true }).click();
});