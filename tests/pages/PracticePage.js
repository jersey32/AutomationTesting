import { BasePage } from './BasePage.js';

const PRACTICE_URL = 'https://testautomationpractice.blogspot.com/p/playwrightpractice.html';

export class PracticePage extends BasePage {
  async navigateTo() {
    await this.goto(PRACTICE_URL);
    await this.waitForLoadState();
  }

  async clickPrimaryActionButton() {
    await this.page.getByRole('button', { name: 'Primary Action' }).click();
  }

  async clickToggleButton() {
    await this.page.getByRole('button', { name: 'Toggle Button' }).click();
  }

  async fillUsername(username) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }

  async fillEmail(email) {
    await this.page.getByRole('textbox', { name: 'Email Address:' }).fill(email);
  }

  async fillPassword(password) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async fillAge(age) {
    await this.page.getByRole('spinbutton', { name: 'Your Age' }).fill(age);
  }

  async selectStandardRadio() {
    await this.page.getByRole('radio', { name: 'Standard' }).check();
  }

  async selectExpressRadio() {
    await this.page.getByRole('radio', { name: 'Express' }).check();
  }

  async dragAndDrop() {
    await this.page.locator('#draggable').dragTo(this.page.locator('#droppable'));
  }
}
