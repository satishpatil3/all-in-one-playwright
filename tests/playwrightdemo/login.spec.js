/**
 * @fileoverview Login tests for Practice Test Automation site.
 * Covers positive login, invalid username, and invalid password scenarios.
 */

const { test } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { PRACTICE_LOGIN_DATA: DATA } = require('../../testData/practiceLogin.data');
const { assertURL, assertVisible, assertText } = require('../../utils/assertionUtils');

test.describe('Practice Login | Core Scenarios', () => {

  test('Positive login succeeds and shows success page', async ({ practiceLoginPage }) => {
    await practiceLoginPage.login(DATA.validUser.username, DATA.validUser.password);

    await assertURL(practiceLoginPage.page, /logged-in-successfully/);
    await assertVisible(practiceLoginPage.congratulationsLocator);
    await assertVisible(practiceLoginPage.logOutLinkLocator);
  });

  test('Invalid username shows error message', async ({ practiceLoginPage }) => {
    await practiceLoginPage.login(DATA.invalidUsername.username, DATA.invalidUsername.password);

    await assertVisible(practiceLoginPage.errorLocator);
    await assertText(practiceLoginPage.errorLocator, MESSAGES.PRACTICE.INVALID_USERNAME);
  });

  test('Invalid password shows error message', async ({ practiceLoginPage }) => {
    await practiceLoginPage.login(DATA.invalidPassword.username, DATA.invalidPassword.password);

    await assertVisible(practiceLoginPage.errorLocator);
    await assertText(practiceLoginPage.errorLocator, MESSAGES.PRACTICE.INVALID_PASSWORD);
  });

});
