import { AcumaticaBasePage } from './AcumaticaBasePage.js';

export class AcumaticaLeadPage extends AcumaticaBasePage {
  async fillFirstName(frame, firstName) {
    await frame.getByRole('textbox', { name: 'First Name:' }).fill(firstName);
  }

  async fillLastName(frame, lastName) {
    await frame.getByRole('textbox', { name: 'Last Name:' }).fill(lastName);
  }

  async fillPhone(frame, phone) {
    await frame.locator('#ctl00_phG_tab_t0_edOpportunity_Contact_Phone1').fill(phone);
  }

  async fillCompanyName(frame, companyName) {
    await frame.getByRole('textbox', { name: 'Account Name:' }).fill(companyName);
  }

  async fillLeadDetails(frame, leadData) {
    await this.fillFirstName(frame, leadData.firstName);
    await this.fillLastName(frame, leadData.lastName);
    await this.fillEmail(frame, leadData.email);
    await this.fillPhone(frame, leadData.phone);
    await this.fillCompanyName(frame, leadData.companyName);
  }
}