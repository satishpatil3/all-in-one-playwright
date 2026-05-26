/**
 * @fileoverview API context factory for Playwright REST API tests.
 */

const { request } = require('@playwright/test');

/**
 * Create a new Playwright API request context.
 * @param {string} baseURL - Base URL for all API requests
 * @returns {Promise<import('@playwright/test').APIRequestContext>}
 */
async function createApiContext(baseURL) {
  return await request.newContext({
    baseURL,
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

module.exports = { createApiContext };
