import { Browser, BrowserContext, chromium, Page } from "playwright";

describe("Window Handling",() => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;

    beforeAll( async() => {
        browser = await chromium.launch({
            headless: false
        })
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://demoqa.com/browser-windows');
        await page.waitForLoadState();
        expect(page.url()).toContain("browser-windows");
        await page.waitForTimeout(1000)
    },100000)

    test('Multiple Page Handling', async() => {
        //Click on new tab button
        const [newTab] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#tabButton")
        ])
        await newTab.waitForLoadState();
        expect(await newTab.$eval('body', ele => ele.textContent)).toContain("sample");
        await newTab.waitForTimeout(1000);

        //Click on new window message button from first tab
        await page.bringToFront();
        await page.waitForTimeout(1000);

        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#messageWindowButton")
        ])
        await newWindow.waitForLoadState();
        await newWindow.waitForTimeout(1000);
        expect(await newWindow.$eval('body', ele => ele.textContent)).toContain("Knowledge");
        
        //Switching between windows
        const allwindows = page.context().pages();
        console.log("no.of windows: " + allwindows.length);
        allwindows.forEach(page => {
            console.log(page.url());
        });
        await allwindows[2].close();
        await page.waitForTimeout(1000);
        await allwindows[1].close();
        await page.waitForTimeout(1000);
        
    },100000)

    afterAll( async() => {
        await page.close()
        await context.close()
        await browser.close()
    },100000)
})