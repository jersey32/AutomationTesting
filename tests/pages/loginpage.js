export const ACU_URL = 'https://acumaticadev.e2cc.com/ESquaredNPL/(W(14))/Main?ScreenId='
export const AIR_QUOTES_URL = 'https://quote.e2cc.com/NDUxNWQzNTYwNzk3NDdmNTI3NTY0NjI3ZjY2MjUzMjM1MzgzMDMwM2QzMjcyNmU2ZjUyNzU2NDYyN2Y2ZjM3LjM4OQ=='

export class LoginPage {
  constructor(page) {
    this.page = page
  }

  async login(url, username, password) {
    await this.page.goto(url)
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username)
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password)
    await this.page.getByRole('button', { name: 'Sign In' }).click()
  }
}
