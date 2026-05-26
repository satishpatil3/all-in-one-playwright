/**
 * @fileoverview Centralized timeout constants.
 * Use these instead of magic numbers in tests and page objects.
 */

const TIMEOUTS = {
  /** Default element visibility wait (ms) */
  DEFAULT: 30_000,

  /** Short wait for fast UI transitions (ms) */
  SHORT: 5_000,

  /** Extra-short wait for immediate checks (ms) */
  XSHORT: 3_000,

  /** Long wait for slow network or heavy pages (ms) */
  LONG: 60_000,

  /** Static pause for auto-suggestion dropdowns (ms) */
  SUGGESTION_WAIT: 1_500,

  /** Wait for dynamic page load after navigation (ms) */
  PAGE_LOAD: 5_000,
};

module.exports = { TIMEOUTS };
