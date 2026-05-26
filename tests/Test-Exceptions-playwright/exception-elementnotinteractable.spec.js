/**
 * @fileoverview ElementNotInteractableException scenario.
 * Demonstrates waiting for a dynamically added element before interacting.
 */

const { test } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { assertText } = require('../../utils/assertionUtils');

test.describe('Exceptions | ElementNotInteractable', () => {

  test('Add row 2, fill input, save and verify confirmation', async ({ exceptionsPage }) => {
    await exceptionsPage.clickAdd();
    await exceptionsPage.fillRow2(MESSAGES.EXCEPTIONS.ROW2_INPUT_VALUE);
    await exceptionsPage.saveRow2();

    await assertText(exceptionsPage.confirmationLocator, MESSAGES.EXCEPTIONS.ROW2_SAVED);
  });

});
