/**
 * @fileoverview Valid login test for The Internet (Herokuapp).
 */

const { test } = require('../../fixtures/index');
const { ENV } = require('../../config/env');
const { MESSAGES } = require('../../constants/messages');
const { assertURL, assertVisible, assertContainsText } = require('../../utils/assertionUtils');

test.describe('Herokuapp | Valid Login', () => {

  test('Valid login should succeed', async ({ herokuappLoginPage }) => {
    await herokuappLoginPage.loginHeadingLocator.waitFor({ state: 'visible' });

    await herokuappLoginPage.login(ENV.HEROKUAPP.USERNAME, ENV.HEROKUAPP.PASSWORD);

    await assertURL(herokuappLoginPage.page, /secure/);
    await assertContainsText(herokuappLoginPage.flashLocator, MESSAGES.HEROKUAPP.LOGIN_SUCCESS);
    await assertVisible(herokuappLoginPage.logoutButtonLocator);
  });

});
