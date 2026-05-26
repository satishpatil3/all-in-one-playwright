/**
 * @fileoverview Auto-suggestion handling test for Google search.
 * Skipped by default — Google's UI is not a stable test target.
 */

const { test } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { TIMEOUTS } = require('../../constants/timeouts');

test.describe('Google | Auto Suggestion', () => {

  test.skip('Verify auto suggestion using loop', async ({ page }) => {
    await page.goto(URLS.GOOGLE);

    await page.locator("textarea[name='q']").type('playwright mouse');
    await page.waitForTimeout(TIMEOUTS.SUGGESTION_WAIT);

    const elements = await page.$$("li[role='presentation']");

    for (const element of elements) {
      const text = await element.textContent();
      if (text && text.includes('playwright mouse')) {
        await element.click();
        break;
      }
    }
  });

});
