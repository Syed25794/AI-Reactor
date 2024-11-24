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
    // page.getByRole('button', { name : 'SKIP'}).click();

    await page.getByLabel('SKIP').click();
    // const button = page.getByRole('button', { name : 'ADD REACTANT'});
    const button = page.locator('#addReactant button');
    await page.waitForSelector('#addReactant button');
    button.click();
    // close the login pop-up
    await page.getByRole('button', { name : 'SKIP'}).click();

    await page.locator('input[type="text"][name="name"]').fill('Sulphuric Acid')
    await page.locator('input[type="text"][name="formula"]').fill('H2SO4');

    await page.getByRole("button", { name: 'SAVE REACTANT'}).click();

    const updateButton = page.getByRole('button', { name : 'Update Reactant'});

    await expect(updateButton).toBeVisible();
    expect(response?.status()).toBeLessThan(400);
    await page.screenshot({ path : './screenshot.jpg'});
})