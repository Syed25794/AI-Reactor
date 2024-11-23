import { test, expect } from '@playwright/test';

const url = process.env.URL!;
test('Close the welcome pop up and walkthrough', async( { browser } ) => {
    const context = await browser.newContext( { ignoreHTTPSErrors : true });
    const page = await context.newPage();
    const response = await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
    // close the welcome pop-up
    const popupButton = await page.getByRole('button', { name : 'Close'}).click();
    // close the walkthrough pop-up
    page.getByRole('button', { name : 'SKIP'}).click();
    expect(response?.status());
    await page.screenshot({ path : 'screenshot.jpg'});
})