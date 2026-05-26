/**
 * @fileoverview Centralized URL constants for all applications under test.
 * Import from this file instead of hardcoding URLs in tests or page objects.
 */

const URLS = {
  /** Practice Test Automation login site */
  PRACTICE_LOGIN: 'https://practicetestautomation.com/practice-test-login/',
  PRACTICE_LOGGED_IN: 'https://practicetestautomation.com/logged-in-successfully/',
  PRACTICE_TABLE: 'https://practicetestautomation.com/practice-test-table/',
  PRACTICE_EXCEPTIONS: 'https://practicetestautomation.com/practice-test-exceptions/',

  /** The Internet (Herokuapp) */
  HEROKUAPP_LOGIN: 'https://the-internet.herokuapp.com/login',
  HEROKUAPP_SECURE: 'https://the-internet.herokuapp.com/secure',
  HEROKUAPP_UPLOAD: 'https://the-internet.herokuapp.com/upload',
  HEROKUAPP_ALERTS: 'https://the-internet.herokuapp.com/javascript_alerts',
  HEROKUAPP_WINDOWS: 'https://the-internet.herokuapp.com/windows',
  HEROKUAPP_DROPDOWN: 'https://the-internet.herokuapp.com/dropdown',
  HEROKUAPP_KEY_PRESSES: 'https://the-internet.herokuapp.com/key_presses',
  HEROKUAPP_JS_ERROR: 'https://the-internet.herokuapp.com/javascript_error',
  HEROKUAPP_IFRAME: 'https://docs.oracle.com/javase/8/docs/api/',

  /** OrangeHRM */
  ORANGEHRM_LOGIN: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

  /** SauceDemo (Swag Labs) */
  SAUCEDEMO: 'https://www.saucedemo.com/',

  /** Restful Booker API */
  RESTFUL_BOOKER_API: 'https://restful-booker.herokuapp.com',

  /** JSONPlaceholder API */
  JSONPLACEHOLDER_API: 'https://jsonplaceholder.typicode.com',

  /** Playwright docs */
  PLAYWRIGHT_DOCS: 'https://playwright.dev/',

  /** Google */
  GOOGLE: 'https://www.google.com/',
};

module.exports = { URLS };
