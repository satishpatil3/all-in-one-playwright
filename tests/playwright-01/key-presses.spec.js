/**
 * @fileoverview Key press validation tests for The Internet (Herokuapp).
 */

const { test, expect } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { assertVisible } = require('../../utils/assertionUtils');
const { pressKey } = require('../../utils/browserUtils');

test.describe('Herokuapp | Key Presses', () => {

  test('Press multiple keys and validate result text updates correctly', async ({ page }) => {
    await page.goto(URLS.HEROKUAPP_KEY_PRESSES);

    await assertVisible(page.getByRole('heading', { name: 'Key Presses' }));

    await page.locator('#target').click();

    const keys = ['A', 'B', 'C'];

    for (const key of keys) {
      await pressKey(page, key);
      await expect(page.locator('#result')).toHaveText(`You entered: ${key.toUpperCase()}`);
    }
  });

});
