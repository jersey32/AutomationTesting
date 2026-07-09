import { test } from '@playwright/test';
import { PracticePage } from '../pages/PracticePage.js';

let practicePage;

test.beforeEach(async ({ page }) => {
  practicePage = new PracticePage(page);
  await practicePage.navigateTo();
});

test('getByRole - buttons', async () => {
  await practicePage.clickPrimaryActionButton();
  await practicePage.clickToggleButton();
});

test('getByRole - form fields', async () => {
  await practicePage.fillUsername('testuser');
  await practicePage.fillEmail('test@123.com');
  await practicePage.fillPassword('test@123');
  await practicePage.fillAge('30');
});

test('getByRole - checkboxes and radio buttons', async () => {
  await practicePage.selectStandardRadio();
  await practicePage.selectExpressRadio();
});

test('drag and drop', async () => {
  await practicePage.dragAndDrop();
});