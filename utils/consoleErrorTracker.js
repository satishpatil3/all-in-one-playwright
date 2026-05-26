/**
 * @fileoverview Console error and page error tracking utility.
 * Attach to a page to collect browser-side errors during a test.
 */

const { logError } = require('./logUtils');

/**
 * Start tracking console errors and page errors on a page.
 * Returns the collected errors array — check it in assertions after the test action.
 *
 * @param {import('@playwright/test').Page} page
 * @param {object} [options]
 * @param {string[]} [options.ignorePatterns] - Substrings to filter out (e.g. 'favicon.ico')
 * @returns {string[]} Live array that accumulates errors as they occur
 */
function trackConsoleErrors(page, options = {}) {
  const { ignorePatterns = ['Failed to load resource', 'favicon.ico'] } = options;
  const errors = [];

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (ignorePatterns.some((pattern) => text.includes(pattern))) return;

    const entry = `ConsoleError: ${text}`;
    logError(`[Browser Console] ${entry}`);
    errors.push(entry);
  });

  page.on('pageerror', (error) => {
    const entry = `PageError: ${error.message}`;
    logError(`[Page Error] ${entry}`);
    errors.push(entry);
  });

  return errors;
}

module.exports = { trackConsoleErrors };
