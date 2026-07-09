import { test } from '@playwright/test';
import { LoginPage, ACU_URL } from '../../pages/LoginPage.js';
import { AcumaticaSalesOrderPage } from '../../pages/AcumaticaSalesOrderPage.js';
import { REVIEW_TABS } from '../../pages/menu-page.js';

let loginPage;
let salesOrderPage;

test('Sales Order Creation', async ({ page }) => {
  loginPage = new LoginPage(page);
  salesOrderPage = new AcumaticaSalesOrderPage(page);

  await loginPage.loginAcumatica(`${ACU_URL}SO301000`, process.env.ACU_USERNAME, process.env.ACU_PASSWORD);

  const frame = await salesOrderPage.getMainFrame();

  const orderData = {
    customer: 'C10008',
    description: 'Test Description',
    estimatedShipDate: '12/31/2026',
    customerOrderNbr: 'Test Order',
    externalReference: 'Test External Ref',
  };

  await salesOrderPage.fillOrderHeader(frame, orderData);
  await salesOrderPage.selectWMSFromDropdown(frame);
  await salesOrderPage.addItems(frame);

  for (const name of REVIEW_TABS) {
    await salesOrderPage.clickTab(frame, name);
  }

  await salesOrderPage.removeHold(frame);
  await salesOrderPage.waitForLongRunProcess(frame);
  await salesOrderPage.sendToPOP(frame);
  await salesOrderPage.sendToStagingCst(frame);
});
