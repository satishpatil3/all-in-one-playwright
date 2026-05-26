/**
 * @fileoverview Authentication service for the Restful Booker API.
 */

const { ENV } = require('../config/env');

/**
 * Obtain a Restful Booker auth token.
 * @param {ApiClient} apiClient
 * @returns {Promise<string>} The auth token string
 */
async function getAuthToken(apiClient) {
  const response = await apiClient.post({
    endpoint: '/auth',
    data: {
      username: ENV.BOOKING_API.USERNAME,
      password: ENV.BOOKING_API.PASSWORD,
    },
  });

  const body = await response.json();
  return body.token;
}

module.exports = { getAuthToken };
