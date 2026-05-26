/**
 * @fileoverview Test data for JavaScript alert/confirm/prompt tests.
 */

const { MESSAGES } = require('../constants/messages');

const ALERT_SCENARIOS = [
  {
    testName: 'handle the alert',
    buttonText: 'Click for JS Alert',
    dialogType: 'alert',
    expectedMessage: MESSAGES.ALERTS.JS_ALERT,
    action: 'accept',
  },
  {
    testName: 'handle the confirm',
    buttonText: 'Click for JS Confirm',
    dialogType: 'confirm',
    expectedMessage: MESSAGES.ALERTS.JS_CONFIRM,
    action: 'accept',
  },
  {
    testName: 'handle the prompt',
    buttonText: 'Click for JS Prompt',
    dialogType: 'prompt',
    expectedMessage: MESSAGES.ALERTS.JS_PROMPT,
    action: 'accept',
    promptInput: MESSAGES.ALERTS.PROMPT_INPUT,
  },
];

module.exports = { ALERT_SCENARIOS };
