/**
 * @fileoverview TC07 — Sort by Enrollments (ascending, numeric).
 */

const { test, expect } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { assertNumericAscending } = require('../../utils/assertionUtils');

test.describe('Course Table | Sort by Enrollments', () => {

  test('TC07 - Sort by Enrollments shows courses in ascending numeric order', async ({ courseTablePage }) => {
    await courseTablePage.sortBy(MESSAGES.TABLE.SORT_ENROLLMENTS);

    const enrollments = await courseTablePage.getVisibleEnrollments();
    expect(enrollments.length).toBeGreaterThan(1);
    assertNumericAscending(enrollments);
  });

});
