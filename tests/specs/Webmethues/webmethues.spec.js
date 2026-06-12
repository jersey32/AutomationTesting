import {test, expect} from '@playwright/test';
import { Webmetheus_URL } from '../../pages/login.js';
import { WEBMETHEUS_SCRIPT } from '../../pages/menu-page.js';

test.beforeEach(async ({ page }) => {
    await page.goto(Webmetheus_URL);
});

test('Check if Webmetheus is online', async ({ page }) => {
    await expect(page.getByText('Automatic Scraping Tool')).toBeVisible();
});   

test('Checktemplate dropdown', async ({ page }) => {
  for (const name of WEBMETHEUS_SCRIPT) {
    await expect(page.getByRole('combobox')).toContainText(name);
  }    
});