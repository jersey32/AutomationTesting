import { test, expect } from '@playwright/test'
import { LoginPage, ACU_URL } from '../pages/loginpage.js'
import { StockPage } from '../pages/stockpage.js'
import { STOCK_ITEM_DATA } from '../pages/input.js'

let stockPage
let frame
let stockpageupdate

test('Create stock item', async ({ page }) => {
  stockPage = new StockPage(page)
  frame = await stockPage.setup(process.env.ACUMATICA_USERNAME, process.env.ACUMATICA_PASSWORD)
  await stockPage.createStockItem(frame, STOCK_ITEM_DATA)
  await stockPage.saveItem(frame)
})

test('update stock item', async ({ page }) => {
  stockpageupdate = new StockPage(page)
  frame = await stockpageupdate.setupUpdate(process.env.ACUMATICA_USERNAME, process.env.ACUMATICA_PASSWORD)
  await stockpageupdate.updateStockItem(frame, STOCK_ITEM_DATA)
  await stockpageupdate.saveItem(frame)
})
