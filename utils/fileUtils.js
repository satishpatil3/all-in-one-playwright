/**
 * @fileoverview File upload, download, read, and write helpers.
 */

const path = require('path');
const fs = require('fs');

/**
 * Set a file input to upload a file from the upload/ directory.
 * @param {import('@playwright/test').Page} page
 * @param {string} inputSelector - CSS selector for the file input element
 * @param {string} fileName - File name relative to the upload/ folder
 */
async function uploadFile(page, inputSelector, fileName) {
  const filePath = path.join(process.cwd(), 'upload', fileName);
  await page.locator(inputSelector).setInputFiles(filePath);
}

/**
 * Read a JSON file and return its parsed content.
 * @param {string} filePath - Absolute or relative path to the JSON file
 * @returns {object}
 */
function readJson(filePath) {
  const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
  return JSON.parse(content);
}

/**
 * Write data to a JSON file.
 * @param {string} filePath - Absolute or relative path
 * @param {object} data
 */
function writeJson(filePath, data) {
  fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { uploadFile, readJson, writeJson };
