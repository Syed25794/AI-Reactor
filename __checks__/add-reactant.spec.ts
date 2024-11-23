import { test , expect } from '@playwright/test';

const url = process.env.URL!;

test('Add the reactant', async( { browser } )=> {
    const context = await browser.newContext({ ignoreHTTPSErrors: true});
    const page = await context.newPage();
    const response = await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
    // close the welcome pop-up
    await page.getByRole('button', { name : 'Close'}).click();
    // close the walkthrough pop-up
    page.getByRole('button', { name : 'SKIP'}).click();

    // close the login pop-up
    page.getByRole('button', { name : 'SKIP'}).click();
    const button = page.getByRole('button', { name : 'ADD REACTANT'});
    // const button = page.locator('#addReactant button');
    button.click();
    // await page.waitForSelector('#addReactant button');
    expect(response?.status()).toBeLessThan(400);
    await page.screenshot({ path : './screenshot.jpg'});
})