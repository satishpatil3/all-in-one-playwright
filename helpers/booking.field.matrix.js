/**
 * @fileoverview Field-level boundary test matrix for the Booking API.
 * Provides a base booking payload and a matrix of per-field test cases.
 */

/**
 * Returns a fresh valid base booking payload.
 * @returns {object}
 */
function baseBooking() {
  return {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-02-01',
      checkout: '2025-02-05',
    },
    additionalneeds: 'Lunch',
  };
}

/**
 * Matrix of field-level test cases.
 * Each entry defines a field name and an array of cases with
 * a label, override value, and expected HTTP status.
 *
 * @type {Array<{field: string, cases: Array<{label: string, value: *, expectedStatus: number}>}>}
 */
const fieldTestMatrix = [
  {
    field: 'firstname',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: 400 },
      { label: 'null', value: null, expectedStatus: 400 },
      { label: 'empty', value: '', expectedStatus: 400 },
      { label: 'wrong type - number', value: 123, expectedStatus: 400 },
      { label: '1 char', value: 'A', expectedStatus: 200 },
      { label: 'valid', value: 'Jim', expectedStatus: 200 },
      { label: 'too long', value: 'THISNAMEISTOOLONG', expectedStatus: 400 },
    ],
  },
  {
    field: 'lastname',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: 400 },
      { label: 'null', value: null, expectedStatus: 400 },
      { label: 'empty', value: '', expectedStatus: 400 },
      { label: 'wrong type - number', value: 456, expectedStatus: 400 },
      { label: 'valid', value: 'Brown', expectedStatus: 200 },
      { label: 'too long', value: 'THISLASTNAMEISTOOLONGGG', expectedStatus: 400 },
    ],
  },
  {
    field: 'totalprice',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: 400 },
      { label: 'null', value: null, expectedStatus: 400 },
      { label: 'string', value: 'ABC', expectedStatus: 400 },
      { label: 'zero', value: 0, expectedStatus: 200 },
      { label: 'positive', value: 200, expectedStatus: 200 },
      { label: 'negative', value: -10, expectedStatus: 400 },
    ],
  },
  {
    field: 'depositpaid',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: 400 },
      { label: 'null', value: null, expectedStatus: 400 },
      { label: 'string', value: 'yes', expectedStatus: 400 },
      { label: 'true', value: true, expectedStatus: 200 },
      { label: 'false', value: false, expectedStatus: 200 },
    ],
  },
  {
    field: 'bookingdates',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: 400 },
      { label: 'null', value: null, expectedStatus: 400 },
      {
        label: 'checkin empty',
        value: { checkin: '', checkout: '2025-02-05' },
        expectedStatus: 400,
      },
      {
        label: 'checkout before checkin',
        value: { checkin: '2025-02-10', checkout: '2025-02-05' },
        expectedStatus: 400,
      },
      {
        label: 'valid',
        value: { checkin: '2025-02-01', checkout: '2025-02-05' },
        expectedStatus: 200,
      },
    ],
  },
  {
    field: 'additionalneeds',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: 200 },
      { label: 'null', value: null, expectedStatus: 200 },
      { label: 'empty', value: '', expectedStatus: 200 },
      { label: 'text', value: 'Tea', expectedStatus: 200 },
    ],
  },
];

module.exports = { baseBooking, fieldTestMatrix };
