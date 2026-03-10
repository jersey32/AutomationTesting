const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  baseUrl: 'https://e2ccptweb2.e2cc.com:8082',
  loginUrl: '/Login.aspx?ReturnUrl=%2fPages%2fLicenses.aspx',
  credentials: {
    email: 'jbaron@e2cc.com',
    password: 'Greengrass55%',
  },
  licenseData: {
    status: '2',
    company: 'A-1 Door Company',
    costCode: '699545',
    licenseType: 'TEST LICENSE TYPE',
    sku: 'TEST SKU',
    sourceSystem: 'SOURCEDOTCOM',
    sourceReference: 'SOURCE REF',
  },
};

// Helper functions
async function loginToApplication(page, email, password) {
  await page.getByRole('textbox', { name: 'User Name:' }).fill(email);
  await page.getByRole('textbox', { name: 'Password:' }).fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForLoadState('domcontentloaded');
}

async function selectDropdownOption(page, label, value) {
  await page.getByLabel(label).selectOption(value);
}

async function selectCompany(page, companyName) {
  await page.getByTitle('Select Company ID').click();
  await page.getByRole('link', { name: companyName }).click();
}

async function selectCostCode(page, companyName) {
  await page.getByTitle('Select Company Cost Code ID').click();
  await page.getByRole('link', { name: companyName }).click();
  await page.getByRole('row', { name: '(select)', exact: true }).getByRole('cell').click();
}

async function selectCostCodeValue(page, costCodeId) {
  await page.getByRole('link', { name: costCodeId }).click();
}

async function fillLicenseFormFields(page, formData) {
  const fields = [
    { name: 'License Type License Type', value: formData.licenseType },
    { name: 'SKU SKU', value: formData.sku },
    { name: 'Source System Source System', value: formData.sourceSystem },
    { name: 'Source Reference Source', value: formData.sourceReference },
  ];

  for (const field of fields) {
    await page.getByRole('textbox', { name: field.name }).fill(field.value);
  }
}

test('Create license', async ({ page }) => {
  const { baseUrl, loginUrl, credentials, licenseData } = CONFIG;

  // Navigate to login page
  await page.goto(`${baseUrl}${loginUrl}`, { waitUntil: 'domcontentloaded' });

  // Login
  await loginToApplication(page, credentials.email, credentials.password);

  // Create new license
  await page.getByRole('link', { name: 'New' }).click();

  // Fill license form
  await selectDropdownOption(page, 'License Status*', licenseData.status);
  await selectCompany(page, licenseData.company);
  await selectCostCode(page, licenseData.company);
  await selectCostCodeValue(page, licenseData.costCode);
  await fillLicenseFormFields(page, licenseData);
});