import { test, expect } from '@playwright/test';
import exp from 'constants';

const BASE_URL = 'https://acumaticadev.e2cc.com/ESquaredNPL/(W(8))/Main?ScreenId=PO301000';

test('Purchase Order', async ({ page }) => {
  // Login
  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ACU_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ACU_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  const frame = page.locator('iframe[name="main"]').contentFrame();

  // Fill in order header
  await frame.getByRole('cell', { name: 'Details', exact: true }).click();
  await frame.getByRole('textbox', { name: 'Vendor:' }).fill('V10029');
  await frame.getByRole('textbox', { name: 'Vendor:' }).press('Enter');

  // Add items
  await frame.locator('#ctl00_phG_tab_t0_grid_at_tlb_ul').getByText('Add Items').click();
  await frame.getByRole('textbox', { name: 'Warehouse:' }).fill('eSquared');
  await frame.getByRole('textbox', { name: 'Warehouse:' }).press('Enter');
  await frame.locator('#ctl00_phG_PanelAddSiteStatus_gripSiteStatus_colHS_0_0 div').nth(1).click();
  await frame.getByRole('button', { name: 'Add & Close' }).click();

  // Save and review tabs
  await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
  await frame.getByRole('cell', { name: 'Taxes', exact: true }).click();
  await frame.getByRole('cell', { name: 'Shipping', exact: true }).click();
  await frame.getByRole('cell', { name: 'Tracking Numbers', exact: true }).click();
  await frame.getByRole('cell', { name: 'Vendor Info', exact: true }).click();
  await frame.getByRole('cell', { name: 'Discounts', exact: true }).click();
  await frame.locator('div:nth-child(39)').click();
  await frame.getByRole('cell', { name: 'Prepayments', exact: true }).click();

  // Add tracking number
  await frame.getByRole('cell', { name: 'Tracking Numbers', exact: true }).click();
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_at_tlb_ul > li:nth-child(2) > .toolsBtn > .toolBtnNormal > .sprite-icon > .main-icon-img').click();
  await frame.locator('.edit > td:nth-child(3)').click();
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_ei').fill('1234567890');
  await frame.locator('.edit > td:nth-child(10)').click();
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_ei').fill('123');
  await frame.locator('.edit > td:nth-child(11)').click();
  await frame.locator('[id="_ctl00_phG_tab_t3_cstGridAISTrackingNumbers_lv0_ed9_text"]').press('Enter');
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_ei').fill('https://Trackingurl.com');
  await frame.locator('.edit > td:nth-child(13)').click();
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_ei').fill('FedEx');
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_ei').press('Tab');
  await frame.locator('[id="_ctl00_phG_tab_t3_cstGridAISTrackingNumbers_lv0_ed12_text"]').press('Enter');
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_ei').fill('123');
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_ei').press('Tab');
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_ei').fill('400');

  // Save
  await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
});
