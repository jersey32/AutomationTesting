import { test, expect } from '@playwright/test'
import { SoPrePayPage } from '../pages/so-prepay.js'
import { SALES_ORDER_PREPAY_DATA } from '../pages/input.js'

let soPrePayPage
let frame

test('Create SO-Prepay Order', async ({ page }) => {
  soPrePayPage = new SoPrePayPage(page)
  frame = await soPrePayPage.setup(process.env.ACUMATICA_USERNAME, process.env.ACUMATICA_PASSWORD)
  await soPrePayPage.createSoPrePay(frame, SALES_ORDER_PREPAY_DATA)
  await soPrePayPage.workflowbutton(frame)
})