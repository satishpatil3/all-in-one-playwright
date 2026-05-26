/**
 * @fileoverview Page Object for the Practice Test Automation login page.
 */

const { BasePage } = require('../base/BasePage');
const { PRACTICE_LOGIN_LOCATORS: L } = require('../locators/practiceLogin.locators');
const { URLS } = require('../constants/urls');

class PracticeLoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  /** Navigate to the login page. */
  async goto() {
    await this.navigate(URLS.PRACTICE_LOGIN);
  }

  /**
   * Perform a login action.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.fill(L.USERNAME_INPUT, username);
    await this.fill(L.PASSWORD_INPUT, password);
    await this.click(L.SUBMIT_BUTTON);
  }

  /** Click the Log out link on the success page. */
  async logout() {
    await this.click(L.LOG_OUT_LINK);
  }

  /**
   * Get the error message text.
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.getText(L.ERROR_MESSAGE);
  }

  /** @returns {import('@playwright/test').Locator} */
  get errorLocator() {
    return this.page.locator(L.ERROR_MESSAGE);
  }

  /** @returns {import('@playwright/test').Locator} */
  get successHeadingLocator() {
    return this.page.locator(L.SUCCESS_HEADING);
  }

  /** @returns {import('@playwright/test').Locator} */
  get logOutLinkLocator() {
    return this.page.locator(L.LOG_OUT_LINK);
  }

  /** @returns {import('@playwright/test').Locator} */
  get congratulationsLocator() {
    return this.page.locator(L.CONGRATULATIONS_TEXT);
  }

  /** @returns {import('@playwright/test').Locator} */
  get usernameInputLocator() {
    return this.page.locator(L.USERNAME_INPUT);
  }
}

module.exports = { PracticeLoginPage };
