import { test, expect } from '@playwright/test'
import { SoNetPage } from '../pages/so-net.js'
import { SALES_ORDER_NET_DATA } from '../pages/input.js'

let soNetPage
let frame

test('Create SO-Net Order', async ({ page }) => {
  soNetPage = new SoNetPage(page)
  frame = await soNetPage.setup(process.env.ACUMATICA_USERNAME, process.env.ACUMATICA_PASSWORD)
  await soNetPage.createSoNetOrder(frame, SALES_ORDER_NET_DATA)
  await soNetPage.workflowbutton(frame)
  await soNetPage.createshipment(frame)
})
