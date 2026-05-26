/**
 * @fileoverview Browser-level action utilities: scroll, drag, hover, keyboard.
 */

/**
 * Hover over an element.
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 */
async function hoverElement(page, selector) {
  await page.locator(selector).hover();
}

/**
 * Press a keyboard key.
 * @param {import('@playwright/test').Page} page
 * @param {string} key - e.g. 'Enter', 'ArrowDown', 'Control+A'
 */
async function pressKey(page, key) {
  await page.keyboard.press(key);
}

/**
 * Type text using the keyboard (character by character).
 * @param {import('@playwright/test').Page} page
 * @param {string} text
 */
async function typeText(page, text) {
  await page.keyboard.type(text);
}

/**
 * Scroll an element into view.
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 */
async function scrollIntoView(page, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Drag an element from source to target.
 * @param {import('@playwright/test').Page} page
 * @param {string} sourceSelector
 * @param {string} targetSelector
 */
async function dragAndDrop(page, sourceSelector, targetSelector) {
  await page.dragAndDrop(sourceSelector, targetSelector);
}

/**
 * Accept a browser dialog (alert/confirm/prompt).
 * @param {import('@playwright/test').Page} page
 * @param {string} [promptText] - Optional text to fill in a prompt dialog
 */
function acceptDialog(page, promptText) {
  page.once('dialog', async (dialog) => {
    if (promptText !== undefined) {
      await dialog.accept(promptText);
    } else {
      await dialog.accept();
    }
  });
}

/**
 * Dismiss a browser dialog (confirm/prompt).
 * @param {import('@playwright/test').Page} page
 */
function dismissDialog(page) {
  page.once('dialog', async (dialog) => {
    await dialog.dismiss();
  });
}

module.exports = {
  hoverElement,
  pressKey,
  typeText,
  scrollIntoView,
  dragAndDrop,
  acceptDialog,
  dismissDialog,
};
