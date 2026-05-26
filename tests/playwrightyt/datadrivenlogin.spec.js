/**
 * @fileoverview Data-driven login test for Herokuapp using testData.
 */

const { test } = require('../../fixtures/index');
const { ENV } = require('../../config/env');
const { assertURL } = require('../../utils/assertionUtils');

test.describe('Herokuapp | Data-Driven Login', () => {

  test('Valid login with credentials from testData', async ({ herokuappLoginPage }) => {
    await herokuappLoginPage.login(ENV.HEROKUAPP.USERNAME, ENV.HEROKUAPP.PASSWORD);
    await assertURL(herokuappLoginPage.page, /secure/);
  });

});
