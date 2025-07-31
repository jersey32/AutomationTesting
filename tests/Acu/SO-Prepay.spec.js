const { test, expect } = require('@playwright/test');

test('Acumatica Sales Order', async ({ page }) => {
    await page.goto('https://acumaticadev.e2cc.com/ESquaredNPL/(W(10))/Main?ScreenId=SO301000');
    await page.fill('#ctl00_ContentPlaceHolder1_txtUserName', 'eSquaredDev');
    await page.fill('#ctl00_ContentPlaceHolder1_txtPassword', 'eSquaredDev1');
    await page.click('#ctl00_ContentPlaceHolder1_btnLogin');


});