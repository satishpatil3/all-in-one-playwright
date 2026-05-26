/**
 * @fileoverview Test data for JSONPlaceholder API tests.
 */

const { HTTP_STATUS } = require('../enums/status.enum');

/**
 * A valid post payload for CRUD tests.
 */
const validPost = {
  title: 'Antigravity Refactoring',
  body: 'Learning API test automation with universal methods.',
  userId: 1,
};

/**
 * Boundary value test cases for post creation.
 * JSONPlaceholder allows creating mock posts.
 */
const postBoundaryCases = [
  {
    case: 'Minimum valid inputs',
    payload: {
      title: 'a',
      body: 'b',
      userId: 1,
    },
    expectedStatus: HTTP_STATUS.CREATED, // 201
  },
  {
    case: 'Extremely long content',
    payload: {
      title: 'a'.repeat(200),
      body: 'b'.repeat(1000),
      userId: 999,
    },
    expectedStatus: HTTP_STATUS.CREATED, // 201
  },
  {
    case: 'Missing body payload',
    payload: {
      title: 'No Body Post',
      userId: 2,
    },
    expectedStatus: HTTP_STATUS.BAD_REQUEST, // 400
  },
  {
    case: 'Missing title payload',
    payload: {
      body: 'No Title Post',
      userId: 3,
    },
    expectedStatus: HTTP_STATUS.BAD_REQUEST, // 400
  },
  {
    case: 'Non-numeric userId',
    payload: {
      title: 'Valid title',
      body: 'Valid body',
      userId: 'abc',
    },
    expectedStatus: HTTP_STATUS.BAD_REQUEST, // 400
  },
];

module.exports = { validPost, postBoundaryCases };
