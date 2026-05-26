/**
 * @fileoverview Expectation type enumerations for data-driven login tests.
 */

const LOGIN_EXPECTATION = {
  UNIQUE_IMAGES: 'uniqueImages',
  SAME_IMAGES: 'sameImages',
  LOGIN_BLOCKED: 'loginBlocked',
  SUCCESS: 'success',
  USERNAME_INVALID: 'usernameInvalid',
  PASSWORD_INVALID: 'passwordInvalid',
};

module.exports = { LOGIN_EXPECTATION };
