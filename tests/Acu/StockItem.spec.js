import { test, expect } from '@playwright/test';

const USERNAME = 'eSquaredDev';
const PASSWORD = 'eSquared1!';
const BASE_URL = 'https://acumaticadev.e2cc.com/ESquaredNPL/(W(20))/Main?ScreenId=IN202500';

test.setTimeout(120000);

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

async function updateStockItem(frame, itemCode = 'TESTITEM', lastCost = '100') {
  // Open inventory selector
  await frame.locator('#ctl00_phF_form_edInventoryCD > .controlCont > .buttonsCont > .sprite-icon > .control-icon-img').click();
  // Fill inventory code
  await frame.locator('#ctl00_phF_form_edInventoryCD_pnl_tlb_fb_text').fill(itemCode);
  // Select the item
  await frame.getByText('Select', { exact: true }).click();
  // Go to Price/Cost tab
  await frame.getByRole('cell', { name: 'Price/Cost', exact: true }).click();
  // Click and update Last Cost
  const lastCostInput = frame.locator('#ctl00_phG_tab_t2_formCostStats_edLastCost');
  await lastCostInput.click();
  await lastCostInput.fill(lastCost);
  // Save changes
  await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
}

test('Update Stock Item Last Cost', async ({ page }) => {
  // Log in to the application
  await login(page);

  // Wait for the main iframe to load
  const iframeLocator = page.locator('iframe[name="main"]');
  await iframeLocator.waitFor();
  const frame = await iframeLocator.contentFrame();

  // Update stock item last cost
  await updateStockItem(frame);
});
