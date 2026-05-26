/**
 * @fileoverview Page Object for the OrangeHRM login page.
 */

const { BasePage } = require('../base/BasePage');
const { ORANGEHRM_LOCATORS: L } = require('../locators/orangeHrm.locators');
const { URLS } = require('../constants/urls');

class OrangeHrmLoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  /** Navigate to the OrangeHRM login page. */
  async goto() {
    await this.navigate(URLS.ORANGEHRM_LOGIN);
  }

  /**
   * Perform a login action.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.fill(this.page.getByPlaceholder('Username'), username);
    await this.fill(L.PASSWORD_INPUT, password);
    await this.click(L.LOGIN_BUTTON);
  }

  /** Click the profile picture and then Logout. */
  async logout() {
    await this.page.getByAltText('profile picture').first().click();
    await this.click(L.LOGOUT_MENU_ITEM);
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
}

module.exports = { OrangeHrmLoginPage };
