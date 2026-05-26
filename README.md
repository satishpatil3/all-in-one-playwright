# Playwright Enterprise Automation Framework

An enterprise-grade, highly structured Playwright test automation framework built with JavaScript (CommonJS). This repository implements clean code principles, strict Page Object Model (POM) separation, dynamic API clients, environment-based configuration selectors, and structured validation matrices.

---

## 1. Directory Structure

```
├── base/
│   └── BasePage.js             # Base Page class wrapping locator actions & page navigation
├── config/
│   ├── env.js                  # Dynamic environment config profiles (qa, dev, prod)
│   └── index.js                # Centralized config aggregator (env, URLs, timeouts)
├── constants/
│   ├── messages.js             # Expected UI texts and error messages
│   ├── timeouts.js             # Timeout thresholds for test execution steps
│   └── urls.js                 # Centralized URL endpoints for UI and API tests
├── enums/
│   ├── expectations.enum.js    # Expectations for login validations
│   └── status.enum.js          # HTTP status codes mapping
├── fixtures/
│   └── index.js                # Custom test fixtures (pre-navigated UI pages & ApiClient instances)
├── helpers/
│   ├── api.context.js          # Playwright request context creator
│   ├── authHelper.js           # Shared multi-site login operations
│   ├── booking.field.matrix.js # Field validation matrices for Booking API
│   └── post.field.matrix.js    # Field validation matrices for JSONPlaceholder API
├── locators/
│   ├── courseTable.locators.js
│   ├── exceptions.locators.js
│   ├── herokuappLogin.locators.js
│   ├── orangeHrm.locators.js
│   ├── practiceLogin.locators.js
│   └── swagLabs.locators.js
├── pages/
│   ├── CourseTablePage.js      # Page Object extending BasePage for table interactions
│   ├── ExceptionsPage.js       # Page Object for handling JS/Browser exceptions
│   ├── HerokuappLoginPage.js   # Page Object for Herokuapp
│   ├── OrangeHrmLoginPage.js   # Page Object for OrangeHRM
│   ├── PracticeLoginPage.js    # Page Object for Practice Automation Login
│   └── SwagLabsLoginPage.js    # Page Object for Swag Labs
├── services/
│   ├── auth.service.js         # Retrieve Restful Booker API token
│   ├── booking.service.js      # Restful Booker CRUD endpoints mapping
│   └── post.service.js         # JSONPlaceholder CRUD endpoints mapping
├── testData/
│   ├── alerts.data.js
│   ├── booking.data.js
│   ├── herokuappLogin.data.js
│   ├── orangeHrm.data.js
│   ├── post.data.js
│   ├── practiceLogin.data.js
│   └── swagLabs.data.js
├── utils/
│   ├── apiClient.js            # Universal API client wrapping Playwright's APIRequestContext
│   ├── assertionUtils.js       # UI assertion helpers (visible, hidden, URLs, counts)
│   ├── browserUtils.js         # Browser interaction actions (keyboard, hover, drag)
│   ├── consoleErrorTracker.js  # Capture browser logs / errors during test runs
│   ├── fileUtils.js            # Helpers for file handling operations
│   ├── logUtils.js             # Structured console logging wrappers
│   └── responseValidation.js   # Reusable HTTP response validators (status, body, duration)
├── tests/
│   ├── HTTP and security/      # Security audit tests (e.g., HTTPOnly flag checks)
│   ├── REST-API/               # API specs (consolidated Booking and Post tests)
│   ├── Test-Exceptions-playwright/ # Exception scenario tests
│   ├── datadriventestinglogin/ # Role-based data-driven login tests
│   ├── datadriventestingloginusingtags/ # Tagged smoke/regression login tests
│   ├── playwright-01/          # Core browser dropdown, keys, login specs
│   ├── playwrightyt/           # Multi-browser tests (Upload, Tab, Iframe, Alert)
│   └── test-table-playwright/  # Dynamic table filter, sort, filter-reset specs
└── playwright.config.js        # Global Playwright configuration
```

---

## 2. Relationships & Core Architecture Flow

The framework follows a modular pipeline where files in different directories communicate to isolate config, locator selection, page interaction, and validation:

```
                  ┌────────────────────────┐
                  │   constants/ & config/ │
                  │   URLs, Env, Messages  │
                  └───────────┬────────────┘
                              ▼
┌───────────────┐   ┌────────────────────────┐   ┌───────────────────┐
│   locators/   │──►│        pages/          │──►│     fixtures/     │
│ Element CSS   │   │ Page Object Methods    │   │ Page Registration │
└───────────────┘   └────────────────────────┘   └─────────┬─────────┘
                                                           │
                                                           ▼
┌──────────────────┐   ┌────────────────────────┐   ┌───────────────┐
│     utils/       │◄──│        tests/          │◄──│   testData/   │
│ Assertions, Logs │   │ Spec test suites       │   │ Data Payloads │
└──────────────────┘   └────────────────────────┘   └───────────────┘
```

### Flow of execution in a UI test:
1. **Config setup**: Playwright loads `playwright.config.js`. It fetches URLs from [urls.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/constants/urls.js) and select credentials from [env.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/config/env.js) based on `process.env.TEST_ENV`.
2. **Fixture injection**: The spec file runs. In its arguments, it requests a fixture (like `swagLabsLoginPage`) registered in [index.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/fixtures/index.js).
3. **Element selection**: The page object uses selectors isolated in `locators/` (e.g. `swagLabs.locators.js`) to target inputs.
4. **Action execution**: The page object extends `BasePage` and executes operations (fill, click, wait).
5. **Assertion**: The test asserts conditions using [assertionUtils.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/utils/assertionUtils.js).

