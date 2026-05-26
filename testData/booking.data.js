/**
 * @fileoverview Test data for Restful Booker API tests.
 * Consolidates booking.valid.json and booking.boundary.json into one place.
 */

const { HTTP_STATUS } = require('../enums/status.enum');

/**
 * A single valid booking payload for CRUD flow tests.
 * @type {object}
 */
const validBooking = {
  firstname: 'Prajwal',
  lastname: 'Reddy',
  totalprice: 1500,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-05-01',
    checkout: '2025-05-10',
  },
  additionalneeds: 'Breakfast',
};

/**
 * Boundary value test cases for booking creation.
 * @type {Array<{case: string, payload: object, expectedStatus: number}>}
 */
const boundaryCases = [
  {
    case: 'Minimum values',
    payload: {
      firstname: 'A',
      lastname: 'B',
      totalprice: 1,
      depositpaid: true,
      bookingdates: { checkin: '2025-01-01', checkout: '2025-01-02' },
    },
    expectedStatus: HTTP_STATUS.OK,
  },
  {
    case: 'Maximum values',
    payload: {
      firstname: 'VeryLongFirstnameVeryLongFirstname',
      lastname: 'VeryLongLastname',
      totalprice: 999999,
      depositpaid: false,
      bookingdates: { checkin: '2025-01-01', checkout: '2025-12-31' },
    },
    expectedStatus: HTTP_STATUS.OK,
  },
  {
    case: 'Only firstname provided',
    payload: { firstname: 'Satish' },
    expectedStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  {
    case: 'Only lastname provided',
    payload: { lastname: 'Patil' },
    expectedStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  {
    case: 'Total price as number (valid)',
    payload: {
      firstname: 'Satish',
      lastname: 'Patil',
      totalprice: 1000,
      depositpaid: true,
      bookingdates: { checkin: '2025-06-01', checkout: '2025-06-05' },
    },
    expectedStatus: HTTP_STATUS.OK,
  },
  {
    case: 'Total price as string',
    payload: {
      firstname: 'Satish',
      lastname: 'Patil',
      totalprice: '1000',
      depositpaid: true,
      bookingdates: { checkin: '2025-06-01', checkout: '2025-06-05' },
    },
    expectedStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  {
    case: 'Firstname and price only',
    payload: { firstname: 'Satish', totalprice: 800 },
    expectedStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  {
    case: 'Lastname and price only',
    payload: { lastname: 'Patil', totalprice: 900 },
    expectedStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  {
    case: 'Invalid price - alphabetic',
    payload: {
      firstname: 'Satish',
      lastname: 'Patil',
      totalprice: 'abc',
      depositpaid: true,
      bookingdates: { checkin: '2025-06-01', checkout: '2025-06-05' },
    },
    expectedStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
];

module.exports = { validBooking, boundaryCases };
