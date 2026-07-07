import { test } from '@playwright/test';
import { REVIEW_TABS } from '../../pages/menu-page';
import { login, ACU_URL } from '../../pages/login';


const BASE_URL = 'https://esquared-sandbox-25-2.acumatica.com/(W(13))/Main?ScreenId=SO301000';


test('Sales Order Creation', async ({ page }) => {
  await test.step('login', async () => {
    await page.goto(`${ACU_URL}SO301000`);
    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ACU_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ACU_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
  });

  const frame = page.locator('iframe[name="main"]').contentFrame();

  await test.step('fill order header', async () => {
    await frame.getByRole('textbox', { name: 'Customer:' }).fill('C10008');
    await frame.getByRole('textbox', { name: 'Customer:' }).press('Enter');
    await frame.getByRole('textbox', { name: 'Description:' }).fill('Test Description');
    await frame.getByRole('textbox', { name: 'Estimated Ship Date:' }).fill('12/31/2026');
    await frame.getByRole('textbox', { name: 'Customer Order Nbr.:' }).fill('Test Order');
    await frame.getByRole('textbox', { name: 'External Reference:' }).fill('Test External Ref');
  });

  await test.step('add items', async () => {
    await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
    await frame.locator('#ctl00_phG_tab_t0_grid_at_tlb_ul').getByText('Add Items').click();
    await frame.locator('#ctl00_phG_PanelAddSiteStatus_PanelAddSiteStatus_gripSiteStatus_colHS_0_0 div').nth(1).click();
    await frame.locator('#ctl00_phG_PanelAddSiteStatus_PanelAddSiteStatus_btnAddClose').click();
  });

  await test.step('review tabs', async () => {
    for (const name of REVIEW_TABS) {
      await frame.getByRole('cell', { name, exact: true }).click();
    }
  });

  await test.step('remove hold and send to staging', async () => {
    await frame.locator('#ctl00_phDS_ds_ToolBar_ReleaseFromHold').getByText('Remove Hold').click();
    await frame.locator('qp-long-run div').nth(4).click();
    await frame.locator('#ctl00_phDS_ds_ToolBar_ReleaseFromCreditHold').getByText('Remove Credit Hold').click();
    await frame.locator('#ctl00_phDS_ds_ToolBar_sendToStaging').getByText('Send To Staging').click();
  });
});
