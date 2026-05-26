# Playwright Demo — Enterprise Framework

A fully refactored, enterprise-grade Playwright automation framework built with JavaScript.

---

## Folder Structure

```
├── base/
│   └── BasePage.js             Shared Playwright actions — all pages extend this
├── config/
│   ├── env.js                  All credentials, read from env vars with fallback defaults
│   └── index.js                Central config export (env + urls + timeouts + messages)
├── constants/
│   ├── messages.js             All expected UI strings
│   ├── timeouts.js             All timeout values
│   └── urls.js                 All application URLs
├── enums/
│   ├── expectations.enum.js    Login expectation types
│   └── status.enum.js          HTTP status codes
├── fixtures/
│   └── index.js                Custom Playwright fixtures — pre-navigated pages + API context
├── helpers/
│   ├── api.context.js          Playwright APIRequestContext factory
│   ├── authHelper.js           Centralised login flows for all apps
│   └── booking.field.matrix.js Field-level boundary test matrix for Booking API
├── locators/
│   ├── courseTable.locators.js
│   ├── exceptions.locators.js
│   ├── herokuappLogin.locators.js
│   ├── orangeHrm.locators.js
│   ├── practiceLogin.locators.js
│   └── swagLabs.locators.js
├── pages/
│   ├── CourseTablePage.js
│   ├── ExceptionsPage.js
│   ├── HerokuappLoginPage.js
│   ├── OrangeHrmLoginPage.js
│   ├── PracticeLoginPage.js
│   └── SwagLabsLoginPage.js
├── services/
│   ├── auth.service.js         Restful Booker auth token
│   └── booking.service.js      Booking CRUD operations
├── testData/
│   ├── alerts.data.js
│   ├── booking.data.js
│   ├── herokuappLogin.data.js
│   ├── practiceLogin.data.js
│   └── swagLabs.data.js
├── utils/
│   ├── assertionUtils.js       Reusable assertion wrappers
│   ├── browserUtils.js         Keyboard, dialog, drag, hover helpers
│   ├── consoleErrorTracker.js  Browser console/page error collector
│   ├── fileUtils.js            File upload / read / write helpers
│   └── logUtils.js             Structured console logging
├── tests/
│   ├── playwrightdemo/         Login, security, navigation, SQL injection
│   ├── datadriventestinglogin/ Swag Labs role-based data-driven login
│   ├── datadriventestingloginusingtags/ Herokuapp smoke + regression login
│   ├── playwright-01/          Dropdown, key presses, Playwright docs
│   ├── playwrightyt/           OrangeHRM, alerts, iFrame, tabs, upload, console
│   ├── REST-API/               Booking CRUD + boundary + field validation
│   ├── Test-Exceptions-playwright/ Exception scenario demos
│   ├── test-table-playwright/  Course table filter + sort tests
│   └── HTTP and security/      Cookie & security header audit
├── upload/
│   └── demo1.png               Asset used in file upload test
└── playwright.config.js
```

---

## Quick Start

```bash
npm install
npx playwright install
```

---

## Running Tests

| Command | What it runs |
|---|---|
| `npm test` | All tests, all projects |
| `npm run test:chromium` | All tests on Chromium |
| `npm run test:firefox` | All tests on Firefox |
| `npm run test:webkit` | Login suites on WebKit/Safari |
| `npm run test:api` | REST API tests only |
| `npm run test:login` | All login suites |
| `npm run test:table` | Course table tests |
| `npm run test:exceptions` | Exception scenario tests |
| `npm run test:headed` | All tests in headed mode |
| `npm run test:debug` | Debug mode (step through) |
| `npm run test:ui` | Playwright UI mode |
| `npm run report` | Open last HTML report |

---

## Architecture Principles

**No hardcoded values in tests**
All URLs → `constants/urls.js`, credentials → `config/env.js`, timeouts → `constants/timeouts.js`, expected strings → `constants/messages.js`.

**No repeated login code**
Login flows are centralised in `helpers/authHelper.js`. Tests use fixtures from `fixtures/index.js` which navigate to the correct page before the test body runs.

**No selectors in test files**
Every selector lives in a `locators/` file. Page objects expose typed locator getters. Tests never reference CSS or XPath strings directly.

**No implementation logic in test files**
Test files contain only `test.describe` and `test` blocks. All actions go through page objects, all assertions through `utils/assertionUtils.js`.

**Single source of truth for test data**
All test data is in `testData/`. No JSON files scattered inside test subfolders.

---

## Adding a New Test

1. Add URLs to `constants/urls.js`
2. Add credentials to `config/env.js`
3. Add expected strings to `constants/messages.js`
4. Create a locator file in `locators/`
5. Create a page object in `pages/` extending `BasePage`
6. Add the page to `fixtures/index.js`
7. Add test data to `testData/`
8. Write the spec in `tests/` — import from fixtures, assert via `assertionUtils`

---

## Environment Variables

Override any credential at runtime without touching source files:

```bash
PRACTICE_USERNAME=student PRACTICE_PASSWORD=Password123 npx playwright test
HEROKUAPP_USERNAME=tomsmith HEROKUAPP_PASSWORD=SuperSecretPassword! npx playwright test
ORANGEHRM_USERNAME=Admin ORANGEHRM_PASSWORD=admin123 npx playwright test
```

All supported variables are documented in `config/env.js`.
