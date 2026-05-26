/**
 * @fileoverview Restful Booker API — CRUD flow and boundary value tests.
 * Uses bookingService and apiContext fixtures — no setup boilerplate in tests.
 */

const { test, expect } = require('../../fixtures/index');
const { HTTP_STATUS } = require('../../enums/status.enum');
const { getAuthToken } = require('../../services/auth.service');
const { validBooking, boundaryCases } = require('../../testData/booking.data');
const { baseBooking, fieldTestMatrix } = require('../../helpers/booking.field.matrix');
const { logInfo } = require('../../utils/logUtils');
const { validateStatusCode, validateJsonBody } = require('../../utils/responseValidation');

test.describe('Booking API | CRUD Flow', () => {

  test('Create → Update → Delete booking', async ({ bookingService, apiClient }) => {
    // CREATE
    const createResponse = await bookingService.createBooking(validBooking);
    validateStatusCode(createResponse, HTTP_STATUS.OK);

    const { bookingid } = await createResponse.json();
    logInfo(`Booking created: ${bookingid}`);

    // AUTH
    const token = await getAuthToken(apiClient);

    // UPDATE
    const updatedPayload = { ...validBooking, firstname: 'UpdatedName' };
    const updateResponse = await bookingService.updateBooking(bookingid, updatedPayload, token);
    validateStatusCode(updateResponse, HTTP_STATUS.OK);
    await validateJsonBody(updateResponse, { firstname: 'UpdatedName' });

    // DELETE
    const deleteResponse = await bookingService.deleteBooking(bookingid, token);
    validateStatusCode(deleteResponse, HTTP_STATUS.CREATED);

    // VERIFY DELETED
    const verifyResponse = await bookingService.getBookingById(bookingid);
    validateStatusCode(verifyResponse, HTTP_STATUS.NOT_FOUND);
    logInfo(`Booking ${bookingid} deleted and verified`);
  });

});

test.describe('Booking API | Boundary Values', () => {

  for (const { case: title, payload, expectedStatus } of boundaryCases) {

    test(`Boundary → ${title}`, async ({ bookingService }) => {
      const response = await bookingService.createBooking(payload);

      logInfo(`Case: ${title} | Expected: ${expectedStatus} | Actual: ${response.status()}`);
      validateStatusCode(response, expectedStatus);

      if (expectedStatus === HTTP_STATUS.OK) {
        const body = await response.json();
        expect(body.bookingid).toBeDefined();
        logInfo(`Booking created ID: ${body.bookingid}`);
      }
    });

  }

});

test.describe('Booking API | Field Level Validation', () => {

  for (const { field, cases } of fieldTestMatrix) {
    for (const { label, value, expectedStatus } of cases) {

      test(`${field} → ${label}`, async ({ bookingService }) => {
        const payload = baseBooking();
        payload[field] = value;

        const response = await bookingService.createBooking(payload);
        validateStatusCode(response, expectedStatus);

        if (expectedStatus === HTTP_STATUS.OK) {
          const body = await response.json();
          expect(body.bookingid).toBeDefined();
        }
      });

    }
  }

});
