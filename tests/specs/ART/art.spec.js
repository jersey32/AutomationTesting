import { test, expect } from '@playwright/test';
import { ART_URL } from '../../pages/login.js';
import { ART_TEMPLATES } from '../../pages/menu-page.js';

test.beforeEach(async ({ page }) => {
  await page.goto(ART_URL);
});

//Check if ART is online by verifying the presence of the "Automatic Reporting Tool" text
test('Check if ART is online', async ({ page }) => {
  await expect(page.getByText('Automatic Reporting Tool')).toBeVisible();
});

//Check the presence of all the templates in the template dropdown
test('Check the templates', async ({ page }) => {
  for (const name of ART_TEMPLATES) {
    await expect(page.getByRole('combobox')).toContainText(name);
  }
});