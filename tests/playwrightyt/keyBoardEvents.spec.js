/**
 * @fileoverview Keyboard event tests using Google search input.
 */

const { test } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { typeText, pressKey } = require('../../utils/browserUtils');

test.describe('Google | Keyboard Events', () => {

  test('Type text and use keyboard shortcuts to delete a word', async ({ page }) => {
    await page.goto(URLS.GOOGLE);

    const searchInput = page.locator("textarea[name='q']");
    await searchInput.focus();

    await typeText(page, 'Playwright software');

    // Move cursor left one position, then shift-select 6 chars left, then delete
    await pressKey(page, 'ArrowLeft');
    await page.keyboard.down('Shift');
    for (let i = 0; i < 6; i++) {
      await pressKey(page, 'ArrowLeft');
    }
    await page.keyboard.up('Shift');
    await pressKey(page, 'Backspace');
  });

});
