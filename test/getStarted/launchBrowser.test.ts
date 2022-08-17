import { chromium , devices } from "playwright";

describe('Launch Browser', () => {

    test('Open Saucedemo website', async () => {

        //Open browser chromium, firefox or webkit 
        const browser = await chromium.launch({
            headless: false
        })

        //Create browser context
        const context = await browser.newContext()

        /*const context = await browser.newContext({
            ...devices['iPad Mini']
        })*/

        //Open new page
        const page = await context.newPage();

        //Go to https://www.saucedemo.com/
        await page.goto("https://www.saucedemo.com/");
        
        //Assert on page title once loaded
        console.log("Page Title is:" + await page.title());
        expect(await page.title()).toBe("Swag Labs");
        await page.waitForTimeout(1000);

        await page.fill("input[placeholder='Username']", "standard_user");
        await page.fill("input[placeholder='Password']", "secret_sauce");
        await page.waitForTimeout(1000);

        await page.click("//input[@class='submit-button btn_action']");
        expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
        await page.waitForTimeout(1000);

        await page.click("text=Open Menu");
        await page.click("text=Logout");
        expect(await page.title()).toBe("Swag Labs");
        await page.waitForTimeout(1000);

        //Close page , context and browser
        await page.close()
        await context.close()
        await browser.close()

    },100000)

})