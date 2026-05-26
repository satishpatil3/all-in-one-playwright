/**
 * @fileoverview Tests browser back-button behavior after logout.
 * Documents a known session-invalidation gap on the practice site.
 */

const { test } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { PRACTICE_LOGIN_DATA: DATA } = require('../../testData/practiceLogin.data');
const { assertURL, assertText } = require('../../utils/assertionUtils');

test.describe('Practice Login | Logout & Back Navigation', () => {

  test('TC-03: After logout, browser back should not restore login session', async ({ practiceLoginPage }) => {
    await practiceLoginPage.login(DATA.validUser.username, DATA.validUser.password);
    await assertText(practiceLoginPage.successHeadingLocator, MESSAGES.PRACTICE.LOGIN_SUCCESS_HEADING);

    await practiceLoginPage.logout();
    await assertURL(practiceLoginPage.page, /practice-test-login/);

    await practiceLoginPage.goBack();

    // Known application bug: session is not invalidated on logout.
    // Browser back loads the cached protected page.
    // In a real app this must redirect to login — documented here as a known gap.
    await assertURL(practiceLoginPage.page, /logged-in-successfully/);
  });

});
