import { test } from '@playwright/test';
import { LoginPage, ACU_URL } from '../../pages/LoginPage.js';
import { AcumaticaLeadPage } from '../../pages/AcumaticaLeadPage.js';
import { LEAD_DATA } from '../../pages/menu-page.js';

let loginPage;
let LeadPage;

test('Create leads', async ({ page }) => {
  loginPage = new LoginPage(page);
  LeadPage = new AcumaticaLeadPage(page);      

  await loginPage.loginAcumatica(`${ACU_URL}CR301000`, process.env.ACU_USERNAME, process.env.ACU_PASSWORD);

  const frame = await LeadPage.getMainFrame();
  await LeadPage.fillLeadDetails(frame, LEAD_DATA);
  await LeadPage.saveRecord(frame);
});