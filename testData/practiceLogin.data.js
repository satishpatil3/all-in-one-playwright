/**
 * @fileoverview Test data for Practice Test Automation login tests.
 */

const { ENV } = require('../config/env');

const PRACTICE_LOGIN_DATA = {
  validUser: {
    username: ENV.PRACTICE.USERNAME,
    password: ENV.PRACTICE.PASSWORD,
  },
  invalidUsername: {
    username: 'incorrectUser',
    password: ENV.PRACTICE.PASSWORD,
  },
  invalidPassword: {
    username: ENV.PRACTICE.USERNAME,
    password: 'incorrectPassword',
  },
  sqlInjection: {
    username: `' OR '1'='1' --+`,
    password: 'anything',
  },
};

module.exports = { PRACTICE_LOGIN_DATA };
