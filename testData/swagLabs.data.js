/**
 * @fileoverview Test data for SauceDemo (Swag Labs) login tests.
 */

const { LOGIN_EXPECTATION } = require('../enums/expectations.enum');

/**
 * Role-based user scenarios for Swag Labs.
 * @type {Array<{testName: string, role: string, username: string, expectation: string}>}
 */
const swagLabsUsers = [
  {
    testName: 'STANDARD USER | Products should have unique images',
    role: 'standard',
    username: 'standard_user',
    expectation: LOGIN_EXPECTATION.UNIQUE_IMAGES,
  },
  {
    testName: 'PROBLEM USER | All product images should be identical (bug)',
    role: 'problem',
    username: 'problem_user',
    expectation: LOGIN_EXPECTATION.SAME_IMAGES,
  },
  {
    testName: 'LOCKED USER | Login should be blocked',
    role: 'locked',
    username: 'locked_out_user',
    expectation: LOGIN_EXPECTATION.LOGIN_BLOCKED,
  },
];

module.exports = { swagLabsUsers };
