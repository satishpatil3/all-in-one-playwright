/**
 * @fileoverview Authentication helper — centralizes login/logout flows
 * for all applications under test. Import this in fixtures or tests
 * instead of repeating login steps.
 */

const { PracticeLoginPage } = require('../pages/PracticeLoginPage');
const { HerokuappLoginPage } = require('../pages/HerokuappLoginPage');
const { OrangeHrmLoginPage } = require('../pages/OrangeHrmLoginPage');
const { SwagLabsLoginPage } = require('../pages/SwagLabsLoginPage');
const { ENV } = require('../config/env');

/**
 * Log in to the Practice Test Automation site with default credentials.
 * @param {import('@playwright/test').Page} page
 */
async function loginToPractice(page) {
  const loginPage = new PracticeLoginPage(page);
  await loginPage.goto();
  await loginPage.login(ENV.PRACTICE.USERNAME, ENV.PRACTICE.PASSWORD);
}

/**
 * Log in to The Internet (Herokuapp) with default credentials.
 * @param {import('@playwright/test').Page} page
 */
async function loginToHerokuapp(page) {
  const loginPage = new HerokuappLoginPage(page);
  await loginPage.goto();
  await loginPage.login(ENV.HEROKUAPP.USERNAME, ENV.HEROKUAPP.PASSWORD);
}

/**
 * Log in to OrangeHRM with default credentials.
 * @param {import('@playwright/test').Page} page
 */
async function loginToOrangeHrm(page) {
  const loginPage = new OrangeHrmLoginPage(page);
  await loginPage.goto();
  await loginPage.login(ENV.ORANGEHRM.USERNAME, ENV.ORANGEHRM.PASSWORD);
}

/**
 * Log in to SauceDemo (Swag Labs) with a given username.
 * @param {import('@playwright/test').Page} page
 * @param {string} username
 */
async function loginToSwagLabs(page, username) {
  const loginPage = new SwagLabsLoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, ENV.SAUCEDEMO.PASSWORD);
}

module.exports = {
  loginToPractice,
  loginToHerokuapp,
  loginToOrangeHrm,
  loginToSwagLabs,
};
