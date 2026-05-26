/**
 * @fileoverview TC05 — No results state when filters produce zero matches.
 */

const { test } = require('../../fixtures/index');
const { assertVisible, assertCount } = require('../../utils/assertionUtils');

test.describe('Course Table | No Results', () => {

  test('TC05 - Incompatible filters show no-results message', async ({ courseTablePage }) => {
    await courseTablePage.filterByLanguage('Python');
    await courseTablePage.toggleLevelFilter('Beginner');

    await assertVisible(courseTablePage.noDataLocator);
    await assertCount(courseTablePage.visibleRowsLocator, 0);
  });

});
