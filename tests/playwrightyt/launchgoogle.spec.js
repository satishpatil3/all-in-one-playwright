/**
 * @fileoverview Basic Google page title and URL verification.
 */

const { test } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { assertTitle } = require('../../utils/assertionUtils');
const { logInfo } = require('../../utils/logUtils');

test.describe('Google | Basic Navigation', () => {

  test('Google search page has correct title', async ({ page }) => {
    await page.goto(`${URLS.GOOGLE}search`);

    logInfo(`Page URL: ${page.url()}`);
    logInfo(`Page title: ${await page.title()}`);

    await assertTitle(page, 'Google');
  });

});
