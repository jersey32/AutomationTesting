import { inputs } from './input.js'
import { LoginPage, ACU_URL } from './loginpage.js'
import { AcumaticaBasePage } from './acumaticabasepage.js'

const SCREEN_ID='IN202500'

export class StockPage extends AcumaticaBasePage {
  constructor(page) {
    super(page, SCREEN_ID)
  }

  async setup(username, password) {
    return this.login(username, password)
  }

  async setupUpdate(username, password) {
    return this.login(username, password, '&IN202500&InventoryCD=TESTITEM')
  }

  async createStockItem(frame, data) {
    await frame.getByRole('textbox', { name: 'Item Class:' }).fill(data.itemclass)
    await frame.getByRole('textbox', { name: 'Description:' }).fill(data.description)
    await frame.getByRole('cell', { name: 'Price/Cost', exact: true }).click()
    await frame.locator('#ctl00_phG_tab_t2_curySettingsForm_edRecPrice').fill(data.msrp)
  }

  async updateStockItem(frame, data) {
    await frame.getByRole('cell', { name: 'Price/Cost', exact: true }).click()
    await frame.locator('#ctl00_phG_tab_t2_curySettingsForm_edRecPrice').fill(data.updateMsrp)
  }

  // Saving function
  async saveItem(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click()
  }
}
