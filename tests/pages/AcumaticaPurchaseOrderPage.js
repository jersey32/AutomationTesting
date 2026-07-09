import { AcumaticaBasePage } from './AcumaticaBasePage.js';

export class AcumaticaPurchaseOrderPage extends AcumaticaBasePage {

  async fillOrderHeader(frame, formData) {
    await frame.getByRole('cell', { name: 'Details', exact: true }).click();
    await frame.getByRole('textbox', { name: 'Vendor:' }).fill(formData.vendor);
    await frame.getByRole('textbox', { name: 'Vendor:' }).press('Enter');
  }

  async addItems(frame, formData) {
    await frame.locator('#ctl00_phG_tab_t0_grid_at_tlb_ul').getByText('Add Items').click();
    await frame.getByRole('textbox', { name: 'Warehouse:' }).fill(formData.warehouse);
    await frame.getByRole('textbox', { name: 'Warehouse:' }).press('Enter');
    await frame.locator('#ctl00_phG_PanelAddSiteStatus_gripSiteStatus_colHS_0_0 div').nth(1).click();
    await frame.locator('#ctl00_phG_PanelAddSiteStatus_PXButton7').click();
  }

  async addTrackingNumber(frame, formData) {
    const trackingNumbersTab = 'ctl00_phG_tab_t3_cstGridAISTrackingNumbers';
    const inputField = `${trackingNumbersTab}_ei`;

    await frame.getByRole('cell', { name: 'Tracking Numbers', exact: true }).click();
    await frame.locator('#ctl00_phG_tab_t3_cstGridAISTrackingNumbers_scrollDiv').click();

    const editCells = frame.locator('.edit > td');
    await editCells.nth(2).click();
    await frame.locator(`#${inputField}`).fill(formData.trackingNumber);

    await editCells.nth(9).click();
    await frame.locator(`#${inputField}`).fill(formData.trackingQuantity);
  }

}
