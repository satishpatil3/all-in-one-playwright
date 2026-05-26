/**
 * @fileoverview TC02 — Level filter: Beginner only.
 */

const { test, expect } = require('../../fixtures/index');
const { assertAllEqual } = require('../../utils/assertionUtils');

test.describe('Course Table | Level Filter', () => {

  test('TC02 - Level filter → Beginner only courses shown', async ({ courseTablePage }) => {
    await courseTablePage.toggleLevelFilter('Intermediate');
    await courseTablePage.toggleLevelFilter('Advanced');

    const levels = await courseTablePage.getVisibleLevels();
    expect(levels.length).toBeGreaterThan(0);
    assertAllEqual(levels, 'Beginner');
  });

});
