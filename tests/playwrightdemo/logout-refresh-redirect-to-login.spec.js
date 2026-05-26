/**
 * @fileoverview Tests that after logout + back + refresh, the server
 * redirects to login with an appropriate error message.
 */

const { test } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { HEROKUAPP_LOGIN_DATA: DATA } = require('../../testData/herokuappLogin.data');
const { assertURL, assertVisible, assertContainsText } = require('../../utils/assertionUtils');

test.describe('Herokuapp Login | Logout Redirect', () => {

  test('After logout, refresh should redirect to login with error message', async ({ herokuappLoginPage }) => {
    await herokuappLoginPage.login(DATA.validUser.username, DATA.validUser.password);
    await assertURL(herokuappLoginPage.page, /secure/);

    await herokuappLoginPage.logout();
    await herokuappLoginPage.goBack();
    await herokuappLoginPage.reload();

    await assertURL(herokuappLoginPage.page, /login/);
    await assertVisible(herokuappLoginPage.flashLocator);
    await assertContainsText(herokuappLoginPage.flashLocator, MESSAGES.HEROKUAPP.LOGOUT_REDIRECT);
  });

});
