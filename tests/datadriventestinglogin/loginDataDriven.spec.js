/**
 * @fileoverview Data-driven role-based login tests for Swag Labs.
 * Each user role has a different expected outcome after login.
 */

const { test, expect } = require('../../fixtures/index');
const { assertContainsText, assertText } = require('../../utils/assertionUtils');
const { LOGIN_EXPECTATION } = require('../../enums/expectations.enum');
const { swagLabsUsers } = require('../../testData/swagLabs.data');
const { MESSAGES } = require('../../constants/messages');
const { ENV } = require('../../config/env');

test.describe('Swag Labs | Role Based Login Validation', () => {

  for (const user of swagLabsUsers) {

    test(user.testName, async ({ swagLabsLoginPage }) => {
      await swagLabsLoginPage.login(user.username, ENV.SAUCEDEMO.PASSWORD);

      if (user.expectation === LOGIN_EXPECTATION.LOGIN_BLOCKED) {
        await assertContainsText(swagLabsLoginPage.errorLocator, MESSAGES.SAUCEDEMO.LOCKED_OUT);
        return;
      }

      await assertText(swagLabsLoginPage.productTitleLocator, MESSAGES.SAUCEDEMO.PRODUCTS_TITLE);

      const imageSrcs = await swagLabsLoginPage.getProductImageSrcs();
      const uniqueImages = new Set(imageSrcs);

      if (user.expectation === LOGIN_EXPECTATION.UNIQUE_IMAGES) {
        expect(uniqueImages.size).toBeGreaterThan(1);
      }

      if (user.expectation === LOGIN_EXPECTATION.SAME_IMAGES) {
        expect(uniqueImages.size).toBe(1);
      }
    });

  }

});
