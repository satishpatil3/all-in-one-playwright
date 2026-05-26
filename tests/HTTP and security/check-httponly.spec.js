/**
 * @fileoverview Universal cookie and HTTP security header audit.
 * Change TARGET_URL to test any website.
 * All output is logged — no hard assertions (audit/reporting test).
 */

const { test } = require('../../fixtures/index');
const { TIMEOUTS } = require('../../constants/timeouts');
const { logInfo, logWarn } = require('../../utils/logUtils');

// ─── Change only this URL ────────────────────────────────────────────────────
const TARGET_URL = 'https://www.amazon.in';
// const TARGET_URL = 'https://github.com';
// const TARGET_URL = 'https://google.com';
// const TARGET_URL = 'https://the-internet.herokuapp.com/cookies';
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Cookie & Security Header Audit', () => {

  test(`Universal security audit for ${TARGET_URL}`, async ({ page, context, request }) => {
    logInfo(`Testing URL: ${TARGET_URL}`);

    const response = await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(TIMEOUTS.PAGE_LOAD);

    const cookies = await context.cookies();

    // ── 1. Total cookie count ────────────────────────────────────────────────
    logInfo(`[TEST 1] Total cookies: ${cookies.length}`);

    // ── 2. HttpOnly flag ─────────────────────────────────────────────────────
    logInfo('[TEST 2] HttpOnly flags:');
    for (const c of cookies) {
      logInfo(`  ${c.name}: HttpOnly=${c.httpOnly}`);
    }

    // ── 3. Secure flag ───────────────────────────────────────────────────────
    logInfo('[TEST 3] Secure flags:');
    for (const c of cookies) {
      logInfo(`  ${c.name}: Secure=${c.secure}`);
    }

    // ── 4. SameSite policy ───────────────────────────────────────────────────
    logInfo('[TEST 4] SameSite policy:');
    for (const c of cookies) {
      logInfo(`  ${c.name}: SameSite=${c.sameSite}`);
    }

    // ── 5. JavaScript-accessible cookies ────────────────────────────────────
    const jsCookies = await page.evaluate(() => document.cookie);
    logInfo(`[TEST 5] JS-accessible cookies: ${jsCookies || '(none)'}`);

    // ── 6. Full cookie audit ─────────────────────────────────────────────────
    logInfo('[TEST 6] Full cookie details:');
    for (const c of cookies) {
      logInfo(JSON.stringify({
        name: c.name, domain: c.domain, path: c.path,
        expires: c.expires, httpOnly: c.httpOnly,
        secure: c.secure, sameSite: c.sameSite,
      }));
    }

    // ── 7. Security headers ──────────────────────────────────────────────────
    logInfo('[TEST 7] Security headers:');
    try {
      const apiResponse = await request.get(TARGET_URL);
      const headers = apiResponse.headers();
      const securityHeaders = [
        'strict-transport-security',
        'content-security-policy',
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
        'permissions-policy',
      ];
      for (const h of securityHeaders) {
        logInfo(`  ${h}: ${headers[h] || 'NOT FOUND'}`);
      }
    } catch {
      logWarn('  Unable to fetch security headers.');
    }

    // ── 8. Cookie expiry ─────────────────────────────────────────────────────
    logInfo('[TEST 8] Cookie expiry:');
    for (const c of cookies) {
      const expiry = c.expires === -1
        ? 'Session cookie'
        : new Date(c.expires * 1000).toString();
      logInfo(`  ${c.name}: ${expiry}`);
    }

    // ── 9. Insecure cookie detection ─────────────────────────────────────────
    logInfo('[TEST 9] Insecure cookies:');
    for (const c of cookies) {
      const issues = [];
      if (!c.httpOnly) issues.push('Missing HttpOnly');
      if (!c.secure)   issues.push('Missing Secure');
      if (c.sameSite === 'None') issues.push('SameSite=None');
      if (issues.length) logWarn(`  ${c.name}: ${issues.join(', ')}`);
    }

    // ── 10. Domain grouping ──────────────────────────────────────────────────
    logInfo('[TEST 10] Cookies by domain:');
    const grouped = cookies.reduce((acc, c) => {
      (acc[c.domain] = acc[c.domain] || []).push(c.name);
      return acc;
    }, {});
    logInfo(JSON.stringify(grouped, null, 2));

    // ── 11. HTTPS check ──────────────────────────────────────────────────────
    logInfo(`[TEST 11] HTTPS: ${TARGET_URL.startsWith('https://') ? 'YES' : 'NO'}`);

    // ── 12. Response status ──────────────────────────────────────────────────
    logInfo(`[TEST 12] Response status: ${response ? response.status() : 'No response'}`);

    // ── 13. Cookie size check ────────────────────────────────────────────────
    logInfo('[TEST 13] Cookie sizes:');
    for (const c of cookies) {
      const size = c.name.length + c.value.length;
      const warning = size > 4096 ? ' ⚠ exceeds 4KB' : '';
      logInfo(`  ${c.name}: ~${size} bytes${warning}`);
    }

    // ── 14 & 15. Path and domain per cookie ─────────────────────────────────
    logInfo('[TEST 14-15] Cookie path and domain:');
    for (const c of cookies) {
      logInfo(`  ${c.name}: path=${c.path}, domain=${c.domain}`);
    }

    logInfo('Security audit complete.');
  });

});
