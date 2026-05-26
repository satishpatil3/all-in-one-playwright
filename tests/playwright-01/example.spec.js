/**
 * @fileoverview Playwright docs smoke tests.
 */

const { test } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { assertTitle, assertVisible } = require('../../utils/assertionUtils');

test.describe('Playwright Docs | Smoke', () => {

  test('Has correct title', async ({ page }) => {
    await page.goto(URLS.PLAYWRIGHT_DOCS);
    await assertTitle(page, /Playwright/);
  });

  test('Get started link leads to Installation heading', async ({ page }) => {
    await page.goto(URLS.PLAYWRIGHT_DOCS);
    await page.getByRole('link', { name: 'Get started' }).click();
    await assertVisible(page.getByRole('heading', { name: 'Installation' }));
  });

});
