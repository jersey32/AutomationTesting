import { test } from '@playwright/test';
import { LoginPage, ACU_URL } from '../../pages/LoginPage.js';
import { AcumaticaPurchaseOrderPage } from '../../pages/AcumaticaPurchaseOrderPage.js';
import { FORM_DATA } from '../../pages/menu-page.js';

let loginPage;
let purchaseOrderPage;

test('Purchase Order', async ({ page }) => {
  loginPage = new LoginPage(page);
  purchaseOrderPage = new AcumaticaPurchaseOrderPage(page);

  await loginPage.loginAcumatica(`${ACU_URL}PO301000`, process.env.ACU_USERNAME, process.env.ACU_PASSWORD);

  const frame = await purchaseOrderPage.getMainFrame();

  await purchaseOrderPage.fillOrderHeader(frame, FORM_DATA);
  await purchaseOrderPage.addItems(frame, FORM_DATA);
  await purchaseOrderPage.saveRecord(frame);
  await purchaseOrderPage.addTrackingNumber(frame, FORM_DATA);
  await purchaseOrderPage.saveRecord(frame);
});
