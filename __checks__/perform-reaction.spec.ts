import { test, expect } from '@playwright/test';

const url = process.env.URL!;

test('Perform the reaction', async( { browser } ) => {
    test.setTimeout(120000)
    const context = await browser.newContext({ ignoreHTTPSErrors : true });
    const page = await context.newPage();
    const response = await page.goto(url);
    // close the welcome pop-up
    await page.getByRole('button', { name : 'Close'}).click();

    // close the walkthrough pop-up
    await page.getByRole('button', { name : 'SKIP'}).click();
    
    const reactants = [
        { name : 'Hydrogen', formula : 'H2'},
        { name : 'Nitrogen', formula : 'N2'}
    ]
    
    for( let reactant of reactants){
        // click on ADD REACTANT button
        const button = page.locator('#addReactant button');
        button.click();
        // fill the name and formula of the reactant
        await page.locator('input[type="text"][name="name"]').fill(reactant.name);
        await page.locator('input[type="text"][name="formula"]').fill(reactant.formula);
    
        // add the reactant
        await page.getByRole('button', { name : 'SAVE REACTANT'}).click();

        if( reactant.formula === 'H2' ){
            // if login pop-up open then close it
            const loginPopUp = page.getByRole('button', { name : 'SKIP'});
            const loginPopUpOpened = expect(loginPopUp).toBeNull === null ? false : true;
            if( loginPopUpOpened ){
                loginPopUp.click();
            }
            // const updateButton = page.getByRole('button', { name : 'Update Reactant'});
    
            // await expect(updateButton).toBeVisible();
        }
    }

    await page.getByRole('button', { name : 'Perform Reaction'}).click();
    // const updateButton = page.getByRole('button', { name : 'Update Reactant'});
    
    // await expect(updateButton).toBeVisible();
    expect(response?.status()).toBeLessThan(500);
    await page.screenshot({ path : 'screenshot.jpg'});
})