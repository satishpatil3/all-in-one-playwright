/**
 * @fileoverview Page Object for the Practice Test Automation exceptions demo page.
 */

const { BasePage } = require('../base/BasePage');
const { EXCEPTIONS_LOCATORS: L } = require('../locators/exceptions.locators');
const { URLS } = require('../constants/urls');

class ExceptionsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  /** Navigate to the exceptions demo page. */
  async goto() {
    await this.navigate(URLS.PRACTICE_EXCEPTIONS);
  }

  /** Click the Add button to reveal row 2. */
  async clickAdd() {
    await this.click(L.ADD_BUTTON);
  }

  /** Click the Edit button to enable row 1 input. */
  async clickEdit() {
    await this.click(L.EDIT_BUTTON);
  }

  /**
   * Wait for row 2 input to become visible, then fill it.
   * @param {string} value
   */
  async fillRow2(value) {
    await this.waitForElement(L.ROW2_INPUT, 'visible');
    await this.fill(L.ROW2_INPUT, value);
  }

  /**
   * Clear and fill row 1 input (requires edit mode).
   * @param {string} value
   */
  async fillRow1(value) {
    await this.page.locator(L.ROW1_INPUT).clear();
    await this.fill(L.ROW1_INPUT, value);
  }

  /** Click the Save button for row 2 (second Save button). */
  async saveRow2() {
    await this.page.locator(L.SAVE_BUTTON_ROW2).nth(1).click();
  }

  /** @returns {import('@playwright/test').Locator} */
  get confirmationLocator() {
    return this.page.locator(L.CONFIRMATION);
  }

  /** @returns {import('@playwright/test').Locator} */
  get instructionsLocator() {
    return this.page.locator(L.INSTRUCTIONS);
  }

  /** @returns {import('@playwright/test').Locator} */
  get row1InputLocator() {
    return this.page.locator(L.ROW1_INPUT);
  }

  /** @returns {import('@playwright/test').Locator} */
  get row2InputLocator() {
    return this.page.locator(L.ROW2_INPUT);
  }
}

module.exports = { ExceptionsPage };
