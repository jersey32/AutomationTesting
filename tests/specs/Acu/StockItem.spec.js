import { test } from '@playwright/test';
import { LoginPage, ACU_URL } from '../../pages/LoginPage.js';
import { AcumaticaStockItemPage } from '../../pages/AcumaticaStockItemPage.js';

let loginPage;
let stockItemPage;

test('Update Stock Item Last Cost', async ({ page }) => {
  loginPage = new LoginPage(page);
  stockItemPage = new AcumaticaStockItemPage(page);

  await loginPage.loginAcumatica(`${ACU_URL}IN202500`, process.env.ACU_USERNAME, process.env.ACU_PASSWORD);

  const frame = await stockItemPage.getMainFrame();
  await stockItemPage.updateStockItem(frame);
});
