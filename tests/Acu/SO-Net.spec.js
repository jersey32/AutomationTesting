import { test, expect } from '@playwright/test';

const USERNAME = 'eSquaredDev';
const PASSWORD = 'eSquared1!';
const CUSTOMER_NUMBER = 'C17292';
const BASE_URL = 'https://acumaticadev.e2cc.com/ESquaredNPL/(W(10))/Main?ScreenId=SO301000';

test.setTimeout(120000);

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

async function fillCustomer(frame, customerNumber) {
  const customerBox = frame.getByRole('textbox', { name: 'Customer:' });
  await customerBox.click();
  await customerBox.fill(customerNumber);
  await customerBox.press('Enter');
}

async function fillDescription(frame, description) {
  const descBox = frame.getByRole('textbox', { name: 'Description:' });
  await descBox.click();
  await descBox.fill(description);
  await descBox.press('Enter');
}

async function addItem(frame) {
  await frame.locator('#ctl00_phG_tab_t0_grid_at_tlb_ul').getByText('Add Items').click();
  const itemLocator = frame.locator('#ctl00_phG_PanelAddSiteStatus_PanelAddSiteStatus_gripSiteStatus_colHS_0_0 div').nth(1);
  await itemLocator.waitFor({ state: 'visible' });
  await itemLocator.click();
  await frame.getByRole('button', { name: 'Add & Close' }).click();
}

async function interactWithGridCells(frame) {
  await frame.getByRole('cell', { name: 'Delay Codes', exact: true }).click();
  await frame.getByRole('cell', { name: 'Taxes', exact: true }).click();
  await frame.getByRole('cell', { name: 'Configuration', exact: true }).click();
}

async function createPayment(frame) {
  // This is a workaround for the icon character, which may not be stable
  await frame.getByRole('button', { name: '' }).click();
  await frame.locator('#ctl00_phG_tab_oi_menu_item_4').getByText('Payments').click();
  await frame.locator('#ctl00_phG_tab_t17_detgrid_at_tlb_ul').getByText('Create Payment').click();
  const paymentMethodBox = frame.getByRole('textbox', { name: 'Payment Method:' });
  await paymentMethodBox.click();
  await paymentMethodBox.fill('CHECK');
  await paymentMethodBox.press('Enter');
  await frame.getByRole('button', { name: 'OK' }).click();
}

async function createshipment(frame) {
  await frame.locator('#ctl00_phDS_ds_ToolBar_CreateShipmentIssue').getByText('Create Shipment').click();
  await frame.locator('#ctl00_phG_pnlCreateShipment_formCreateShipment_edSiteID > .controlCont > .buttonsCont > .sprite-icon').click();
  await frame.locator('#ctl00_phG_pnlCreateShipment_formCreateShipment_edSiteID_pnl_tlb_ul').getByText('Select').click();
  await frame.getByRole('button', { name: 'OK' }).click();
}

async function fillShipmentDetails(frame) {
  await frame.getByRole('cell', { name: 'Packages', exact: true }).click();
  await frame.locator('li:nth-child(2) > .toolsBtn > .toolBtnNormal > .sprite-icon > .main-icon-img').first().click();
  await frame.locator('.edit > td:nth-child(5)').click();
  await frame.locator('[id="_ctl00_phG_tab_t4_gridPackages_lv0_edBoxID_text"]').fill('10-8-3');
  await frame.locator('[id="_ctl00_phG_tab_t4_gridPackages_lv0_edBoxID_text"]').press('Enter');
  await frame.locator('.edit > td:nth-child(13)').click();
  await frame.locator('[id="_ctl00_phG_tab_t4_gridPackages_lv0_edWeight"]').fill('0.5');
  await frame.locator('[id="_ctl00_phG_tab_t4_gridPackages_lv0_edWeight"]').press('Enter');
}

test('SO NetTerms flow', async ({ page }) => {
  // Log in to the application
  await login(page);

  // Wait for the main iframe to load and get its frame context
  const iframeLocator = page.locator('iframe[name="main"]');
  await iframeLocator.waitFor();
  const frame = await iframeLocator.contentFrame();

  // Fill out customer and order details
  await fillCustomer(frame, CUSTOMER_NUMBER);
  await fillDescription(frame, 'Test SO NET terms');
  await addItem(frame);
  await interactWithGridCells(frame);

  // Remove hold and progress order through workflow
  await frame.locator('#ctl00_phDS_ds_ToolBar_ReleaseFromHold').getByText('Remove Hold').click();
  await frame.getByText('Open', { exact: true }).click();

  // Closing the message box
  await frame.locator('qp-long-run div').nth(4).click();
  
  // Send order to POP, then to Staging, and interact with grid cells again
  await frame.locator('#ctl00_phDS_ds_ToolBar_sendToPOP').getByText('Send to POP').click();
  await frame.getByText('Order Processing').click();
  await frame.locator('#ctl00_phDS_ds_ToolBar_sendToStagingCst').getByText('Send to Staging').click();
  await interactWithGridCells(frame);

  // Create and fill shipment details, then confirm shipment
  await createshipment(frame);
  await fillShipmentDetails(frame);
  await frame.locator('#ctl00_phDS_ds_ToolBar_ConfirmShipmentAction').getByText('Confirm Shipment').click();
});
