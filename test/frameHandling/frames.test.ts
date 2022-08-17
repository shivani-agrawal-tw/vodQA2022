import { Browser, BrowserContext, chromium, Page } from "playwright";

describe("Frames Handling",() => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;

    beforeAll( async() => {
        browser = await chromium.launch({
            headless: true
        })
        context = await browser.newContext();

        context = await browser.newContext({
            recordVideo: {
                dir : "./videos/",
                size :{
                    width: 800,
                    height: 600
                }
            }
        });

        page = await context.newPage();
        await page.goto('https://demoqa.com/nestedframes');
        await page.waitForLoadState();
        expect(page.url()).toContain("nestedframes");
    },100000)

    test('Frames Handling', async() => {
        const allFrames = page.frames();
        console.log("No of frames in page is:" + allFrames.length);

        //Outer Frame
        const parentframe = page.frame({ name: "frame1" });
        if (parentframe != null) {
            expect(await parentframe.$eval('body', ele => ele.textContent)).toBe("Parent frame");
            
            //Inner Frame
            const childframe = parentframe.childFrames();
            console.log("No of child frames are:" + childframe.length);

            if (childframe != null){
                expect(await childframe[0].$eval('body', ele => ele.textContent)).toBe("Child Iframe");
            }
            else{
                console.log("Wrong frame");
            }
        }else throw new Error("No such frame") 

        /* await page.pdf({ path: "./pdfs/document.pdf"});
        await page.screenshot({ path: "./screenshots/screenshot.png" , fullPage : true}) */ 

    },100000)
    

    afterAll( async() => {
        await page.close()
        await context.close()
        await browser.close()
    },100000)
})