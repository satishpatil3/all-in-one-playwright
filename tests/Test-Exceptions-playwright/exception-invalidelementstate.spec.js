/**
 * @fileoverview InvalidElementStateException scenario.
 * Demonstrates enabling a read-only input before interacting with it.
 */

const { test } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { assertValue } = require('../../utils/assertionUtils');

test.describe('Exceptions | InvalidElementState', () => {

  test('Enable row 1 input via Edit, clear and fill with new value', async ({ exceptionsPage }) => {
    await exceptionsPage.clickEdit();
    await exceptionsPage.fillRow1(MESSAGES.EXCEPTIONS.ROW1_INPUT_VALUE);

    await assertValue(exceptionsPage.row1InputLocator, MESSAGES.EXCEPTIONS.ROW1_INPUT_VALUE);
  });

});
