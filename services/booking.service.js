/**
 * @fileoverview Booking API service wrapping all CRUD operations
 * for the Restful Booker API.
 */

class BookingService {
  /**
   * @param {ApiClient} apiClient
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Create a new booking.
   * @param {object} payload
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  createBooking(payload) {
    return this.apiClient.post({
      endpoint: '/booking',
      data: payload,
    });
  }

  /**
   * Get a booking by ID.
   * @param {number|string} id
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  getBookingById(id) {
    return this.apiClient.get({
      endpoint: `/booking/${id}`,
    });
  }

  /**
   * Get all bookings.
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  getAllBookings() {
    return this.apiClient.get({
      endpoint: '/booking',
    });
  }

  /**
   * Fully update a booking (PUT).
   * @param {number|string} id
   * @param {object} payload
   * @param {string} token - Auth token
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  updateBooking(id, payload, token) {
    return this.apiClient.put({
      endpoint: `/booking/${id}`,
      data: payload,
      token: `token=${token}`,
    });
  }

  /**
   * Partially update a booking (PATCH).
   * @param {number|string} id
   * @param {object} payload
   * @param {string} token - Auth token
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  patchBooking(id, payload, token) {
    return this.apiClient.patch({
      endpoint: `/booking/${id}`,
      data: payload,
      token: `token=${token}`,
    });
  }

  /**
   * Delete a booking.
   * @param {number|string} id
   * @param {string} token - Auth token
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  deleteBooking(id, token) {
    return this.apiClient.delete({
      endpoint: `/booking/${id}`,
      token: `token=${token}`,
    });
  }
}

module.exports = { BookingService };
