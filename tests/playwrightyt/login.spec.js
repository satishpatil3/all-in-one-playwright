/**
 * @fileoverview OrangeHRM login and logout test.
 */

const { test } = require('../../fixtures/index');
const { OrangeHrmLoginPage } = require('../../pages/OrangeHrmLoginPage');
const { loginToOrangeHrm } = require('../../helpers/authHelper');
const { assertURL } = require('../../utils/assertionUtils');

test.describe('OrangeHRM | Login & Logout', () => {

  test('Valid login navigates to dashboard, logout returns to login', async ({ page }) => {
    await loginToOrangeHrm(page);
    await assertURL(page, /dashboard/);

    const orangePage = new OrangeHrmLoginPage(page);
    await orangePage.logout();

    await assertURL(page, /login/);
  });

});
