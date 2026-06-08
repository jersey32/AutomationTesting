import { test } from '@playwright/test';

const BASE_URL = 'https://esquared-sandbox-25-2.acumatica.com/(W(15))/Main?ScreenId=AR303000';

const CUSTOMER_DATA = {
  accountName: 'Test Customer',
  addressLine1: '123 Test St',
  city: 'Arizona',
  state: 'AZ',
  postalCode: '85001',
  email: 'jbaron32@e2cc.com',
  phone: '09111111111',
};

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ACU_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ACU_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

async function fillCustomerDetails(frame, data) {
  await frame.getByRole('textbox', { name: 'Account Name:' }).fill(data.accountName);
  await frame.getByRole('textbox', { name: 'Address Line 1:' }).fill(data.addressLine1);
  await frame.getByRole('textbox', { name: 'City:' }).fill(data.city);
  await frame.getByRole('textbox', { name: 'State:' }).fill(data.state);
  await frame.getByRole('textbox', { name: 'Postal Code:' }).fill(data.postalCode);
  await frame.getByRole('textbox', { name: 'Account Email:' }).fill(data.email);
  await frame.locator('input[name="ctl00$phG$tab$t0$DefContact1$edDefContactPXMaskEdit1"]').fill(data.phone);
}

async function saveRecord(frame) {
  await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
}

test('Create Customer', async ({ page }) => {
  await login(page);

  const iframeLocator = page.locator('iframe[name="main"]');
  await iframeLocator.waitFor();
  const frame = iframeLocator.contentFrame();

  await fillCustomerDetails(frame, CUSTOMER_DATA);
  await saveRecord(frame);
});
