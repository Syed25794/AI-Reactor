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
new BrowserCheck('browser-check-3', {
    name: 'Go To Periodic Table Page By Clicking on Button',
    group, 
    frequency: Frequency.EVERY_24H,
    code: { entrypoint: path.join(__dirname, './periodic-page-click.spec.ts')}
})


//close the welcome page
new BrowserCheck('browser-check-5', {
    name: 'Close the welcome pop-up and walkthrough pop-up',
    group,
    frequency : Frequency.EVERY_24H,
    code: { entrypoint : path.join(__dirname, './close-welcome.spec.ts')}
})

// add the reactant
new BrowserCheck('browser-check-4',{
    name: 'Add the reactant',
    group,
    frequency : Frequency.EVERY_24H,
    code : { entrypoint : path.join(__dirname,'./add-reactant.spec.ts')}
})