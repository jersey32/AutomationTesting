import { AcumaticaBasePage } from './acumaticabasepage.js'
import { inputs } from './input.js'
import { LoginPage, ACU_URL } from './loginpage.js'

const SCREEN_ID = 'PO301000'

export class PurchasePage extends AcumaticaBasePage {
  constructor(page) {
    super (page, SCREEN_ID)
  }

  async setup(username, password) {
    return this.login(username, password)
  }

  async setupUpdate(username, password) {
    return this.login(username, password, '&OrderType=RO&OrderNbr=PO015812')
  }

  async createPurchaseOrder(frame, data) {
    await frame.getByRole('textbox', { name: 'Vendor:' }).fill(data.vendor)
    await frame.getByRole('textbox', { name: 'Description:' }).fill(data.description)
    await frame.locator('.main-icon-img.main-RecordAdd').first().click()
    await frame.locator('.edit > td:nth-child(5)').click()
    await frame.locator('[id="_ctl00_phG_tab_t0_grid_lv0_edInventoryID_text"]').fill(data.inventoryid)
    await frame.locator('.edit > td:nth-child(12)').click()
    await frame.locator('[id="_ctl00_phG_tab_t0_grid_lv0_edOrderQty"]').fill('10')
  }

  async updatePurchaseOrder(frame, data) {
    await frame.getByRole('textbox', { name: 'Description:' }).fill(data.updatedescription)
  }

  async saveItem(frame) {
    return this.save(frame)
  }
}
