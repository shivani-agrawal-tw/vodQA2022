import { Browser, BrowserContext, chromium, Page } from "playwright";
import LoginPage from "../../page/login.page";
import LogoutPage from "../../page/logout.page";
import OrderPage from "../../page/order.page";
import Env from "../../utils/enviornment";

describe("TC1",() => {

    let browser : Browser;
    let context : BrowserContext;
    let page : Page;
    let login : LoginPage;
    let order : OrderPage;
    let logout : LogoutPage;

    beforeAll( async() => {
        browser = await chromium.launch({
            headless: false
        })
        context = await browser.newContext();
        page = await context.newPage();

        login = new LoginPage(page);
        order = new OrderPage(page);
        logout = new LogoutPage(page);

        await page.goto(Env.test);
        expect(await page.title()).toBe("Swag Labs");
    },100000)

    test('Place Order Positive_TS1', async() => {
        await login.login( "standard_user" , "secret_sauce");
        expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");

        await order.placeOrder("PlaywrightDemo" , "PlaywrightDemo" , "452005")
        expect(await page.$eval('#back-to-products', ele => ele.textContent)).toContain("Back Home");

        await logout.logout();
        expect(page.url()).toBe("https://www.saucedemo.com/");

    },150000)

    afterAll( async() => {
        await page.close()
        await context.close()
        await browser.close()
    },100000)
})