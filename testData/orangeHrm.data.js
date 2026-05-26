/**
 * @fileoverview Test data for OrangeHRM tests.
 */

const { ENV } = require('../config/env');

const ORANGEHRM_DATA = {
  validUser: {
    username: ENV.ORANGEHRM.USERNAME,
    password: ENV.ORANGEHRM.PASSWORD,
  },
  /** Intentionally invalid credentials to trigger the error message */
  invalidUser: {
    username: ' Admin',
    password: 'sat89',
  },
};

module.exports = { ORANGEHRM_DATA };
