/**
 * @fileoverview TC01 — Language filter: Java only.
 */

const { test } = require('../../fixtures/index');
const { assertAllEqual } = require('../../utils/assertionUtils');

test.describe('Course Table | Language Filter', () => {

  test('TC01 - Language filter → Java shows only Java courses', async ({ courseTablePage }) => {
    await courseTablePage.filterByLanguage('Java');

    const languages = await courseTablePage.getVisibleLanguages();
    assertAllEqual(languages, 'Java');
  });

});
