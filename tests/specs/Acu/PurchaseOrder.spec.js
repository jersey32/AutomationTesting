import { test } from '@playwright/test';
import { FORM_DATA } from '../../pages/menu-page';
import { TABS } from '../../pages/menu-page';

const BASE_URL = 'https://acumaticadev.e2cc.com/ESquaredNPL/(W(8))/Main?ScreenId=PO301000';


async function login(page) {
  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ACU_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ACU_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

async function fillOrderHeader(frame) {
  await frame.getByRole('cell', { name: 'Details', exact: true }).click();
  await frame.getByRole('textbox', { name: 'Vendor:' }).fill(FORM_DATA.vendor);
  await frame.getByRole('textbox', { name: 'Vendor:' }).press('Enter');
}

async function addItems(frame) {
  await frame.locator('#ctl00_phG_tab_t0_grid_at_tlb_ul').getByText('Add Items').click();
  await frame.getByRole('textbox', { name: 'Warehouse:' }).fill(FORM_DATA.warehouse);
  await frame.getByRole('textbox', { name: 'Warehouse:' }).press('Enter');
  await frame.locator('#ctl00_phG_PanelAddSiteStatus_gripSiteStatus_colHS_0_0 div').nth(1).click();
  await frame.locator('#ctl00_phG_PanelAddSiteStatus_PXButton7').click();
}

async function saveForm(frame) {
  await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
}


async function addTrackingNumber(frame) {
  const trackingNumbersTab = 'ctl00_phG_tab_t3_cstGridAISTrackingNumbers';
  const addButton = `${trackingNumbersTab}_at_tlb_ul > li:nth-child(2) .sprite-icon .main-icon-img`;
  const inputField = `${trackingNumbersTab}_ei`;

  await frame.getByRole('cell', { name: 'Tracking Numbers', exact: true }).click();
  await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_scrollDiv').click();

  const editCells = frame.locator('.edit > td');
  await editCells.nth(2).click();
  await frame.locator(`#${inputField}`).fill(FORM_DATA.trackingNumber);

  await editCells.nth(9).click();
  await frame.locator(`#${inputField}`).fill(FORM_DATA.trackingQuantity);
}

test('Purchase Order', async ({ page }) => {
  await login(page);

  const frame = page.locator('iframe[name="main"]').contentFrame();

  await fillOrderHeader(frame);
  await addItems(frame);
  await saveForm(frame);
  await addTrackingNumber(frame);
  await saveForm(frame);
});
