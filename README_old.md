# Playwright Enterprise Automation Framework

An enterprise-grade, highly structured Playwright test automation framework built with JavaScript (CommonJS). This repository implements clean code principles, strict Page Object Model (POM) separation, dynamic API clients, environment-based configuration selectors, and structured validation matrices.

---

## 1. Architecture Overview

### Framework Architecture
This framework is built upon a layered architecture designed to decouple configuration, data, user actions, and test assertions. By separating these components, tests remain readable, declarative, and resilient to UI changes. 

```
                                  ┌────────────────────────┐
                                  │   config/ & constants/ │
                                  │   Env profiles, URLs   │
                                  └───────────┬────────────┘
                                              │
                                              ▼
┌───────────────┐   ┌────────────────────────┐   ┌───────────────────┐
│   locators/   │──►│        pages/          │──►│     fixtures/     │
│ CSS Selector  │   │ Page Object Methods    │   │ page/client inst. │
└───────────────┘   └────────────────────────┘   └─────────┬─────────┘
                                                           │
                                                           ▼
┌──────────────────┐   ┌────────────────────────┐   ┌───────────────┐
│     utils/       │◄──│        tests/          │◄──│   testData/   │
│ Assertions, Logs │   │ Spec test suites       │   │ Data Payloads │
└──────────────────┘   └────────────────────────┘   └───────────────┘
```

### Design Patterns Used
* **Page Object Model (POM)**: Every web page has a corresponding Page class in `pages/` that encapsulates page actions and user flows.
* **Locator Isolation (Locator Factory Pattern)**: Selectors are strictly isolated in `locators/` and separated from page action logic, preventing selectors from being duplicated across actions.
* **Dependency Injection (Playwright Fixtures)**: Page and service instances are registered in `fixtures/` and automatically injected into spec files as arguments, eliminating manual instantiation boilerplate (`new Page()`) in test blocks.
* **Facade Pattern (Service Layer)**: API tests route operations through dedicated classes in `services/` that map relative endpoints, shielding test specs from url concatenation and headers setup.
* **Strategy Pattern (Environment Selector)**: System properties are dynamically mapped using environment profiles (`qa`, `dev`, `prod`), loading the active credentials based on runtime environment variables.

### Scalability Approach
* **Universal API Client**: Implemented a generic [apiClient.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/utils/apiClient.js) that handles headers, cookies, token injection, and measurements dynamically. Adding new websites requires zero modifications to the core request handlers.
* **Assertion Abstraction**: Standardized validations into [assertionUtils.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/utils/assertionUtils.js) (UI) and [responseValidation.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/utils/responseValidation.js) (API), keeping test specs strictly declarative.

---

## 2. Project Flow & Runtime Flow

### Complete Execution Flow Step-by-Step
1. **Runner Initialization**: Playwright loads the configuration in `playwright.config.js` and scans target spec files inside `tests/`.
2. **Environment Mapping**: Config imports [config/index.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/config/index.js), resolving the active environment profile (defaults to `qa`) and loading credentials.
3. **Fixture Resolution**: Prior to running a test block, Playwright resolves requested fixtures (e.g. `swagLabsLoginPage` or `bookingService`) from [fixtures/index.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/fixtures/index.js).
4. **Context Construction**: 
   - For UI tests: Playwright opens a clean browser context and navigates to the page using locator strings defined in `locators/`.
   - For API tests: Playwright injects the `apiClient` fixture.
5. **Action Flow**: The spec file calls methods on the injected fixture. The methods execute wait conditions and operations defined in the `pages/` or `services/` layers.
6. **Logging & Verification**: Every step prints console updates via [logUtils.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/utils/logUtils.js) and triggers assertions from the validation helpers.

---

## 3. Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Dependency Setup
1. Clone the repository and navigate to the project root directory.
2. Install npm dependencies:
   ```bash
   npm install
   ```

### Playwright Setup & Browser Installation
Install the required browser binaries:
   ```bash
   npx playwright install chromium
   ```

### Execution Commands
| Command | What it Runs |
|---|---|
| `npx playwright test` | All tests, all browsers in parallel |
| `npx playwright test tests/REST-API --project=chromium` | Runs consolidated API tests on Chromium |
| `npx playwright test tests/test-table-playwright --project=chromium` | Runs table-filtering specs on Chromium |
| `npx playwright test --project=chromium` | Runs all tests exclusively on Chromium |
| `npx playwright test --headed` | Runs tests in headed mode |
| `npx playwright test --debug` | Opens Playwright Inspector for debugging |

