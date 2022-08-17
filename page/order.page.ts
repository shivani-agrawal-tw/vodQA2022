import { Page } from "playwright";

export default class OrderPage {

    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    public get eleAddToCartBtn() {
        return this.page.$('//*[@id="add-to-cart-sauce-labs-backpack"]')
    }

    public get eleGoToCartBtn() {
        return this.page.$('//*[@id="shopping_cart_container"]/a')
    }

    public get eleCheckoutBtn() {
        return this.page.$('//*[@id="checkout"]')
    }

    eleFirstNameTextField = async () => await this.page.$('//*[@id="first-name"]');
    eleLastNameTextField = async () => await this.page.$('//*[@id="last-name"]');
    eleZipCodeTextField = async () => await this.page.$('//*[@id="postal-code"]');

    public get eleContinueBtn() {
        return this.page.$('//*[@id="continue"]')
    }

    public get eleFinishBtn() {
        return this.page.$('//*[@id="finish"]')
    }

    public async clickAddToCart() {
        const ele = await this.eleAddToCartBtn;
        await ele?.click();
    }

    public async clickCartIcon() {
        const ele = await this.eleGoToCartBtn;
        await ele?.click();
    }

    public async clickCheckoutBtn() {
        const ele = await this.eleCheckoutBtn;
        await ele?.click();
    }

    public async enterFirstName(firstname: string) {
        const ele = await this.eleFirstNameTextField();
        await ele?.fill(firstname);
    }

    public async enterLastName(lastname: string) {
        const ele = await this.eleLastNameTextField();
        await ele?.fill(lastname);
    }

    public async enterZipCode(zip: string) {
        const ele = await this.eleZipCodeTextField();
        await ele?.fill(zip);
    }

    public async clickContinueBtn() {
        const ele = await this.eleContinueBtn;
        await ele?.click();
    }

    public async clickFinishBtn() {
        const ele = await this.eleFinishBtn;
        await ele?.click();
    }

    public async placeOrder(firstname: string, lastname: string, zip: string) {
        await this.clickAddToCart();
        await this.page.waitForTimeout(1000);
        await this.clickCartIcon();
        await this.page.waitForTimeout(1000);
        await this.clickCheckoutBtn();
        await this.page.waitForTimeout(1000);
        await this.enterFirstName(firstname);
        await this.page.waitForTimeout(1000);
        await this.enterLastName(lastname);
        await this.page.waitForTimeout(1000);
        await this.enterZipCode(zip);
        await this.page.waitForTimeout(1000);
        await this.clickContinueBtn();
        await this.page.waitForTimeout(1000);
        await this.clickFinishBtn();
        await this.page.waitForTimeout(1000);
    }

}