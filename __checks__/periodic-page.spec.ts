import { test , expect } from '@playwright/test';

const url = process.env.URL;
test('Periodic Table Page Browser Check', async( { browser }) => {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const response = await page.goto(url + 'periodic-table');
    await page.waitForLoadState("domcontentloaded");
    // close the welcome pop-up
    await page.getByRole('button', { name : 'Close'}).click();

    // close the walkthrough pop-up
    await page.getByRole('button', { name : 'SKIP'}).click();

    expect(response?.status()).toBeLessThan(400);
    await page.screenshot( { path : './images/screenshot2.jpg'});
})