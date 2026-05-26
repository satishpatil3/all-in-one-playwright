/**
 * @fileoverview NoSuchElementException scenario.
 * Demonstrates explicit wait for a dynamically added element.
 */

const { test } = require('../../fixtures/index');
const { assertVisible } = require('../../utils/assertionUtils');

test.describe('Exceptions | NoSuchElement', () => {

  test('Row 2 input becomes visible after clicking Add', async ({ exceptionsPage }) => {
    await exceptionsPage.clickAdd();

    // waitForElement is called inside fillRow2 — expose row2 directly here
    await exceptionsPage.row2InputLocator.waitFor({ state: 'visible' });
    await assertVisible(exceptionsPage.row2InputLocator);
  });

});
