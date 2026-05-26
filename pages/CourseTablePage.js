/**
 * @fileoverview Page Object for the Practice Test Automation course table page.
 */

const { BasePage } = require('../base/BasePage');
const { COURSE_TABLE_LOCATORS: L } = require('../locators/courseTable.locators');
const { URLS } = require('../constants/urls');

class CourseTablePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  /** Navigate to the course table page. */
  async goto() {
    await this.navigate(URLS.PRACTICE_TABLE);
  }

  /**
   * Select a language radio button filter.
   * @param {string} language - e.g. 'Java', 'Python', 'Any'
   */
  async filterByLanguage(language) {
    await this.click(L.LANGUAGE_FILTER(language));
  }

  /**
   * Toggle a level checkbox filter.
   * @param {string} level - e.g. 'Beginner', 'Intermediate', 'Advanced'
   */
  async toggleLevelFilter(level) {
    await this.click(L.LEVEL_FILTER(level));
  }

  /**
   * Set the minimum enrollments dropdown.
   * @param {string|number} value - e.g. '10000'
   */
  async setMinEnrollments(value) {
    await this.click(L.ENROLL_DROPDOWN_BUTTON);
    await this.click(L.ENROLL_DROPDOWN_OPTION(String(value)));
  }

  /**
   * Set the sort-by dropdown.
   * @param {string} label - e.g. 'Enrollments', 'Course Name'
   */
  async sortBy(label) {
    await this.selectOptionByLabel(L.SORT_SELECT, label);
  }

  /** Click the Reset filters button. */
  async resetFilters() {
    await this.page.getByRole('button', { name: 'Reset filters' }).click();
  }

  /**
   * Get all visible row language values.
   * @returns {Promise<string[]>}
   */
  async getVisibleLanguages() {
    return await this.page
      .locator(L.VISIBLE_ROWS)
      .locator(L.LANGUAGE_CELL)
      .allInnerTexts();
  }

  /**
   * Get all visible row level values.
   * @returns {Promise<string[]>}
   */
  async getVisibleLevels() {
    return await this.page
      .locator(L.VISIBLE_ROWS)
      .locator(L.LEVEL_CELL)
      .allInnerTexts();
  }

  /**
   * Get all visible row enrollment values as numbers.
   * @returns {Promise<number[]>}
   */
  async getVisibleEnrollments() {
    const texts = await this.page
      .locator(L.VISIBLE_ROWS)
      .locator(L.ENROLLMENTS_CELL)
      .allInnerTexts();
    return texts.map((t) => Number(t.replace(/,/g, '')));
  }

  /**
   * Get all visible row course name values (normalized lowercase).
   * @returns {Promise<string[]>}
   */
  async getVisibleCourseNames() {
    const texts = await this.page
      .locator(L.VISIBLE_ROWS)
      .locator(L.COURSE_NAME_CELL)
      .allInnerTexts();
    return texts.map((t) => t.trim().toLowerCase());
  }

  /** @returns {import('@playwright/test').Locator} */
  get visibleRowsLocator() {
    return this.page.locator(L.VISIBLE_ROWS);
  }

  /** @returns {import('@playwright/test').Locator} */
  get hiddenRowsLocator() {
    return this.page.locator(L.HIDDEN_ROWS);
  }

  /** @returns {import('@playwright/test').Locator} */
  get noDataLocator() {
    return this.page.locator(L.NO_DATA_MESSAGE);
  }

  /** @returns {import('@playwright/test').Locator} */
  get resetButtonLocator() {
    return this.page.getByRole('button', { name: 'Reset filters' });
  }

  /** @returns {import('@playwright/test').Locator} */
  get enrollDropdownLabelLocator() {
    return this.page.locator(L.ENROLL_DROPDOWN_LABEL);
  }

  /**
   * Get all level checkboxes.
   * @returns {import('@playwright/test').Locator}
   */
  get levelCheckboxesLocator() {
    return this.page.locator(L.LEVEL_CHECKBOXES);
  }

  /**
   * Get the Language=Any radio locator.
   * @returns {import('@playwright/test').Locator}
   */
  get languageAnyLocator() {
    return this.page.locator(L.LANGUAGE_FILTER('Any'));
  }
}

module.exports = { CourseTablePage };
