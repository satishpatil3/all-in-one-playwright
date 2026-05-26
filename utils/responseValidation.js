/**
 * @fileoverview Reusable API response validation helpers.
 */

const { expect } = require('@playwright/test');
const { logInfo, logError } = require('./logUtils');

/**
 * Validate HTTP status code of the response.
 * @param {import('@playwright/test').APIResponse} response
 * @param {number} expectedStatus
 */
function validateStatusCode(response, expectedStatus) {
  try {
    expect(response.status()).toBe(expectedStatus);
    logInfo(`Assertion Passed: Response status is ${expectedStatus}`);
  } catch (error) {
    logError(`Assertion Failed: Expected status ${expectedStatus}, but got ${response.status()}`);
    throw error;
  }
}

/**
 * Validate that response contains expected JSON properties or matches a schema/sub-object.
 * @param {import('@playwright/test').APIResponse} response
 * @param {object} expectedData
 */
async function validateJsonBody(response, expectedData) {
  const actualBody = await response.json();
  try {
    expect(actualBody).toMatchObject(expectedData);
    logInfo(`Assertion Passed: Response body matches expected object structure`);
  } catch (error) {
    logError(`Assertion Failed: Response body does not match expected structure. Got: ${JSON.stringify(actualBody)}`);
    throw error;
  }
}

/**
 * Validate a specific header value.
 * @param {import('@playwright/test').APIResponse} response
 * @param {string} headerName
 * @param {string} expectedValue
 */
function validateHeader(response, headerName, expectedValue) {
  const actualValue = response.headers()[headerName.toLowerCase()];
  try {
    expect(actualValue).toBe(expectedValue);
    logInfo(`Assertion Passed: Header '${headerName}' has value '${expectedValue}'`);
  } catch (error) {
    logError(`Assertion Failed: Expected header '${headerName}' to be '${expectedValue}', but got '${actualValue}'`);
    throw error;
  }
}

/**
 * Validate response performance (duration in ms).
 * @param {import('@playwright/test').APIResponse} response
 * @param {number} maxDurationMs
 */
function validateResponseTime(response, maxDurationMs) {
  const duration = response.durationMs;
  if (duration === undefined) {
    logInfo(`Warning: Response time is not recorded on this response object.`);
    return;
  }
  try {
    expect(duration).toBeLessThan(maxDurationMs);
    logInfo(`Assertion Passed: Response time of ${duration}ms is less than limit ${maxDurationMs}ms`);
  } catch (error) {
    logError(`Assertion Failed: Response time was ${duration}ms, exceeding limit of ${maxDurationMs}ms`);
    throw error;
  }
}

module.exports = {
  validateStatusCode,
  validateJsonBody,
  validateHeader,
  validateResponseTime,
};
