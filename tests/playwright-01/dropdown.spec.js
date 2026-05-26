/**
 * @fileoverview Dropdown interaction tests for The Internet (Herokuapp).
 */

const { test } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { assertText } = require('../../utils/assertionUtils');
const { logInfo } = require('../../utils/logUtils');

test.describe('Herokuapp | Dropdown', () => {

  test('Extract dropdown heading and select options', async ({ page }) => {
    await page.goto(URLS.HEROKUAPP_DROPDOWN);

    const heading = page.locator('h3');
    const headingText = await heading.innerText();
    logInfo(`Dropdown Page Heading: ${headingText}`);

    await assertText(heading, 'Dropdown List');

    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption('1');
    await dropdown.selectOption('2');
  });

});
