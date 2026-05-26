/**
 * @fileoverview Custom Playwright fixtures.
 * Import { test, expect } from this file in tests that need shared setup.
 *
 * Available fixtures:
 *  - practiceLoginPage  → PracticeLoginPage instance, already navigated to login
 *  - herokuappLoginPage → HerokuappLoginPage instance, already navigated to login
 *  - swagLabsLoginPage  → SwagLabsLoginPage instance, already navigated to login
 *  - courseTablePage    → CourseTablePage instance, already navigated to table
 *  - exceptionsPage     → ExceptionsPage instance, already navigated to exceptions
 *  - apiContext         → Playwright APIRequestContext for Restful Booker
 *  - bookingService     → BookingService instance ready to use
 */

const { test: base, expect } = require('@playwright/test');
const { PracticeLoginPage } = require('../pages/PracticeLoginPage');
const { HerokuappLoginPage } = require('../pages/HerokuappLoginPage');
const { SwagLabsLoginPage } = require('../pages/SwagLabsLoginPage');
const { CourseTablePage } = require('../pages/CourseTablePage');
const { ExceptionsPage } = require('../pages/ExceptionsPage');
const { createApiContext } = require('../helpers/api.context');
const { BookingService } = require('../services/booking.service');
const { PostService } = require('../services/post.service');
const { ApiClient } = require('../utils/apiClient');
const { URLS } = require('../constants/urls');

const test = base.extend({
  /** PracticeLoginPage navigated to the login URL */
  practiceLoginPage: async ({ page }, use) => {
    const loginPage = new PracticeLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  /** HerokuappLoginPage navigated to the login URL */
  herokuappLoginPage: async ({ page }, use) => {
    const loginPage = new HerokuappLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  /** SwagLabsLoginPage navigated to the SauceDemo URL */
  swagLabsLoginPage: async ({ page }, use) => {
    const loginPage = new SwagLabsLoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  /** CourseTablePage navigated to the table URL */
  courseTablePage: async ({ page }, use) => {
    const tablePage = new CourseTablePage(page);
    await tablePage.goto();
    await use(tablePage);
  },

  /** ExceptionsPage navigated to the exceptions URL */
  exceptionsPage: async ({ page }, use) => {
    const exceptPage = new ExceptionsPage(page);
    await exceptPage.goto();
    await use(exceptPage);
  },

  /** Playwright APIRequestContext for Restful Booker */
  apiContext: async ({ baseURL }, use) => {
    const api = await createApiContext(baseURL || URLS.RESTFUL_BOOKER_API);
    await use(api);
    await api.dispose();
  },

  /** Centralized ApiClient instance */
  apiClient: async ({ apiContext }, use) => {
    const client = new ApiClient(apiContext);
    await use(client);
  },

  /** BookingService ready to use */
  bookingService: async ({ apiClient }, use) => {
    const service = new BookingService(apiClient);
    await use(service);
  },

  /** PostService ready to use */
  postService: async ({ apiClient }, use) => {
    const service = new PostService(apiClient);
    await use(service);
  },
});

module.exports = { test, expect };
