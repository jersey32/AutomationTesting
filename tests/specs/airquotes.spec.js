import { test, expect } from '@playwright/test';

test('Check AirQuotes is Online', async ({ page }) => {
   const startTime = Date.now();
   await page.goto('https://quote.e2cc.com/NDUxNWQzNTYwNzk3NDdmNTI3NTY0NjI3ZjY2MjUzMjM1MzgzMDMwM2QzMjcyNmU2ZjUyNzU2NDYyN2Y2ZjM3LjM4OQ==');
   const loadTime = Date.now() - startTime;
   console.log(`Page load time: ${loadTime} ms`);
   expect(loadTime).toBeLessThan(6000);
});