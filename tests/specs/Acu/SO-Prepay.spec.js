import { test, expect } from '@playwright/test';

const BASE_URL = 'https://esquared-sandbox-25-2.acumatica.com/(W(13))/Main?ScreenId=SO301000';

test('Sales Order Creation', async ({ page }) => {
  // Login
  await page.goto(BASE_URL);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ACU_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ACU_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  const frame = page.locator('iframe[name="main"]').contentFrame();

  // Fill in order header
  await frame.getByRole('textbox', { name: 'Customer:' }).fill('C10008');
  await frame.getByRole('textbox', { name: 'Customer:' }).press('Enter');
  await frame.getByRole('textbox', { name: 'Description:' }).fill('Test Description');
  await frame.getByRole('textbox', { name: 'Estimated Ship Date:' }).click();
  await frame.getByRole('textbox', { name: 'Estimated Ship Date:' }).fill('12/31/2026');
  await frame.getByRole('textbox', { name: 'Customer Order Nbr.:' }).fill('Test Order');
  await frame.getByRole('textbox', { name: 'External Reference:' }).fill('Test External Ref');

  // Select WMS from dropdown
  await frame.locator('#ctl00_phF_form_t0_CstPXDropDown8 > .editorCont > .editorWrap').click();
  await frame.getByText('WMS').click();

  // Add items
  await page.locator('iframe[name="main"]').contentFrame().locator('#ctl00_phG_tab_t0_grid_at_tlb_ul').getByText('Add Items').click();
  await frame.locator('#ctl00_phG_PanelAddSiteStatus_PanelAddSiteStatus_gripSiteStatus_colHS_0_0 div').nth(1).click();
  await frame.getByRole('button', { name: 'Add & Close' }).click();

  // Review tabs and remove hold
  await frame.getByRole('cell', { name: 'Delay Codes', exact: true }).click();
  await frame.getByRole('cell', { name: 'Configuration', exact: true }).click();
  await frame.getByRole('cell', { name: 'Taxes', exact: true }).click();
  await frame.getByRole('cell', { name: 'Asset Info', exact: true }).click();
  await frame.getByRole('cell', { name: 'Commissions', exact: true }).click();
  await frame.getByRole('cell', { name: 'Financial', exact: true }).click();
  await frame.locator('#ctl00_phDS_ds_ToolBar_ReleaseFromHold').getByText('Remove Hold').click();
  await frame.locator('qp-long-run div').nth(4).click();

  // Send to POP and staging
  await frame.locator('#ctl00_phDS_ds_ToolBar_sendToPOP').getByText('Send to POP').click();
  await frame.locator('#ctl00_phDS_ds_ToolBar_sendToStagingCst').getByText('Send to Staging').click();
});
