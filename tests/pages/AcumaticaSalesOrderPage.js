import { AcumaticaBasePage } from './AcumaticaBasePage.js';

export class AcumaticaSalesOrderPage extends AcumaticaBasePage {

  async fillOrderHeader(frame, orderData) {
    await frame.getByRole('textbox', { name: 'Customer:' }).fill(orderData.customer);
    await frame.getByRole('textbox', { name: 'Customer:' }).press('Enter');
    await frame.getByRole('textbox', { name: 'Description:' }).fill(orderData.description);
    await frame.getByRole('textbox', { name: 'Estimated Ship Date:' }).fill(orderData.estimatedShipDate);
    await frame.getByRole('textbox', { name: 'Customer Order Nbr.:' }).fill(orderData.customerOrderNbr);
    await frame.getByRole('textbox', { name: 'External Reference:' }).fill(orderData.externalReference);
  }

  async selectWMSFromDropdown(frame) {
    await frame.locator('#ctl00_phF_form_t0_CstPXDropDown8 > .editorCont > .editorWrap').click();
    await this.page.getByText('WMS').click();
  }

  async addItems(frame) {
    await frame.locator('#ctl00_phG_tab_t0_grid_at_tlb_ul').getByText('Add Items').click();
    await frame.locator('#ctl00_phG_PanelAddSiteStatus_PanelAddSiteStatus_gripSiteStatus_colHS_0_0 div').nth(1).click();
    await frame.getByRole('button', { name: 'Add & Close' }).click();
  }

  async addItemsNoWMS(frame) {
    await frame.locator('#ctl00_phG_tab_t0_grid_at_tlb_ul').getByText('Add Items').click();
    await frame.locator('#ctl00_phG_PanelAddSiteStatus_gripSiteStatus_colHS_0_0 div').nth(1).click();
    await frame.locator('#ctl00_phG_PanelAddSiteStatus_PanelAddSiteStatus_btnAddClose').click();
  }

  async clickTab(frame, tabName) {
    await frame.getByRole('cell', { name: tabName, exact: true }).click();
  }

  async saveRecord(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click();
  }

  async removeHold(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_ReleaseFromHold').getByText('Remove Hold').click();
  }

  async waitForLongRunProcess(frame) {
    await frame.locator('qp-long-run div').nth(4).click();
  }

  async removeCreditHold(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_ReleaseFromCreditHold').getByText('Remove Credit Hold').click();
  }

  async sendToStaging(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_sendToStaging').getByText('Send To Staging').click();
  }

  async sendToPOP(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_sendToPOP').getByText('Send to POP').click();
  }

  async sendToStagingCst(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_sendToStagingCst').getByText('Send to Staging').click();
  }

  async generatePayment(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_MenuOpener').click();
    await frame.getByText('Generate Payment Link', { exact: true }).click();
    await frame.locator('#ctl00_phG_EBizpnlOpenGenerateFilterDialogBox_EBizGeneratebtnOK').click();
  }

  async viewPayment(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_MenuOpener').click();
    await frame.getByText('View Payment Link', { exact: true }).click();
  }

  async printSalesOrder(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_MenuOpener').click();
    await frame.getByText('Print Sales Order', { exact: true }).click();
  }
}
