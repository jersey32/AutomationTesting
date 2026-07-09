import { test, expect } from '@playwright/test';
import { ARTPage } from '../../pages/ARTPage.js';
import { ART_TEMPLATES } from '../../pages/menu-page.js';

let artPage;

test.beforeEach(async ({ page }) => {
  artPage = new ARTPage(page);
  await artPage.navigateTo();
});

test('Check if ART is online', async () => {
  const isVisible = await artPage.isOnlineTextVisible();
  expect(isVisible).toBeTruthy();
});

test('Check the templates', async ({ page }) => {
  const content = await page.getByRole('combobox').textContent();
  for (const name of ART_TEMPLATES) {
    expect(content).toContain(name);
  }
});