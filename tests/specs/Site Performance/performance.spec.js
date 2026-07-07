import {test, expect} from '@playwright/test';

const start = Date.now();
const end = Date.now();

test('PT Performance Test', async ({ page }) => {
    await page.goto('https://phonetracker.e2cc.com/');
    const loadTime = end - start;
    console.log(`Page load time: ${loadTime} ms`);
    expect(loadTime).toBeLessThan(6000); // Assert that the page load time is less than 6 seconds
});

test ('Acu Performance Test', async ({ page }) => {
    await page.goto('https://esquared.acumatica.com/Frames/Login.aspx?ReturnUrl=%2f');
    const loadTime = end - start;
    console.log(`Page load time: ${loadTime} ms`);
    expect(loadTime).toBeLessThan(6000); // Assert that the page load time is less than 6 seconds
});

test ('API Check Performance Test', async ({ page }) => {
 const response = await page.request.get('https://reqres.in/api');
 console.log(`API response status: ${response.status()}`);
 expect(response.status()).toBe(200);
});

test('API Check Performance Test 2', async ({ page }) => {
    const response = await page.request.get('https://reqres.in/api/users/9999');
    console.log(`API response status: ${response.status()}`);
    expect(response.status()).toBe(401);
});