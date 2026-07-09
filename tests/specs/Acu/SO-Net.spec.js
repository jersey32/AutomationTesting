import { test } from '@playwright/test';
import { LoginPage, ACU_URL } from '../../pages/LoginPage.js';
import { AcumaticaSalesOrderPage } from '../../pages/AcumaticaSalesOrderPage.js';
import { REVIEW_TABS } from '../../pages/menu-page.js';

let loginPage;
let salesOrderPage;

test('Sales Order Creation', async ({ page }) => {
  loginPage = new LoginPage(page);
  salesOrderPage = new AcumaticaSalesOrderPage(page);

  await test.step('login', async () => {
    await loginPage.loginAcumatica(`${ACU_URL}SO301000`, process.env.ACU_USERNAME, process.env.ACU_PASSWORD);
  });

  const frame = await salesOrderPage.getMainFrame();

  await test.step('fill order header', async () => {
    const orderData = {
      customer: 'C10008',
      description: 'Test Description',
      estimatedShipDate: '12/31/2026',
      customerOrderNbr: 'Test Order',
      externalReference: 'Test External Ref',
    };
    await salesOrderPage.fillOrderHeader(frame, orderData);
  });

  await test.step('add items', async () => {
    await salesOrderPage.saveRecord(frame);
    await salesOrderPage.addItemsNoWMS(frame);
  });

  await test.step('review tabs', async () => {
    for (const name of REVIEW_TABS) {
      await salesOrderPage.clickTab(frame, name);
    }
  });

  await test.step('remove hold and send to staging', async () => {
    await salesOrderPage.removeHold(frame);
    await salesOrderPage.waitForLongRunProcess(frame);
    await salesOrderPage.removeCreditHold(frame);
    await salesOrderPage.sendToStaging(frame);
  });
});
