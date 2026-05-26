/**
 * @fileoverview Page Object for the SauceDemo (Swag Labs) login page.
 * Replaces the original SwagLabsLoginPage with BasePage extension and
 * locators separated into locators/swagLabs.locators.js.
 */

const { BasePage } = require('../base/BasePage');
const { SWAG_LABS_LOCATORS: L } = require('../locators/swagLabs.locators');
const { URLS } = require('../constants/urls');

class SwagLabsLoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  /** Navigate to the SauceDemo login page. */
  async goto() {
    await this.navigate(URLS.SAUCEDEMO);
  }

  /**
   * Perform a login action.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.fill(L.USERNAME_INPUT, username);
    await this.fill(L.PASSWORD_INPUT, password);
    await this.click(L.LOGIN_BUTTON);
  }

  /**
   * Get all product image src attributes from the inventory page.
   * @returns {Promise<string[]>}
   */
  async getProductImageSrcs() {
    return await this.page.$$eval(
      L.PRODUCT_IMAGES,
      (imgs) => imgs.map((img) => img.getAttribute('src'))
    );
  }

  /** @returns {import('@playwright/test').Locator} */
  get errorLocator() {
    return this.page.locator(L.ERROR_MESSAGE);
  }

  /** @returns {import('@playwright/test').Locator} */
  get productTitleLocator() {
    return this.page.locator(L.PRODUCT_TITLE);
  }
}

module.exports = { SwagLabsLoginPage };
