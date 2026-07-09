import { BasePage } from './BasePage.js';

export const SAUCEDEMO_URL = 'https://www.saucedemo.com/';
export const LOGIN_URL_PT = 'https://phonetracker.e2cc.com/Login.aspx?ReturnUrl=%2fPages%2fHome.aspx';
export const ART_URL = 'https://art.e2cc.com/';
export const Webmetheus_URL = 'https://webmetheus.e2cc.com/';
export const ACU_URL = 'https://acumaticadev.e2cc.com/ESquaredNPL/(W(14))/Main?ScreenId=';

export class LoginPage extends BasePage {
  // SauceDemo login
  async loginSauceDemo(username, password) {
    await this.goto(SAUCEDEMO_URL);
    await this.fill('#user-name', username);
    await this.fill('#password', password);
    await this.click('#login-button');
  }

  // PhoneTracker (PT) login
  async loginPhoneTracker(username, password) {
    await this.goto(LOGIN_URL_PT);
    await this.waitForLoadState();
    await this.page.getByRole('textbox', { name: 'User Name:' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  // Acumatica login
  async loginAcumatica(url, username, password) {
    await this.goto(url);
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  // Check error message
  async getErrorMessage() {
    return await this.page.locator('.error-message-container').textContent();
  }
}
