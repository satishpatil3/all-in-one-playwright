/**
 * @fileoverview Test data for The Internet (Herokuapp) login tests.
 */

const { ENV } = require('../config/env');
const { LOGIN_EXPECTATION } = require('../enums/expectations.enum');

const HEROKUAPP_LOGIN_DATA = {
  validUser: {
    username: ENV.HEROKUAPP.USERNAME,
    password: ENV.HEROKUAPP.PASSWORD,
  },
  sqlInjection: {
    username: `' OR '1'='1' --+`,
    password: 'anything',
  },
};

/**
 * Data-driven login scenarios for Herokuapp.
 * @type {Array<{username: string, password: string, expected: string, tags: string}>}
 */
const herokuappLoginScenarios = [
  {
    username: ENV.HEROKUAPP.USERNAME,
    password: ENV.HEROKUAPP.PASSWORD,
    expected: LOGIN_EXPECTATION.SUCCESS,
    tags: '@smoke @regression',
  },
  {
    username: 'wronguser',
    password: ENV.HEROKUAPP.PASSWORD,
    expected: LOGIN_EXPECTATION.USERNAME_INVALID,
    tags: '@regression',
  },
  {
    username: ENV.HEROKUAPP.USERNAME,
    password: 'wrongpassword',
    expected: LOGIN_EXPECTATION.PASSWORD_INVALID,
    tags: '@regression',
  },
];

module.exports = { HEROKUAPP_LOGIN_DATA, herokuappLoginScenarios };
