import { test, expect } from '@playwright/test';
import { HOME_BUTTONS, WATCHDOG_BUTTONS, KAM_Dashboard_BUTTONS, COMPANIES_LINKS } from '../../pages/menu-page.js';
import { LOGIN_URL_PT } from '../../pages/login.js';


test.beforeEach(async ({ page }) => {
  await page.goto(LOGIN_URL_PT);
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('textbox', { name: 'User Name:' }).fill(process.env.PT_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PT_PASSWORD);
  await page.getByRole('button', { name: 'Log In' }).click();
});

//Checking the presence of buttons on the Home Page
test('Home Page - buttons visible', async ({ page }) => {
  for (const name of HOME_BUTTONS) {
    await expect(page.getByRole('button', { name })).toBeVisible();
  }
});

//Checking the presence of buttons on the Watchdog Dashboard page
test('Watchdog Dashboard - buttons visible', async ({ page }) => {
  await page.getByText('Watchdog Dashboard').click();
  for (const name of WATCHDOG_BUTTONS) {
    await expect(page.getByRole('button', { name })).toBeVisible();
  }
});

//Checking the presence of buttons on the KAM Dashboard page
test('KAM Dashboard - buttons visible', async ({ page }) => {
  for (const name of KAM_Dashboard_BUTTONS) {
    await expect(page.getByRole('button', { name })).toBeVisible();
  }
});

//Checking the presence of the "Companies" link and its sub-links under the "Companies" section
test('Companies', async ({ page }) => {
 await page.getByRole('link', { name: 'Companies' }).hover();
  for (const name of COMPANIES_LINKS) {
    await expect(page.getByRole('link', { name })).toBeVisible();
  }
});

test('Employees/POCs/Equip.', async ({ page }) => {
 await page.getByRole('link', { name: 'Employees/POCs/Equipment' }).click();
 await expect(page.getByText('Employees/POCs', { exact: true })).toBeVisible();

 //Verify the presence of the "100, Device" link and its details
 await page.getByRole('link', { name: '100, Device' }).click();
 await expect(page.getByText('Device', { exact: true })).toBeVisible();
 await expect(page.getByText('100', { exact: true })).toBeVisible();
 await expect(page.getByRole('link', { name: 'R9PT402TLZD' })).toBeVisible();
});