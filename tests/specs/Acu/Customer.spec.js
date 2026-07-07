import { test } from '@playwright/test';
import { CUSTOMER_DATA } from '../../pages/menu-page';
import { login, ACU_URL } from '../../pages/login';

async function logins(page) {
  await page.goto(`${ACU_URL}AR303000`);
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
  await logins(page);

  const iframeLocator = page.locator('iframe[name="main"]');
  await iframeLocator.waitFor();
  const frame = iframeLocator.contentFrame();

  await fillCustomerDetails(frame, CUSTOMER_DATA);
  await saveRecord(frame);
});