### Report Commands
Generate and open the HTML report:
```bash
npx playwright show-report
```

---

## 4. Environment Configuration

### Execution Profiles & Handling
The framework groups credentials inside [env.js](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/config/env.js) under environment keys: `qa`, `dev`, and `prod`.

By setting the `TEST_ENV` environment variable, you can switch between environment configurations:

* **PowerShell**:
  ```powershell
  $env:TEST_ENV="dev"; npx playwright test tests/REST-API --project=chromium
  ```
* **Git Bash / Linux**:
  ```bash
  TEST_ENV=prod npx playwright test tests/REST-API --project=chromium
  ```

### Secrets & Custom Variables Override
In CI pipelines, do not commit sensitive credentials to version control. Override settings at runtime using standard environment variables:
```bash
PRACTICE_USERNAME=student PRACTICE_PASSWORD=Password123 npx playwright test
```

### Sample Configuration Structure
```javascript
const environments = {
  qa: {
    BOOKING_API: {
      USERNAME: process.env.BOOKING_API_USERNAME || 'admin',
      PASSWORD: process.env.BOOKING_API_PASSWORD || 'password123',
    },
  },
  dev: {
    BOOKING_API: {
      USERNAME: process.env.BOOKING_API_USERNAME || 'admin_dev',
      PASSWORD: process.env.BOOKING_API_PASSWORD || 'password_dev',
    },
  }
};
```

---

## 5. Enterprise Best Practices Applied

* **Strict POM Architecture**: No selectors are written inside test spec files. Specs only contain test assertions and semantic method calls.
* **Reusable Assertions**: Custom asserts (like checking sorting or element counts) are wrapped inside helpers to guarantee consistent validation logging.
* **Dynamic API Client**: Isolates API request headers (`Accept: application/json` and `Content-Type: application/json`) from global browser contexts, preventing conflicts with HTML page redirections.
* **Centralized Enums**: Standard HTTP codes (`HTTP_STATUS`) and login definitions (`LOGIN_EXPECTATION`) use read-only maps to prevent "magic numbers" and typing errors.
* **Timings Audit**: Custom API client injects `durationMs` into every response to enforce performance SLA assertions.
* **CI/CD Readiness**: Parallel execution is fully enabled (`fullyParallel: true` in config) and runs on a single worker in headless CI modes with screenshot/video reporting on failures.

---

## 6. Folder-by-Folder Output Explanation

### [base](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/base)
* **Purpose**: Encapsulates common Playwright browser actions.
* **Responsibility**: Exposes wrapper methods for `click`, `fill`, `waitFor`, `goBack`, and `goForward`.
* **Contribution**: Ensures consistency and provides centralized wait conditions prior to interactions, reducing element flaky actions.

### [config](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/config)
* **Purpose**: Resolves active configuration settings.
* **Responsibility**: Compiles environment profiles, URLs, and timeouts.
* **Contribution**: Enables tests to run seamlessly across local, dev, QA, or production sites without modification.

### [constants](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/constants)
* **Purpose**: Holds immutable framework strings.
* **Responsibility**: Manages messages, timeouts, and URLs.
* **Contribution**: Prevents hardcoded values in page objects or spec files.

### [enums](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/enums)
* **Purpose**: Declares structured constant mappings.
* **Responsibility**: Manages `HTTP_STATUS` codes and `LOGIN_EXPECTATION` definitions.
* **Contribution**: Prevents spelling typos and eliminates magic values.

### [fixtures](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/fixtures)
* **Purpose**: Registers Playwright fixtures.
* **Responsibility**: Instantiates page objects, API clients, and services.
* **Contribution**: Handles test setup automatically, making page classes directly available as spec arguments.

### [helpers](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/helpers)
* **Purpose**: Groups cross-functional workflows.
* **Responsibility**: Handles authentication flows and field validation data matrix generators.
* **Contribution**: Eliminates duplicate login code across tests.

### [locators](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/locators)
* **Purpose**: Isolates UI element selectors.
* **Responsibility**: Maps web elements to CSS/XPath selectors.
* **Contribution**: Ensures UI element selector changes only require updates in a single locator file.

### [pages](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/pages)
* **Purpose**: Represents target web pages under test.
* **Responsibility**: Houses POM classes that expose user action flows.
* **Contribution**: Keeps tests declarative and clean of interaction logic.