### Flow of execution in an API test:
1. **Fixture creation**: Test requests `bookingService` or `postService`. These services receive the universal [apiClient.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/utils/apiClient.js) fixture.
2. **Request generation**: The service wraps the API endpoint and forwards options (endpoint, body payload, token) to the generic `apiClient.sendRequest` method.
3. **Execution & Logging**: `apiClient` measures execution duration, logs the request/response payloads via `logUtils.js`, and returns the Playwright `APIResponse`.
4. **Response Validation**: The test file validates status codes and body structures using [responseValidation.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/utils/responseValidation.js).

---

## 3. What We Are Checking (Validations)

The framework validates the systems under test across multiple dimensions:
- **HTTP status codes**: Compares response codes against the `HTTP_STATUS` enum.
- **JSON responses**: Matches API bodies structurally against expected sub-objects.
- **Timing and Performance**: Verifies API request durations do not exceed specified SLA limits.
- **Element visibility & states**: Confirms objects transition to visible, hidden, enabled, or disabled states.
- **Browser state changes**: Checks URL matching, redirection routes, cookies, and local session changes.
- **Data sorting and filters**: Asserts that table lists align in ascending/descending sorting, and filter counts match correct entries.

---

## 4. Types of Testing Implemented

This framework demonstrates five types of automated tests:

### A. UI (User Interface) Page Object Model Testing
Validates browser interactions on forms, tables, uploads, alerts, iframes, and multi-tab actions. Implemented across:
- **Practice Test Automation**: Positive/negative login, navigation.
- **Swag Labs (SauceDemo)**: Page inventories, product checking.
- **OrangeHRM**: Complex login and logout dashboard loops.
- **The Internet (Herokuapp)**: Dropdowns, uploads, key presses, popups.

### B. Universal REST API Testing
Uses a dynamic `ApiClient` to test endpoints from different systems without rewriting execution logic.
- **Restful Booker API**: Live stateful CRUD test suites (Create → Authenticate → Update → Delete) and field boundary overrides.
- **JSONPlaceholder API**: Stateless mock API test suites mapping CRUD behaviors and field matrix assertions.

### C. Data-Driven Testing (DDT)
Runs tests iteratively using arrays of credentials, inputs, and expectations:
- **Role-based logins**: Loops through multiple user profiles (standard, locked out, problem users) and validates distinct page results.
- **Tagged testing**: Loops scenarios labeled `@smoke` or `@regression` to run subsets of target suites.

### D. HTTP Security Auditing
- **Cookie flag checks**: Evaluates browser cookies to verify the presence of `HttpOnly` and `Secure` security flags to safeguard session data.

### E. Browser Exception & Timeout Testing
Validates application stability against common browser exceptions:
- **NoSuchElement**: Asserts behavior when locator objects are absent.
- **StaleElement**: Asserts behavior when DOM objects refresh and disappear.
- **ElementNotInteractable / InvalidElementState**: Checks handling of disabled fields.
- **Timeouts**: Checks handling when actions exceed standard duration limits.

---

## 5. Test Outcomes & Logs

- **Structured Console Logs**: Each step prints informational logs using `logUtils.js` format:
  ```
  [INFO]  [2026-05-25T12:00:00.000Z] [API Request] Method: POST | URL: https://jsonplaceholder.typicode.com/posts | Body: {...}
  [INFO]  [2026-05-26T12:00:00.250Z] [API Response] Status: 201 Created | Duration: 250ms
  [INFO]  [2026-05-26T12:00:00.251Z] Assertion Passed: Response status is 201
  ```
- **Self-logging failures**: If an assertion fails, it logs a clear `[ERROR] Assertion Failed: Expected status X, but got Y` and captures browser screenshots.
- **Playwright HTML Reports**: A descriptive summary report is generated inside `playwright-report/` detailing test cases, traces, screenshots, and video recordings for failing flows.

---

## 6. Key Observations & Learnings

1. **Corporate Network Redirection (SAML SSO Interception)**:
   When running UI tests within strict corporate networks, calls to public test endpoints (like Herokuapp) may be intercepted by corporate firewalls, redirecting the automated browser to the organization's **Microsoft Azure AD (Entra ID) portal**. 
2. **Impact of Global HTTP Headers**:
   Declaring headers like `Accept: application/json` globally in `playwright.config.js` causes page navigations to send unexpected JSON headers. During SAML SSO redirects, this confuses Microsoft Entra ID, throwing `AADSTS9000410: Malformed JSON` errors. Resolving this requires isolating API headers in the `ApiClient` layer.
3. **Enum Constants over Hardcoding**:
   Centralizing status codes (`enums/status.enum.js`) and expectations prevents hardcoding "magic values", eliminates typos, enables IDE auto-complete, and streamlines project maintenance.
4. **Stateful Live Sandboxes vs. Stateless Mock Services**:
   - Stateful sandboxes (like *Restful Booker*) are subject to multi-user database resets, causing verify checks (like expecting a `404` post-deletion) to be flaky due to caching or concurrent deletions.
   - Stateless mock APIs (like *JSONPlaceholder*) are highly reliable for structure tests but do not enforce validation logic (returning `201 Created` even for bad data). Asserting standard `400 Bad Request` expectations on mock APIs showcases validation mismatches clearly.
