/**
 * @fileoverview Locators for the Practice Test Automation course table page.
 */

const COURSE_TABLE_LOCATORS = {
  /** Only visible (non-hidden) table rows */
  VISIBLE_ROWS: '#courses_table tbody tr:not([style*="display: none"])',
  HIDDEN_ROWS: '#courses_table tbody tr[style*="display: none"]',

  /** Cell data columns */
  LANGUAGE_CELL: 'td[data-col="language"]',
  LEVEL_CELL: 'td[data-col="level"]',
  ENROLLMENTS_CELL: 'td[data-col="enrollments"]',
  COURSE_NAME_CELL: 'td[data-col="course"]',

  /** Filter controls */
  LANGUAGE_FILTER: (value) => `//fieldset[legend[text()='Language']]//input[@value='${value}']`,
  LEVEL_FILTER: (value) => `//fieldset[legend[text()='Level']]//input[@value='${value}']`,
  LEVEL_CHECKBOXES: "//fieldset[legend[text()='Level']]//input[@type='checkbox']",

  /** Enrollment dropdown */
  ENROLL_DROPDOWN_BUTTON: '#enrollDropdown .dropdown-button',
  ENROLL_DROPDOWN_OPTION: (value) => `#enrollDropdown li[data-value="${value}"]`,
  ENROLL_DROPDOWN_LABEL: '#enrollDropdown .dropdown-label',

  /** Sort */
  SORT_SELECT: '#sortBy',

  /** No results */
  NO_DATA_MESSAGE: '#noData',
};

module.exports = { COURSE_TABLE_LOCATORS };
