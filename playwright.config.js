// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { URLS } = require('./constants/urls');
const { TIMEOUTS } = require('./constants/timeouts');

module.exports = defineConfig({
  testDir: './tests',

  testMatch: [
    '**/*.spec.js',
    '**/*.spec.ts',
    '**/*.test.js',
  ],

  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  timeout: TIMEOUTS.DEFAULT,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    // Default base URL for API tests (Restful Booker)
    baseURL: URLS.RESTFUL_BOOKER_API,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',

    // No actionTimeout — prevents premature failures on slow SPAs
    navigationTimeout: TIMEOUTS.LONG,
  },

  projects: [
    // ── Chromium — all tests except Firefox-only ───────────────────────────
    // fileUpload requires Chromium specifically; handleMultipletab requires Firefox
    {
      name: 'chromium',
      testIgnore: ['**/handleMultipletab.spec.js'],
      use: { ...devices['Desktop Chrome'] },
    },

    // ── Firefox — all tests except Chromium-only ───────────────────────────
    {
      name: 'firefox',
      testIgnore: ['**/fileUpload.spec.js'],
      use: { ...devices['Desktop Firefox'] },
    },

    // ── WebKit — all tests except browser-specific ones ────────────────────
    // Mirrors original all-webkit: runs everything except fileUpload (chromium-only)
    // and handleMultipletab (firefox-only)
    {
      name: 'webkit',
      testIgnore: [
        '**/fileUpload.spec.js',
        '**/handleMultipletab.spec.js',
      ],
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
