import { expect } from '@playwright/test'
import { inputs } from './input.js'
import { LoginPage, ACU_URL } from './loginpage.js'
import { AcumaticaBasePage } from './acumaticabasepage.js'

const SCREEN_ID = 'SO301000'
export class SoNetPage extends AcumaticaBasePage {
  constructor(page) {
    super(page, SCREEN_ID )
  }

  async setup(username, password) { 
    return this.login(username, password)
  }

  async createSoNetOrder(frame, data) {
    await frame.getByRole('textbox', { name: 'Customer:' }).click()
    await frame.getByRole('textbox', { name: 'Customer:' }).fill(data.socustomer)
    await frame.getByRole('textbox', { name: 'Customer Order Nbr.:' }).click()
    await frame.getByRole('textbox', { name: 'Customer Order Nbr.:' }).fill(data.customerordernbr)
    await frame.getByRole('textbox', { name: 'External Reference:' }).click()
    await frame.getByRole('textbox', { name: 'External Reference:' }).fill(data.externalref)
    await frame.getByRole('textbox', { name: 'Description:' }).click()
    await frame.getByRole('textbox', { name: 'Description:' }).fill(data.sodescription)
    await frame.locator('.main-icon-img.main-RecordAdd').first().click()
    await frame.locator('.edit > td:nth-child(10)').click()
    await frame.locator('[id="_ctl00_phG_tab_t0_grid_lv0_edInventoryID_text"]').fill(data.soinventoryid)
    await frame.locator('.edit > td:nth-child(11)').click()
    await frame.locator('[id="_ctl00_phG_tab_t0_grid_lv0_edOrderQty"]').fill(data.soorderqty)
  }

  async workflowbutton(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_ReleaseFromHold').getByText('Remove Hold').click()
    await expect(frame.locator('#ctl00_phF_form_t0_edStatus')).toHaveText('Open')
    await frame.locator('#ctl00_phDS_ds_ToolBar_sendToPOP').getByText('Send to POP').click()
    await expect(frame.locator('#ctl00_phF_form_t0_edStatus')).toHaveText('Order Processing')
    await frame.locator('#ctl00_phDS_ds_ToolBar_sendToStagingCst').getByText('Send to Staging').click()
    await expect(frame.locator('#ctl00_phF_form_t0_edStatus')).toHaveText('Staging')
  }

  async createshipment(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_CreateShipmentIssue').getByText('Create Shipment').click()
    await frame.locator('#ctl00_phG_pnlCreateShipment_btnOK').click()
  }
}
