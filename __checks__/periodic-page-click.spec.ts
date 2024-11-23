import { test, expect } from '@playwright/test';
1
const url = process.env.URL!;

test('Go To Periodic Table Page By Clicking on Button', async( { browser })=> {
    const context = await browser.newContext( { ignoreHTTPSErrors : true });
    const page = await context.newPage();
    const response = await page.goto(url);
    // close the welcome pop-up
    await page.getByRole('button', { name : 'Close'}).click();
    // close the walkthrough pop-up
    await page.getByLabel('SKIP').click();
    // await page.getByTestId('GO TO PERIODIC TABLE').click();
    await page.getByRole('button', { name : 'GO TO PERIODIC TABLE'}).click();
    expect(response?.status()).toBeLessThan(400);
    await page.screenshot({ path : '.screenshot.jpg'})
})