### [services](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/services)
* **Purpose**: Maps API CRUD endpoints.
* **Responsibility**: Coordinates requests through the `ApiClient`.
* **Contribution**: Provides clean backend integrations for API validations.

### [testData](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/testData)
* **Purpose**: Stores input parameters.
* **Responsibility**: Holds JSON payloads, boundary cases, and matrices.
* **Contribution**: Separates mock payloads and data sets from script logic.

### [utils](file:///c:/Users/satish.patil1/Sp-learning/all-in--main/utils)
* **Purpose**: Framework utility functions.
* **Responsibility**: Controls logs (`logUtils`), dynamic request client (`apiClient`), and assertions (`assertionUtils` & `responseValidation`).
* **Contribution**: Provides standard logging, timing, and error handling capabilities.

---

## 7. Testing Scope Explanation

### UI Logic & Redirections (`tests/playwrightdemo` & `playwright-01`)
* **Scope**: Navigations, positive logins, invalid password error validations, back-forward session retention.
* **Business Value**: Guarantees core user registration/access portals work.
* **Automation Value**: Eliminates manual regression checks on access gates.
* **Maintainability**: Page objects encapsulate locator elements for easy updates.

### Data-Driven Login Verification (`tests/datadriventestinglogin` & `datadriventestingloginusingtags`)
* **Scope**: Role-based permissions checks (standard, problem, locked-out users) and tagged runs (`@smoke` & `@regression`).
* **Business Value**: Prevents unauthorized access or access bugs.
* **Automation Value**: Validates multiple user flows in a single loop, reducing boilerplate.
* **Maintainability**: Credentials and tag arrays are stored in `testData/`.

### Complex UI Actions (`tests/playwrightyt`)
* **Scope**: Multi-tab handling, iframes, file uploads, auto-suggestions, alerts.
* **Business Value**: Guarantees app usability across complex browser integrations.
* **Automation Value**: Automates complex mouse, keyboard, and file operations.
* **Maintainability**: Utilizes isolated locator properties.

### Table Operations (`tests/test-table-playwright`)
* **Scope**: Filtering, multi-filter combinations, list-resets, sorting validations.
* **Business Value**: Verifies search and analytical reports are accurate.
* **Automation Value**: Instantly validates sorting structures across data lists.
* **Maintainability**: Uses standard sorting helpers in `assertionUtils.js`.

### Security Testing (`tests/HTTP and security`)
* **Scope**: Audit cookies, checking `HttpOnly` and `Secure` attributes.
* **Business Value**: Protects user sessions from Cross-Site Scripting (XSS).
* **Automation Value**: Continually audits build security compliance.

### Exception Behaviors (`tests/Test-Exceptions-playwright`)
* **Scope**: Timeout errors, stale elements, disabled controls.
* **Business Value**: Ensures application remains stable under slow network loads.
* **Automation Value**: Validates graceful application recovery.

### REST API Integration (`tests/REST-API`)
* **Scope**: API CRUD cycles and validation matrices on Booker and JSONPlaceholder.
* **Business Value**: Verifies backend endpoint functionality.
* **Automation Value**: Executes quick integrations checks without browser overhead.

---

## 8. Key Observations & Learnings

### Major Observations
* **Impact of Global HTTP Headers**: Declaring headers like `Accept: application/json` globally in `playwright.config.js` causes page navigations to send unexpected JSON headers. If a server performs standard HTML page redirects, these forced JSON headers can lead to bad request or server parsing errors. Isolating API-specific headers inside `ApiClient.js` prevents browser navigation conflicts.
* **Stateful Live Sandboxes vs. Stateless Mock Services**:
  - Stateful sandboxes (like *Restful Booker*) are subject to multi-user database resets, causing verify checks (like expecting a `404` post-deletion) to be flaky due to caching or concurrent deletions.
  - Stateless mock APIs (like *JSONPlaceholder*) are highly reliable for structure tests but do not enforce validation logic (returning `201 Created` even for bad data). Asserting standard `400 Bad Request` expectations on mock APIs showcases validation mismatches clearly.

### Framework Strengths
* High reuse of API client logic; adding new endpoints requires zero boilerplate.
* Clear isolation of elements (locators), page logic (POM), services, data, and specs.

### Recommendations for Future Enhancements
* **Mocking UI Calls**: Introduce Playwright's `page.route` to mock API calls in UI tests, isolating UI testing from backend dependencies.
* **Visual Testing**: Integrate Playwright screenshots comparison tests to audit UI styling changes automatically.
