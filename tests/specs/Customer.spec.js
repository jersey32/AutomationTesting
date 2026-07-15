import { test, expect } from '@playwright/test'
import { CustomerPage } from '../pages/customerpage.js'
import { CUSTOMER_DATA } from '../pages/input.js'

let customerPage
let frame
let customerPageUpdate

test('Create Customer', async ({ page }) => {
  customerPage = new CustomerPage(page)
  frame = await customerPage.setup(process.env.ACUMATICA_USERNAME, process.env.ACUMATICA_PASSWORD)
  await customerPage.createCustomer(frame, CUSTOMER_DATA)
  await customerPage.saveCustomer(frame)
})

test('Update Customer', async ({ page }) => {
  customerPageUpdate = new CustomerPage(page)
  frame = await customerPageUpdate.setupUpdate(process.env.ACUMATICA_USERNAME, process.env.ACUMATICA_PASSWORD)
  await customerPageUpdate.updateCustomer(frame, CUSTOMER_DATA)
  await customerPageUpdate.saveCustomer(frame)
})
