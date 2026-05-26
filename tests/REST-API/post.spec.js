const { test, expect } = require('../../fixtures/index');
const { HTTP_STATUS } = require('../../enums/status.enum');
const { validPost, postBoundaryCases } = require('../../testData/post.data');
const { basePost, postFieldTestMatrix } = require('../../helpers/post.field.matrix');
const { logInfo } = require('../../utils/logUtils');
const { validateStatusCode, validateJsonBody } = require('../../utils/responseValidation');

test.describe('JSONPlaceholder Post API | CRUD Flow', () => {

  test('Create → Update → Delete post', async ({ postService }) => {
    // CREATE
    const createResponse = await postService.createPost(validPost);
    validateStatusCode(createResponse, HTTP_STATUS.CREATED);
    const createBody = await createResponse.json();
    expect(createBody.id).toBeDefined();
    logInfo(`Post created with mock ID: ${createBody.id}`);

    // GET (Read - using post ID 1 as mock ID 101 is not persisted on the server)
    const getResponse = await postService.getPostById(1);
    validateStatusCode(getResponse, HTTP_STATUS.OK);
    const getBody = await getResponse.json();
    expect(getBody.id).toBe(1);

    // UPDATE
    const updatedPayload = { ...validPost, title: 'Updated Title' };
    const updateResponse = await postService.updatePost(1, updatedPayload);
    validateStatusCode(updateResponse, HTTP_STATUS.OK);
    await validateJsonBody(updateResponse, { title: 'Updated Title' });

    // DELETE
    const deleteResponse = await postService.deletePost(1);
    validateStatusCode(deleteResponse, HTTP_STATUS.OK);
    logInfo('Post deleted and verified');
  });

});

test.describe('JSONPlaceholder Post API | Boundary Values', () => {

  for (const { case: title, payload, expectedStatus } of postBoundaryCases) {

    test(`Boundary → ${title}`, async ({ postService }) => {
      const response = await postService.createPost(payload);

      logInfo(`Case: ${title} | Expected: ${expectedStatus} | Actual: ${response.status()}`);
      validateStatusCode(response, expectedStatus);

      if (expectedStatus === HTTP_STATUS.CREATED) {
        const body = await response.json();
        expect(body.id).toBeDefined();
      }
    });

  }

});

test.describe('JSONPlaceholder Post API | Field Level Validation', () => {

  for (const { field, cases } of postFieldTestMatrix) {
    for (const { label, value, expectedStatus } of cases) {

      test(`${field} → ${label}`, async ({ postService }) => {
        const payload = basePost();
        payload[field] = value;

        const response = await postService.createPost(payload);
        validateStatusCode(response, expectedStatus);

        if (expectedStatus === HTTP_STATUS.CREATED) {
          const body = await response.json();
          expect(body.id).toBeDefined();
        }
      });

    }
  }

});
