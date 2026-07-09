import { test } from '@playwright/test';
import { LoginPage, ACU_URL } from '../../pages/LoginPage.js';
import { AcumaticaSalesOrderPage } from '../../pages/AcumaticaSalesOrderPage.js';

let loginPage;
let salesOrderPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  salesOrderPage = new AcumaticaSalesOrderPage(page);
  await loginPage.loginAcumatica(
    `${ACU_URL}SO301000&OrderType=SO&OrderNbr=057204`,
    process.env.ACU_USERNAME,
    process.env.ACU_PASSWORD
  );
});

test('Generate Payment', async () => {
  const frame = await salesOrderPage.getMainFrame();
  await salesOrderPage.generatePayment(frame);
});

test('View Payment', async () => {
  const frame = await salesOrderPage.getMainFrame();
  await salesOrderPage.viewPayment(frame);
});

test('Print SO', async () => {
  const frame = await salesOrderPage.getMainFrame();
  await salesOrderPage.printSalesOrder(frame);
});