/**
 * @fileoverview Structured logging utilities for test output.
 */

/**
 * Log an informational message with a timestamp.
 * @param {string} message
 */
function logInfo(message) {
  console.log(`[INFO]  [${new Date().toISOString()}] ${message}`);
}

/**
 * Log a warning message.
 * @param {string} message
 */
function logWarn(message) {
  console.warn(`[WARN]  [${new Date().toISOString()}] ${message}`);
}

/**
 * Log an error message.
 * @param {string} message
 */
function logError(message) {
  console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
}

/**
 * Log a step label (useful for marking test steps in output).
 * @param {string} step
 */
function logStep(step) {
  console.log(`[STEP]  ${step}`);
}

module.exports = { logInfo, logWarn, logError, logStep };
