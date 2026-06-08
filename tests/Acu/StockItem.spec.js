import { test, expect } from '@playwright/test';

const BASE_URL = 'https://esquared-sandbox-25-2.acumatica.com/(W(13))/Main?ScreenId=IN202500';

test.setTimeout(120000);

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ACU_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ACU_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

async function updateStockItem(frame, itemCode = 'TESTITEM', lastCost = '100') {
  await frame.locator('#ctl00_phF_form_edInventoryCD > .controlCont > .buttonsCont > .sprite-icon > .control-icon-img').click();
  await frame.locator('#ctl00_phF_form_edInventoryCD_pnl_tlb_fb_text').fill(itemCode);
  await frame.getByText('Select', { exact: true }).click();
  await frame.getByRole('cell', { name: 'Price/Cost', exact: true }).click();
  const lastCostInput = frame.locator('#ctl00_phG_tab_t2_formCostStats_edLastCost');
  await lastCostInput.click();
  await lastCostInput.fill(lastCost);
  await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
}

test('Update Stock Item Last Cost', async ({ page }) => {
  await login(page);

  const iframeLocator = page.locator('iframe[name="main"]');
  await iframeLocator.waitFor();
  const frame = iframeLocator.contentFrame();

  await updateStockItem(frame);
});
