/**
 * @fileoverview Page Object for The Internet (Herokuapp) login page.
 */

const { BasePage } = require('../base/BasePage');
const { HEROKUAPP_LOGIN_LOCATORS: L } = require('../locators/herokuappLogin.locators');
const { URLS } = require('../constants/urls');

class HerokuappLoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  /** Navigate to the login page. */
  async goto() {
    await this.navigate(URLS.HEROKUAPP_LOGIN);
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

  /** Click the Logout link on the secure page. */
  async logout() {
    await this.click(L.LOGOUT_LINK);
  }

  /**
   * Get the flash message text.
   * @returns {Promise<string>}
   */
  async getFlashMessage() {
    return await this.getText(L.FLASH_MESSAGE);
  }

  /** @returns {import('@playwright/test').Locator} */
  get flashLocator() {
    return this.page.locator(L.FLASH_MESSAGE);
  }

  /** @returns {import('@playwright/test').Locator} */
  get logoutButtonLocator() {
    return this.page.getByRole('link', { name: L.LOGOUT_BUTTON_ROLE });
  }

  /** @returns {import('@playwright/test').Locator} */
  get loginHeadingLocator() {
    return this.page.getByRole('heading', { name: L.LOGIN_HEADING });
  }
}

module.exports = { HerokuappLoginPage };
