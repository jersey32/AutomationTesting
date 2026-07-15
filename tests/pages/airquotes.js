import { expect } from '@playwright/test'
import { inputs } from './input.js'
import { LoginPage, ACU_URL } from './loginpage.js'

export class AirQuotesPage {
  constructor(page) {
    this.page = page
  }

    async setup(username, password) {
        const loginPage = new LoginPage(this.page)
        await loginPage.login(`${ACU_URL}SO301000`, username, password)
        const iframeLocator = this.page.locator('iframe[name="main"]')
        return iframeLocator.contentFrame()
    }
}