/**
 * @fileoverview Tests login → back → forward navigation keeps session alive.
 */

const { test } = require('../../fixtures/index');
const { PRACTICE_LOGIN_DATA: DATA } = require('../../testData/practiceLogin.data');
const { assertURL, assertVisible } = require('../../utils/assertionUtils');

test.describe('Practice Login | Forward Navigation', () => {

  test('Login → Back → Forward shows logged-in page when session exists', async ({ practiceLoginPage }) => {
    await practiceLoginPage.login(DATA.validUser.username, DATA.validUser.password);
    await assertURL(practiceLoginPage.page, /logged-in-successfully/);

    await practiceLoginPage.goBack();
    await assertURL(practiceLoginPage.page, /practice-test-login/);

    await practiceLoginPage.goForward();
    await assertURL(practiceLoginPage.page, /logged-in-successfully/);
    await assertVisible(practiceLoginPage.logOutLinkLocator);
  });

});
