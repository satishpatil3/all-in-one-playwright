/**
 * @fileoverview TC03 — Min enrollments filter: 10,000+.
 */

const { test, expect } = require('../../fixtures/index');
const { assertAllAtLeast } = require('../../utils/assertionUtils');

test.describe('Course Table | Enrollment Filter', () => {

  test('TC03 - Min enrollments → 10,000+ shows qualifying courses', async ({ courseTablePage }) => {
    await courseTablePage.setMinEnrollments(10000);

    const enrollments = await courseTablePage.getVisibleEnrollments();
    expect(enrollments.length).toBeGreaterThan(0);
    assertAllAtLeast(enrollments, 10000);
  });

});
