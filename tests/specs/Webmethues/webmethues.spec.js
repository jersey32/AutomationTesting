import { test, expect } from '@playwright/test';
import { WebmethousPage } from '../../pages/WebmethousPage.js';
import { WEBMETHEUS_SCRIPT } from '../../pages/menu-page.js';

let webmethousPage;

test.beforeEach(async ({ page }) => {
  webmethousPage = new WebmethousPage(page);
  await webmethousPage.navigateTo();
});

test('Check if Webmetheus is online', async () => {
  const isVisible = await webmethousPage.isOnlineTextVisible();
  expect(isVisible).toBeTruthy();
});

test('Checktemplate dropdown', async ({ page }) => {
  const content = await page.getByRole('combobox').textContent();
  for (const name of WEBMETHEUS_SCRIPT) {
    expect(content).toContain(name);
  }
});