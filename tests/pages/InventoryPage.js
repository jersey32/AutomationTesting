import { BasePage } from './BasePage.js';
import { SAUCEDEMO_URL } from './LoginPage.js';

export class InventoryPage extends BasePage {
  async isInventoryListVisible() {
    return await this.page.locator('.inventory_list').isVisible();
  }

  async getTitleText() {
    return await this.page.locator('.title').textContent();
  }

  async isShoppingCartVisible() {
    return await this.page.locator('.shopping_cart_link').isVisible();
  }

  async isTwitterIconVisible() {
    return await this.page.locator('.social_twitter').isVisible();
  }

  async isFacebookIconVisible() {
    return await this.page.locator('.social_facebook').isVisible();
  }

  async isLinkedinIconVisible() {
    return await this.page.locator('.social_linkedin').isVisible();
  }

  async openMenu() {
    await this.click('#react-burger-menu-btn');
  }

  async logout() {
    await this.click('#logout_sidebar_link');
  }

  async isLoginLogoVisible() {
    return await this.page.locator('.login_logo').isVisible();
  }

  async addItemToCart(itemName) {
    const item = this.page.locator(`.inventory_item:has-text("${itemName}")`);
    await item.locator('.btn_inventory').click();
  }

  async goToCart() {
    await this.click('.shopping_cart_link');
  }

  async isCartListVisible() {
    return await this.page.locator('.cart_list').isVisible();
  }

  async getCartItemCount() {
    return await this.page.locator('.cart_item').count();
  }

  async getCartItemNames() {
    return await this.page.locator('.cart_item .inventory_item_name').allTextContents();
  }
}
