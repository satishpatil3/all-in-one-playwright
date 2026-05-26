/**
 * @fileoverview Multiple browser tab handling test.
 */

const { test } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { MESSAGES } = require('../../constants/messages');
const { assertContainsText } = require('../../utils/assertionUtils');

test.describe('Herokuapp | Multiple Tabs', () => {

  test('New tab opens and shows correct heading', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(URLS.HEROKUAPP_WINDOWS);

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator("//a[normalize-space()='Click Here']").click(),
    ]);

    await assertContainsText(
      newPage.locator("//h3[normalize-space()='New Window']"),
      MESSAGES.WINDOWS.NEW_WINDOW_HEADING
    );

    await context.close();
  });

});
