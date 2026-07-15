import { test } from '@playwright/test'
import { PurchasePage } from '../pages/purchasepage.js'
import { PURCHASE_ORDER_DATA } from '../pages/input.js'

let purchasePage
let frame
let purchasePageUpdate

test('Create Purchase Order', async ({ page }) => {
  purchasePage = new PurchasePage(page)
  frame = await purchasePage.setup(process.env.ACUMATICA_USERNAME, process.env.ACUMATICA_PASSWORD)
  await purchasePage.createPurchaseOrder(frame, PURCHASE_ORDER_DATA)
  await purchasePage.saveItem(frame)
});

test('Update Purchase Order', async ({ page }) => {
  purchasePageUpdate = new PurchasePage(page)
  frame = await purchasePageUpdate.setupUpdate(process.env.ACUMATICA_USERNAME, process.env.ACUMATICA_PASSWORD)
  await purchasePageUpdate.updatePurchaseOrder(frame, PURCHASE_ORDER_DATA)
  await purchasePageUpdate.saveItem(frame)
});
