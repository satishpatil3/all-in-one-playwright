/**
 * @fileoverview Reusable assertion wrappers for common Playwright checks.
 * Centralizes assertion patterns to keep test files clean.
 */

const { expect } = require('@playwright/test');

/**
 * Assert the page URL matches a pattern.
 * @param {import('@playwright/test').Page} page
 * @param {string|RegExp} pattern
 */
async function assertURL(page, pattern) {
  await expect(page).toHaveURL(pattern);
}

/**
 * Assert the page title matches a pattern.
 * @param {import('@playwright/test').Page} page
 * @param {string|RegExp} pattern
 */
async function assertTitle(page, pattern) {
  await expect(page).toHaveTitle(pattern);
}

/**
 * Assert a locator is visible.
 * @param {import('@playwright/test').Locator} locator
 */
async function assertVisible(locator) {
  await expect(locator).toBeVisible();
}

/**
 * Assert a locator is hidden.
 * @param {import('@playwright/test').Locator} locator
 */
async function assertHidden(locator) {
  await expect(locator).toBeHidden();
}

/**
 * Assert a locator has exact text.
 * @param {import('@playwright/test').Locator} locator
 * @param {string} text
 */
async function assertText(locator, text) {
  await expect(locator).toHaveText(text);
}

/**
 * Assert a locator contains text.
 * @param {import('@playwright/test').Locator} locator
 * @param {string} text
 */
async function assertContainsText(locator, text) {
  await expect(locator).toContainText(text);
}

/**
 * Assert a locator has a specific value (input fields).
 * @param {import('@playwright/test').Locator} locator
 * @param {string} value
 */
async function assertValue(locator, value) {
  await expect(locator).toHaveValue(value);
}

/**
 * Assert a checkbox or radio is checked.
 * @param {import('@playwright/test').Locator} locator
 */
async function assertChecked(locator) {
  await expect(locator).toBeChecked();
}

/**
 * Assert a locator count equals expected.
 * @param {import('@playwright/test').Locator} locator
 * @param {number} count
 */
async function assertCount(locator, count) {
  await expect(locator).toHaveCount(count);
}

/**
 * Assert an array of strings are all sorted A→Z.
 * @param {string[]} items
 */
function assertSortedAscending(items) {
  const sorted = [...items].sort((a, b) => a.localeCompare(b));
  expect(items).toEqual(sorted);
}

/**
 * Assert an array of numbers are in ascending order.
 * @param {number[]} numbers
 */
function assertNumericAscending(numbers) {
  for (let i = 1; i < numbers.length; i++) {
    expect(numbers[i]).toBeGreaterThanOrEqual(numbers[i - 1]);
  }
}

/**
 * Assert all items in an array equal the expected value.
 * @param {string[]} items
 * @param {string} expected
 */
function assertAllEqual(items, expected) {
  expect(items.every((item) => item === expected)).toBe(true);
}

/**
 * Assert all numbers in an array are >= a minimum value.
 * @param {number[]} numbers
 * @param {number} min
 */
function assertAllAtLeast(numbers, min) {
  numbers.forEach((n) => expect(n).toBeGreaterThanOrEqual(min));
}

module.exports = {
  assertURL,
  assertTitle,
  assertVisible,
  assertHidden,
  assertText,
  assertContainsText,
  assertValue,
  assertChecked,
  assertCount,
  assertSortedAscending,
  assertNumericAscending,
  assertAllEqual,
  assertAllAtLeast,
};
