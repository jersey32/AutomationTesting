import { BasePage } from './BasePage.js';
import { ART_URL } from './LoginPage.js';

export class ARTPage extends BasePage {
  async navigateTo() {
    await this.goto(ART_URL);
  }

  async isOnlineTextVisible() {
    return await this.page.getByText('Automatic Reporting Tool').isVisible();
  }

  async templateDropdownContainsText(text) {
    return await this.page.getByRole('combobox').locator('..').textContent().then(content => content.includes(text));
  }

  async getTemplateDropdownContent() {
    return await this.page.getByRole('combobox').textContent();
  }
}
