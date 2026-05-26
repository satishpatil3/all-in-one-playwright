/**
 * @fileoverview SQL injection tests for login forms.
 * Verifies that injection payloads are rejected on both practice sites.
 */

const { test } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { PRACTICE_LOGIN_DATA: DATA } = require('../../testData/practiceLogin.data');
const { HEROKUAPP_LOGIN_DATA: HEROKU_DATA } = require('../../testData/herokuappLogin.data');
const { assertVisible, assertContainsText, assertURL } = require('../../utils/assertionUtils');

test.describe('SQL Injection | Login Security', () => {

  test('SQL injection should not bypass login on Practice site', async ({ practiceLoginPage }) => {
    await practiceLoginPage.login(DATA.sqlInjection.username, DATA.sqlInjection.password);

    await assertVisible(practiceLoginPage.errorLocator);
    await assertContainsText(practiceLoginPage.errorLocator, MESSAGES.PRACTICE.INVALID_USERNAME);
    await assertURL(practiceLoginPage.page, /^(?!.*logged-in-successfully).*/);
  });

  test('SQL injection should fail on Herokuapp login', async ({ herokuappLoginPage }) => {
    await herokuappLoginPage.login(HEROKU_DATA.sqlInjection.username, HEROKU_DATA.sqlInjection.password);

    await assertVisible(herokuappLoginPage.flashLocator);
    await assertContainsText(herokuappLoginPage.flashLocator, MESSAGES.HEROKUAPP.INVALID_USERNAME);
    await assertURL(herokuappLoginPage.page, /^(?!.*secure).*/);
  });

});
