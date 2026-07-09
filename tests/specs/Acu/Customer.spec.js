import { test } from '@playwright/test';
import { LoginPage, ACU_URL } from '../../pages/LoginPage.js';
import { AcumaticaCustomerPage } from '../../pages/AcumaticaCustomerPage.js';
import { CUSTOMER_DATA } from '../../pages/menu-page.js';

let loginPage;
let customerPage;

test('Create Customer', async ({ page }) => {
  loginPage = new LoginPage(page);
  customerPage = new AcumaticaCustomerPage(page);

  await loginPage.loginAcumatica(`${ACU_URL}AR303000`, process.env.ACU_USERNAME, process.env.ACU_PASSWORD);

  const frame = await customerPage.getMainFrame();
  await customerPage.fillCustomerDetails(frame, CUSTOMER_DATA);
  await customerPage.saveRecord(frame);
});
