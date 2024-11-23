import { BrowserCheck , CheckGroup, Frequency} from 'checkly/constructs'
import path from 'path'

const group = new CheckGroup('Browser-Group',{
    name: 'AI-Reactor-Browser-Checks',
})

// check for loading home page
new BrowserCheck('browser-check-1',{
    name: 'Go To Home Page',
    group,
    frequency: Frequency.EVERY_24H,
    code: { entrypoint: path.join(__dirname, './homepage.spec.ts')}
})

// check for loading periodic table page
new BrowserCheck('browser-check-2', {
    name: 'Go To Periodic Table Page',
    group,
    frequency: Frequency.EVERY_24H,
    code: { entrypoint : path.join(__dirname, './periodic-page.spec.ts')}
})

// check for going periodic table page by clicking on button
// new BrowserCheck('browser-check-3', {
//     name: 'Go To Periodic Table Page By Clicking on Button',
//     group, 
//     code: { entrypoint: path.join(__dirname, './goto-periodic-page.spec.ts')}
// })
// import { test, expect } from '@playwright/test';
// 1
// const url = process.env.URL!;

// test('Go To Periodic Table Page By Clicking on Button', async( { browser })=> {
//     const context = await browser.newContext( { ignoreHTTPSErrors : true });
//     const page = await context.newPage();
//     const response = await page.goto(url);
//     await page.getByTestId('GO TO PERIODIC TABLE').click();
//     // await page.getByRole('button', { name : 'GO TO PERIODIC TABLE'}).click();
//     expect(response?.status()).toBeLessThan(400);
//     await page.screenshot({ path : '.screenshot.jpg'})
// })

// test.setTimeout(300000);

//close the welcome page
new BrowserCheck('browser-check-5', {
    name: 'Close the welcome pop-up',
    group,
    frequency : Frequency.EVERY_24H,
    code: { entrypoint : path.join(__dirname, './close-welcome.spec.ts')}
})

// change language
new BrowserCheck('browser-check-4',{
    name: 'Add the reactant',
    group,
    frequency : Frequency.EVERY_24H,
    code : { entrypoint : path.join(__dirname,'./add-reactant.spec.ts')}
})