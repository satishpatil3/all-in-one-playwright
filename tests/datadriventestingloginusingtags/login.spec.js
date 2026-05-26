/**
 * @fileoverview Data-driven login tests for Herokuapp with smoke/regression tags.
 */

const { test } = require('../../fixtures/index');
const { MESSAGES } = require('../../constants/messages');
const { LOGIN_EXPECTATION } = require('../../enums/expectations.enum');
const { herokuappLoginScenarios } = require('../../testData/herokuappLogin.data');
const { assertContainsText } = require('../../utils/assertionUtils');

const expectedMessages = {
  [LOGIN_EXPECTATION.SUCCESS]: MESSAGES.HEROKUAPP.LOGIN_SUCCESS,
  [LOGIN_EXPECTATION.USERNAME_INVALID]: MESSAGES.HEROKUAPP.INVALID_USERNAME,
  [LOGIN_EXPECTATION.PASSWORD_INVALID]: MESSAGES.HEROKUAPP.INVALID_PASSWORD,
};

test.describe('Herokuapp Login | Smoke + Regression', () => {

  for (const data of herokuappLoginScenarios) {

    test(
      `Login | User: ${data.username} | Expected: ${data.expected} ${data.tags}`,
      async ({ herokuappLoginPage }) => {
        await herokuappLoginPage.login(data.username, data.password);
        await assertContainsText(herokuappLoginPage.flashLocator, expectedMessages[data.expected]);
      }
    );

  }

});
