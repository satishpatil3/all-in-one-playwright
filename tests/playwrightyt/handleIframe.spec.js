/**
 * @fileoverview iFrame interaction test using Oracle Java docs.
 */

const { test } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');

test.describe('Oracle Docs | iFrame Handling', () => {

  test('Click a link inside an iFrame', async ({ page }) => {
    await page.goto(URLS.HEROKUAPP_IFRAME);

    const iframe = page.frameLocator("//frame[@name='packageListFrame']");
    await iframe.locator("//a[text()='java.applet']").click();
  });

});
