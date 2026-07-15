import { AcumaticaBasePage } from './acumaticabasepage.js'

const SCREEN_ID = 'AR303000'

export class CustomerPage extends AcumaticaBasePage {
  constructor(page) {
    super(page, SCREEN_ID)
  }

  async setup(username, password) {
    return this.login(username, password)
  }

  async setupUpdate(username, password) {
    return this.login(username, password, '&AcctCD=C10006')
  }

  async createCustomer(frame, data) {
    await frame.getByRole('textbox', { name: 'Account Name:' }).fill(data.accountName)
    await frame.getByRole('textbox', { name: 'Address Line 1:' }).fill(data.addressLine1)
    await frame.getByRole('textbox', { name: 'City:' }).fill(data.city)
    await frame.getByRole('textbox', { name: 'State:' }).fill(data.state)
    await frame.getByRole('textbox', { name: 'Postal Code:' }).fill(data.postalCode)
    await frame.getByRole('textbox', { name: 'Account Email:' }).fill(data.email)
  }

  async updateCustomer(frame, data) {
    await frame.getByRole('textbox', { name: 'Address Line 1:' }).fill(data.updateAddressLine1)
  }

  async saveCustomer(frame) {
    return this.save(frame)
  }
}
