import { Page } from "playwright";

export default class LogoutPage {

    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    eleMenuField = async () => await this.page.$("text=Open Menu");

    public get eleLogoutBtn() {
        return this.page.$("text=Logout")
    }

    public async openMenu() {
        const ele = await this.eleMenuField();
        await ele?.click();
    }

    public async clickLogoutBtn() {
        const ele = await this.eleLogoutBtn;
        await ele?.click();
    }

    public async logout() {
        await this.openMenu();
        await this.page.waitForTimeout(1000);
        await this.clickLogoutBtn();
    }
}