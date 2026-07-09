export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async waitForLoadState(state = 'domcontentloaded') {
    await this.page.waitForLoadState(state);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async fill(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  async getFrame(name) {
    const iframeLocator = this.page.locator(`iframe[name="${name}"]`);
    await iframeLocator.waitFor();
    return iframeLocator.contentFrame();
  }
}
