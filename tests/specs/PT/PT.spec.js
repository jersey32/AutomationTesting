import { test, expect } from '@playwright/test';
import { LoginPage, LOGIN_URL_PT } from '../../pages/LoginPage.js';
import { PhoneTrackerPage } from '../../pages/PhoneTrackerPage.js';
import { HOME_BUTTONS, WATCHDOG_BUTTONS, KAM_Dashboard_BUTTONS, COMPANIES_LINKS } from '../../pages/menu-page.js';

let loginPage;
let phoneTrackerPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  phoneTrackerPage = new PhoneTrackerPage(page);
  await loginPage.loginPhoneTracker(process.env.PT_USERNAME, process.env.PT_PASSWORD);
});

test('Home Page - buttons visible', async () => {
  for (const name of HOME_BUTTONS) {
    const isVisible = await phoneTrackerPage.isButtonVisible(name);
    expect(isVisible).toBeTruthy();
  }
});

test('Watchdog Dashboard - buttons visible', async () => {
  await phoneTrackerPage.navigateToWatchdogDashboard();
  for (const name of WATCHDOG_BUTTONS) {
    const isVisible = await phoneTrackerPage.isButtonVisible(name);
    expect(isVisible).toBeTruthy();
  }
});

test('KAM Dashboard - buttons visible', async () => {
  for (const name of KAM_Dashboard_BUTTONS) {
    const isVisible = await phoneTrackerPage.isButtonVisible(name);
    expect(isVisible).toBeTruthy();
  }
});

test('Companies', async () => {
  await phoneTrackerPage.navigateToCompanies();
  for (const name of COMPANIES_LINKS) {
    const isVisible = await phoneTrackerPage.isCompanyLinkVisible(name);
    expect(isVisible).toBeTruthy();
  }
});

test('Employees/POCs/Equip.', async () => {
  await phoneTrackerPage.navigateToEmployees();
  const employeesVisible = await phoneTrackerPage.isEmployeesTextVisible();
  expect(employeesVisible).toBeTruthy();

  await phoneTrackerPage.clickDeviceLink();
  const deviceVisible = await phoneTrackerPage.isDeviceTextVisible();
  const idVisible = await phoneTrackerPage.isDeviceIdVisible();
  const serialVisible = await phoneTrackerPage.isSerialNumberVisible();

  expect(deviceVisible).toBeTruthy();
  expect(idVisible).toBeTruthy();
  expect(serialVisible).toBeTruthy();
});