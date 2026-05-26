/**
 * @fileoverview JavaScript alert, confirm, and prompt handling tests.
 */

const { test, expect } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { ALERT_SCENARIOS } = require('../../testData/alerts.data');

test.describe('Herokuapp | JavaScript Dialogs', () => {

  for (const scenario of ALERT_SCENARIOS) {

    test(scenario.testName, async ({ page }) => {
      await page.goto(URLS.HEROKUAPP_ALERTS);

      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toContain(scenario.dialogType);
        expect(dialog.message()).toContain(scenario.expectedMessage);

        if (scenario.promptInput !== undefined) {
          await dialog.accept(scenario.promptInput);
        } else {
          await dialog.accept();
        }
      });

      await page.locator(`//button[text()='${scenario.buttonText}']`).click();
    });

  }

});
