/**
 * @fileoverview TimeoutException scenario.
 * Demonstrates an intentionally short timeout that is expected to fail.
 */

const { test } = require('../../fixtures/index');
const { TIMEOUTS } = require('../../constants/timeouts');

test.describe('Exceptions | Timeout', () => {

  test.fail('TimeoutException scenario — expected to fail with short timeout');

  test('Row 2 input visibility check with intentionally short timeout', async ({ exceptionsPage }) => {
    await exceptionsPage.clickAdd();

    // Intentionally too short — this test is expected to fail
    await exceptionsPage.row2InputLocator.waitFor({
      state: 'visible',
      timeout: TIMEOUTS.XSHORT,
    });
  });

});
