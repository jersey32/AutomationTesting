import { AcumaticaBasePage } from './AcumaticaBasePage.js';

export class AcumaticaStockItemPage extends AcumaticaBasePage {

  async selectInventoryItem(frame, itemCode = 'TESTITEM') {
    await frame.locator('#ctl00_phF_form_edInventoryCD > .controlCont > .buttonsCont > .sprite-icon > .control-icon-img').click();
    await frame.locator('#ctl00_phF_form_edInventoryCD_pnl_tlb_fb_text').fill(itemCode);
    await frame.getByText('Select', { exact: true }).click();
  }

  async updateLastCost(frame, lastCost = '100') {
    await frame.getByRole('cell', { name: 'Price/Cost', exact: true }).click();
    const lastCostInput = frame.locator('#ctl00_phG_tab_t2_formCostStats_edLastCost');
    await lastCostInput.click();
    await lastCostInput.fill(lastCost);
  }

  async updateStockItem(frame, itemCode = 'TESTITEM', lastCost = '100') {
    await this.selectInventoryItem(frame, itemCode);
    await this.updateLastCost(frame, lastCost);
    await this.saveRecord(frame);
  }
}
