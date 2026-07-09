import { BasePage } from './BasePage.js';
import { Webmetheus_URL } from './LoginPage.js';

export class WebmethousPage extends BasePage {
  async navigateTo() {
    await this.goto(Webmetheus_URL);
  }

  async isOnlineTextVisible() {
    return await this.page.getByText('Automatic Scraping Tool').isVisible();
  }

  async getScriptDropdownContent() {
    return await this.page.getByRole('combobox').textContent();
  }
}
