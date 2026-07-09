import { test, expect } from '@playwright/test';
import { PerformancePage } from '../../pages/PerformancePage.js';

let performancePage;

test.beforeEach(async ({ page }) => {
  performancePage = new PerformancePage(page);
});

test('PT Performance Test', async () => {
  const loadTime = await performancePage.measurePageLoadTime('https://phonetracker.e2cc.com/');
  console.log(`Page load time: ${loadTime} ms`);
  expect(loadTime).toBeLessThan(6000);
});

test('Acu Performance Test', async () => {
  const loadTime = await performancePage.measurePageLoadTime('https://esquared.acumatica.com/Frames/Login.aspx?ReturnUrl=%2f');
  console.log(`Page load time: ${loadTime} ms`);
  expect(loadTime).toBeLessThan(6000);
});

test('API Check Performance Test', async ({ request }) => {
  const status = await performancePage.checkAPIResponseStatus(request, 'https://reqres.in/api');
  console.log(`API response status: ${status}`);
  expect(status).toBe(200);
});

test('API Check Performance Test 2', async ({ request }) => {
  const status = await performancePage.checkAPIResponseStatus(request, 'https://reqres.in/api/users/9999');
  console.log(`API response status: ${status}`);
  expect(status).toBe(401);
});