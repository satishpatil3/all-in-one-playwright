/**
 * @fileoverview Browser console error and JS page error capture tests.
 * Uses the shared trackConsoleErrors utility.
 *
 * Two scenarios:
 *  1. A page that intentionally throws — verify errors ARE captured.
 *  2. A clean page — verify zero errors are captured.
 */

const { test, expect } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { trackConsoleErrors } = require('../../utils/consoleErrorTracker');

test.describe('Browser Console | Error Detection', () => {

  test('Console errors are captured on a page that intentionally throws JS errors', async ({ page }) => {
    const consoleErrors = trackConsoleErrors(page);

    await page.goto(URLS.HEROKUAPP_JS_ERROR);

    // This page intentionally throws a JS error — verify the tracker captures it
    expect(
      consoleErrors.length,
      'Expected at least one JS error to be captured on the error demo page'
    ).toBeGreaterThan(0);
  });

  test('No console errors on a clean page', async ({ page }) => {
    const consoleErrors = trackConsoleErrors(page);

    await page.goto(URLS.PLAYWRIGHT_DOCS);

    expect(
      consoleErrors,
      `Unexpected errors found:\n${consoleErrors.join('\n')}`
    ).toHaveLength(0);
  });

});
