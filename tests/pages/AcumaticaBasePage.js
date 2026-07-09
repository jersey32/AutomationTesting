import { BasePage } from './BasePage.js';

export class AcumaticaBasePage extends BasePage {
  async getMainFrame() {
    return await this.getFrame('main');
  }

  async saveRecord(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
  }

  async fillEmail(frame, email) {
    await frame.getByRole('textbox', { name: 'Email:' }).fill(email);
  }
}
