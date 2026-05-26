/**
 * @fileoverview BasePage class providing shared Playwright actions.
 * All page object classes must extend this class.
 */

const { TIMEOUTS } = require('../constants/timeouts');

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL.
   * @param {string} url
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Click an element identified by a selector string or Locator.
   * @param {string|import('@playwright/test').Locator} locator
   */
  async click(locator) {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await target.click();
  }

  /**
   * Fill a text input identified by a selector string or Locator.
   * @param {string|import('@playwright/test').Locator} locator
   * @param {string} value
   */
  async fill(locator, value) {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await target.fill(value);
  }

  /**
   * Get the inner text of an element.
   * @param {string|import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  async getText(locator) {
    return await this.page.locator(locator).innerText();
  }

  /**
   * Check whether an element is visible.
   * @param {string|import('@playwright/test').Locator} locator
   * @param {number} [timeout]
   * @returns {Promise<boolean>}
   */
  async isVisible(locator, timeout = TIMEOUTS.SHORT) {
    return await this.page.locator(locator).isVisible({ timeout });
  }

  /**
   * Wait for an element to reach a given state.
   * @param {string|import('@playwright/test').Locator} locator
   * @param {'visible'|'hidden'|'attached'|'detached'} [state='visible']
   * @param {number} [timeout]
   */
  async waitForElement(locator, state = 'visible', timeout = TIMEOUTS.DEFAULT) {
    await this.page.locator(locator).waitFor({ state, timeout });
  }

  /**
   * Wait for the page URL to match a pattern.
   * @param {string|RegExp} urlOrPattern
   */
  async waitForURL(urlOrPattern) {
    await this.page.waitForURL(urlOrPattern);
  }

  /**
   * Scroll an element into view.
   * @param {string|import('@playwright/test').Locator} locator
   */
  async scrollTo(locator) {
    await this.page.locator(locator).scrollIntoViewIfNeeded();
  }

  /**
   * Take a screenshot and return the buffer.
   * @param {string} [name] - Optional filename prefix
   * @returns {Promise<Buffer>}
   */
  async takeScreenshot(name = 'screenshot') {
    return await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
  }

  /**
   * Select an option from a <select> element by value.
   * @param {string|import('@playwright/test').Locator} locator
   * @param {string} value
   */
  async selectOption(locator, value) {
    await this.page.locator(locator).selectOption(value);
  }

  /**
   * Select an option from a <select> element by visible label.
   * @param {string|import('@playwright/test').Locator} locator
   * @param {string} label
   */
  async selectOptionByLabel(locator, label) {
    await this.page.locator(locator).selectOption({ label });
  }

  /**
   * Get the current page URL.
   * @returns {string}
   */
  getURL() {
    return this.page.url();
  }

  /**
   * Reload the current page.
   */
  async reload() {
    await this.page.reload();
  }

  /**
   * Navigate back in browser history.
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Navigate forward in browser history.
   */
  async goForward() {
    await this.page.goForward();
  }

  /**
   * Get all inner texts from a list of matching elements.
   * @param {string|import('@playwright/test').Locator} locator
   * @returns {Promise<string[]>}
   */
  async getAllTexts(locator) {
    return await this.page.locator(locator).allInnerTexts();
  }

  /**
   * Count matching elements.
   * @param {string|import('@playwright/test').Locator} locator
   * @returns {Promise<number>}
   */
  async count(locator) {
    return await this.page.locator(locator).count();
  }
}

module.exports = { BasePage };
