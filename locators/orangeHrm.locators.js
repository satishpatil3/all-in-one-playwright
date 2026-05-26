/**
 * @fileoverview Locators for the OrangeHRM application.
 */

const ORANGEHRM_LOCATORS = {
  USERNAME_INPUT: "input[placeholder='Username']",
  PASSWORD_INPUT: "input[name='password']",
  LOGIN_BUTTON: "//button[@type='submit']",
  PROFILE_PICTURE: "img[alt='profile picture']",
  LOGOUT_MENU_ITEM: 'text=Logout',
  ERROR_MESSAGE: "//div[@class='oxd-alert-content oxd-alert-content--error']",
};

module.exports = { ORANGEHRM_LOCATORS };
