/**
 * @fileoverview Tests login → back → login-again navigation flow.
 */

const { test } = require('../../fixtures/index');
const { PRACTICE_LOGIN_DATA: DATA } = require('../../testData/practiceLogin.data');
const { assertURL, assertVisible } = require('../../utils/assertionUtils');

test.describe('Practice Login | Back Navigation', () => {

  test('Login → Back → Login again shows login page only', async ({ practiceLoginPage }) => {
    await practiceLoginPage.login(DATA.validUser.username, DATA.validUser.password);
    await assertURL(practiceLoginPage.page, /logged-in-successfully/);
    await assertVisible(practiceLoginPage.congratulationsLocator);

    await practiceLoginPage.goBack();
    await assertURL(practiceLoginPage.page, /practice-test-login/);
    await assertVisible(practiceLoginPage.usernameInputLocator);

    await practiceLoginPage.login(DATA.validUser.username, DATA.validUser.password);
    await assertURL(practiceLoginPage.page, /logged-in-successfully/);
  });

});
