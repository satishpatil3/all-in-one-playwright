/**
 * @fileoverview Centralized expected UI message strings.
 * Keeps assertions DRY and easy to update when copy changes.
 */

const MESSAGES = {
  /** Practice Test Automation site */
  PRACTICE: {
    LOGIN_SUCCESS_HEADING: 'Logged In Successfully',
    CONGRATULATIONS: 'Congratulations',
    LOG_OUT_LINK: 'Log out',
    INVALID_USERNAME: 'Your username is invalid!',
    INVALID_PASSWORD: 'Your password is invalid!',
  },

  /** The Internet (Herokuapp) */
  HEROKUAPP: {
    LOGIN_SUCCESS: 'You logged into a secure area!',
    LOGOUT_REDIRECT: 'You must login to view the secure area!',
    INVALID_USERNAME: 'Your username is invalid!',
    INVALID_PASSWORD: 'Your password is invalid!',
  },

  /** SauceDemo (Swag Labs) */
  SAUCEDEMO: {
    PRODUCTS_TITLE: 'Products',
    LOCKED_OUT: 'locked out',
  },

  /** OrangeHRM */
  ORANGEHRM: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    INVALID_CREDENTIALS_PARTIAL: 'Invalid',
  },

  /** Booking API */
  BOOKING: {
    UPDATED_NAME: 'UpdatedName',
  },

  /** Alerts */
  ALERTS: {
    JS_ALERT: 'I am a JS Alert',
    JS_CONFIRM: 'I am a JS Confirm',
    JS_PROMPT: 'I am a JS prompt',
    PROMPT_INPUT: 'satish patil',
  },

  /** File upload */
  UPLOAD: {
    SUCCESS_HEADING: 'File Uploaded!',
  },

  /** Table */
  TABLE: {
    NO_RESULTS: 'No matching courses.',
    RESET_BUTTON: 'Reset filters',
    SORT_ENROLLMENTS: 'Enrollments',
    SORT_COURSE_NAME: 'Course Name',
    ENROLL_DROPDOWN_ANY: 'Any',
  },

  /** Exceptions demo page */
  EXCEPTIONS: {
    ROW2_SAVED: 'Row 2 was saved',
    ROW2_INPUT_VALUE: 'Wadapav',
    ROW1_INPUT_VALUE: 'Pizza',
  },

  /** New Window */
  WINDOWS: {
    NEW_WINDOW_HEADING: 'New Window',
  },
};

module.exports = { MESSAGES };
