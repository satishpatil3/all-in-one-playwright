/**
 * @fileoverview TC04 — Combined filters: Python + Beginner + 10,000+.
 */

const { test, expect } = require('../../fixtures/index');
const { assertAllEqual, assertAllAtLeast } = require('../../utils/assertionUtils');

test.describe('Course Table | Combined Filters', () => {

  test('TC04 - Python + Beginner + 10,000+ shows matching courses only', async ({ courseTablePage }) => {
    await courseTablePage.filterByLanguage('Python');
    await courseTablePage.toggleLevelFilter('Intermediate');
    await courseTablePage.toggleLevelFilter('Advanced');
    await courseTablePage.setMinEnrollments(10000);

    const languages = await courseTablePage.getVisibleLanguages();
    const levels = await courseTablePage.getVisibleLevels();
    const enrollments = await courseTablePage.getVisibleEnrollments();

    expect(languages.length).toBeGreaterThan(0);
    assertAllEqual(languages, 'Python');
    assertAllEqual(levels, 'Beginner');
    assertAllAtLeast(enrollments, 10000);
  });

});
