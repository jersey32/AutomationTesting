// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, 'tests/.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    viewport: { width: 1280, height: 720 },

    deviceScaleFactor: 1,

    timezoneId: 'UTC',

    colorScheme: 'light',

    javaScriptEnabled: true,

    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    // Runs auth.spec.js first and saves session to .auth/apuri.json
    {
      name: 'setup',
      testMatch: '**/auth.spec.js',
    },

    // Apuri tests — reuse the authenticated session from setup
    {
      name: 'apuri',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/apuri.json',
      },
      dependencies: ['setup'],
      testMatch: '**/Apuri/**/*.spec.js',
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/auth.spec.js', '**/Apuri/**/*.spec.js'],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

