import { BasePage } from './BasePage.js';
import { SAUCEDEMO_URL } from './LoginPage.js';

export class CheckoutPage extends BasePage {
  async clickCheckoutButton() {
    await this.click('.checkout_button');
  }

  async fillFirstName(firstName) {
    await this.fill('#first-name', firstName);
  }

  async fillLastName(lastName) {
    await this.fill('#last-name', lastName);
  }

  async fillPostalCode(postalCode) {
    await this.fill('#postal-code', postalCode);
  }

  async clickContinueButton() {
    await this.click('#continue');
  }

  async isSummaryInfoVisible() {
    return await this.page.locator('.summary_info').isVisible();
  }

  async isSummarySubtotalVisible() {
    return await this.page.locator('.summary_subtotal_label').isVisible();
  }

  async isSummaryTotalVisible() {
    return await this.page.locator('.summary_total_label').isVisible();
  }

  async isSummaryTaxVisible() {
    return await this.page.locator('.summary_tax_label').isVisible();
  }

  async clickFinishButton() {
    await this.click('.btn_action.cart_button');
  }

  async getCompleteHeaderText() {
    return await this.page.locator('.complete-header').textContent();
  }

  async getCompleteText() {
    return await this.page.locator('.complete-text').textContent();
  }

  async clickBackHome() {
    await this.page.getByLabel('Back Home').click();
  }

  async getCurrentURL() {
    return this.page.url();
  }

  async isCheckoutStepOneURL() {
    return this.page.url().includes('checkout-step-one.html');
  }

  async isCheckoutStepTwoURL() {
    return this.page.url().includes('checkout-step-two.html');
  }

  async isCheckoutCompleteURL() {
    return this.page.url().includes('checkout-complete.html');
  }

  async isInventoryURL() {
    return this.page.url().includes('inventory.html');
  }
}
