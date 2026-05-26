/**
 * @fileoverview TC06 — Reset button visibility and behavior.
 */

const { test, expect } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { assertVisible, assertHidden, assertChecked, assertText, assertCount } = require('../../utils/assertionUtils');

test.describe('Course Table | Reset Button', () => {

  test('TC06 - Reset button appears after filter change and restores defaults', async ({ courseTablePage }) => {
    await courseTablePage.filterByLanguage('Java');
    await assertVisible(courseTablePage.resetButtonLocator);

    await courseTablePage.resetFilters();

    await assertChecked(courseTablePage.languageAnyLocator);

    const checkboxCount = await courseTablePage.levelCheckboxesLocator.count();
    for (let i = 0; i < checkboxCount; i++) {
      await assertChecked(courseTablePage.levelCheckboxesLocator.nth(i));
    }

    await assertText(courseTablePage.enrollDropdownLabelLocator, MESSAGES.TABLE.ENROLL_DROPDOWN_ANY);
    await assertHidden(courseTablePage.resetButtonLocator);
    await assertCount(courseTablePage.hiddenRowsLocator, 0);
  });

});
