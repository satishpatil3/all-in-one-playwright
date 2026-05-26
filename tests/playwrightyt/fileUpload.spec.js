/**
 * @fileoverview File upload test for The Internet (Herokuapp).
 */

const { test } = require('../../fixtures/index');
const { URLS } = require('../../constants/urls');
const { MESSAGES } = require('../../constants/messages');
const { uploadFile } = require('../../utils/fileUtils');
const { assertText } = require('../../utils/assertionUtils');

test.describe('Herokuapp | File Upload', () => {

  test('Verify file uploaded successfully', async ({ page }) => {
    await page.goto(URLS.HEROKUAPP_UPLOAD);

    await uploadFile(page, '#file-upload', 'demo1.png');
    await page.locator('#file-submit').click();

    await assertText(page.locator('h3'), MESSAGES.UPLOAD.SUCCESS_HEADING);
  });

});
