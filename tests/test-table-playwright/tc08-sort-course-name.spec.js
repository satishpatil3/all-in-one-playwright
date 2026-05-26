/**
 * @fileoverview TC08 — Sort by Course Name (A → Z), verified before and after a filter change.
 */

const { test } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { assertSortedAscending } = require('../../utils/assertionUtils');

test.describe('Course Table | Sort by Course Name', () => {

  test('TC08 - Sort by Course Name shows A→Z order, maintained after filter change', async ({ courseTablePage }) => {
    await courseTablePage.sortBy(MESSAGES.TABLE.SORT_COURSE_NAME);

    const namesBeforeFilter = await courseTablePage.getVisibleCourseNames();
    assertSortedAscending(namesBeforeFilter);

    await courseTablePage.filterByLanguage('Java');

    const namesAfterFilter = await courseTablePage.getVisibleCourseNames();
    assertSortedAscending(namesAfterFilter);
  });

});
