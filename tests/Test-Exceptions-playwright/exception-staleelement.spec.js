/**
 * @fileoverview StaleElementReferenceException scenario.
 * Demonstrates that clicking Add removes the instructions element from the DOM.
 */

const { test } = require('../../fixtures/index');
const { assertVisible, assertHidden } = require('../../utils/assertionUtils');

test.describe('Exceptions | StaleElement', () => {

  test('Instructions element is removed from DOM after clicking Add', async ({ exceptionsPage }) => {
    await assertVisible(exceptionsPage.instructionsLocator);

    await exceptionsPage.clickAdd();

    await assertHidden(exceptionsPage.instructionsLocator);
  });

});
