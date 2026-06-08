import { test } from '@playwright/test';

const PRACTICE_URL = 'https://testautomationpractice.blogspot.com/p/playwrightpractice.html';

test.beforeEach(async ({ page }) => {
  await page.goto(PRACTICE_URL);
  await page.waitForLoadState('domcontentloaded');
});

test('getByRole - buttons', async ({ page }) => {
  await page.getByRole('button', { name: 'Primary Action' }).click();
  await page.getByRole('button', { name: 'Toggle Button' }).click();
});

test('getByRole - form fields', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('testuser');
  await page.getByRole('textbox', { name: 'Email Address:' }).fill('test@123.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('test@123');
  await page.getByRole('spinbutton', { name: 'Your Age' }).fill('30');
});

test('getByRole - checkboxes and radio buttons', async ({ page }) => {
await page.getByRole('radio', { name: 'Standard' }).check();
await page.getByRole('radio', { name: 'Express' }).check();
});

test('Drag and Drop', async ({ page }) => {
await page.locator('#draggable').dragTo(page.locator('#droppable'));
});