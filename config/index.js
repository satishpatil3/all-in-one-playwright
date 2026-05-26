/**
 * @fileoverview Central config entry point.
 * Aggregates environment config, URLs, and timeouts into one import.
 */

const { ENV } = require('./env');
const { URLS } = require('../constants/urls');
const { TIMEOUTS } = require('../constants/timeouts');
const { MESSAGES } = require('../constants/messages');

module.exports = { ENV, URLS, TIMEOUTS, MESSAGES };
