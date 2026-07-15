import { LoginPage, ACU_URL } from './loginpage.js'

export class AcumaticaBasePage {
  constructor(page, screenId) {
    this.page = page
    this.screenId = screenId
  }

  async login(username, password, queryParams = '') {
    const loginPage = new LoginPage(this.page)
    await loginPage.login(`${ACU_URL}${this.screenId}${queryParams}`, username, password)
    return this.getFrame()
  }

  getFrame() {
    return this.page.locator('iframe[name="main"]').contentFrame()
  }

  async save(frame) {
    await frame.locator('#ctl00_phDS_ds_ToolBar_Save div').nth(3).click()
  }
}
