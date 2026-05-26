const { HTTP_STATUS } = require('../enums/status.enum');

/**
 * Returns a fresh valid base post payload.
 * @returns {object}
 */
function basePost() {
  return {
    title: 'Hello World',
    body: 'This is the default body content.',
    userId: 1,
  };
}

/**
 * Matrix of field-level test cases.
 * @type {Array<{field: string, cases: Array<{label: string, value: *, expectedStatus: number}>}>}
 */
const postFieldTestMatrix = [
  {
    field: 'title',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'null', value: null, expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'empty', value: '', expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'number', value: 12345, expectedStatus: HTTP_STATUS.BAD_REQUEST },
    ],
  },
  {
    field: 'body',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'null', value: null, expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'empty', value: '', expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'number', value: 67890, expectedStatus: HTTP_STATUS.BAD_REQUEST },
    ],
  },
  {
    field: 'userId',
    cases: [
      { label: 'missing', value: undefined, expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'null', value: null, expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'string', value: 'userId_str', expectedStatus: HTTP_STATUS.BAD_REQUEST },
      { label: 'zero', value: 0, expectedStatus: HTTP_STATUS.BAD_REQUEST },
    ],
  },
];

module.exports = { basePost, postFieldTestMatrix };
