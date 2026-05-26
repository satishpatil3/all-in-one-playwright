/**
 * @fileoverview OrangeHRM invalid login error message verification.
 */

const { test } = require('../../fixtures/index');
const { OrangeHrmLoginPage } = require('../../pages/OrangeHrmLoginPage');
const { MESSAGES } = require('../../constants/messages');
const { ORANGEHRM_DATA } = require('../../testData/orangeHrm.data');
const { assertContainsText } = require('../../utils/assertionUtils');
const { logInfo } = require('../../utils/logUtils');

test.describe('OrangeHRM | Error Message Validation', () => {

  test('Invalid credentials show error message', async ({ page }) => {
    const loginPage = new OrangeHrmLoginPage(page);
    await loginPage.goto();

    logInfo(`Viewport: ${JSON.stringify(page.viewportSize())}`);

    await loginPage.login(ORANGEHRM_DATA.invalidUser.username, ORANGEHRM_DATA.invalidUser.password);

    const errorText = await loginPage.getErrorMessage();
    logInfo(`Error message: ${errorText}`);

    await assertContainsText(loginPage.errorLocator, MESSAGES.ORANGEHRM.INVALID_CREDENTIALS_PARTIAL);
  });

});
