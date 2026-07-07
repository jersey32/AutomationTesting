import { test } from '@playwright/test';
import { login, ACU_URL } from '../../pages/login';

test.beforeEach(async ({ page }) => {
  await page.goto(`${ACU_URL}SO301000&OrderType=SO&OrderNbr=057204`);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ACU_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ACU_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
});

test('Generate Payment', async ({ page }) => {
 const frame = page.locator('iframe[name="main"]').contentFrame();
 await frame.locator('#ctl00_phDS_ds_ToolBar_MenuOpener').click();
 await frame.getByText('Generate Payment Link', { exact: true }).click();
 await frame.locator('#ctl00_phG_EBizpnlOpenGenerateFilterDialogBox_EBizGeneratebtnOK').click();

});

test('View Payment', async ({ page }) => {
 const frame = page.locator('iframe[name="main"]').contentFrame();
 await frame.locator('#ctl00_phDS_ds_ToolBar_MenuOpener').click();
 await frame.getByText('View Payment Link', { exact: true }).click();
 
});

test('Print SO', async ({ page }) => {
 const frame = page.locator('iframe[name="main"]').contentFrame();
 await frame.locator('#ctl00_phDS_ds_ToolBar_MenuOpener').click();
 await frame.getByText('Print Sales Order', { exact: true }).click();
});