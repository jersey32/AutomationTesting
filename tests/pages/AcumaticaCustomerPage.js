import { AcumaticaBasePage } from './AcumaticaBasePage.js';

export class AcumaticaCustomerPage extends AcumaticaBasePage {
  async fillAccountName(frame, accountName) {
    await frame.getByRole('textbox', { name: 'Account Name:' }).fill(accountName);
  }

  async fillAddressLine1(frame, address) {
    await frame.getByRole('textbox', { name: 'Address Line 1:' }).fill(address);
  }

  async fillCity(frame, city) {
    await frame.getByRole('textbox', { name: 'City:' }).fill(city);
  }

  async fillState(frame, state) {
    await frame.getByRole('textbox', { name: 'State:' }).fill(state);
  }

  async fillPostalCode(frame, postalCode) {
    await frame.getByRole('textbox', { name: 'Postal Code:' }).fill(postalCode);
  }

  async fillPhone(frame, phone) {
    await frame.locator('input[name="ctl00$phG$tab$t0$DefContact1$edDefContactPXMaskEdit1"]').fill(phone);
  }

  async fillCustomerDetails(frame, customerData) {
    await this.fillAccountName(frame, customerData.accountName);
    await this.fillAddressLine1(frame, customerData.addressLine1);
    await this.fillCity(frame, customerData.city);
    await this.fillState(frame, customerData.state);
    await this.fillPostalCode(frame, customerData.postalCode);
    await this.fillEmail(frame, customerData.email);
    await this.fillPhone(frame, customerData.phone);
  }
}
