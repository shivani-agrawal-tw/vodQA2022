import { Page } from "playwright";

export default class LoginPage {

    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    eleUsernameTextField = async () => await this.page.$("input[placeholder='Username']");

    elePasswordTextField = async () => await this.page.$("input[placeholder='Password']");

    public get eleLoginBtn() {
        return this.page.$("//input[@class='submit-button btn_action']")
    }

    public async enterUserName(name: string) {
        const ele = await this.eleUsernameTextField();
        await ele?.fill(name);
    }

    public async enterUserPassword(pass: string) {
        const ele = await this.elePasswordTextField();
        await ele?.fill(pass);
    }

    public async clickLoginBtn() {
        const ele = await this.eleLoginBtn;
        await ele?.click();
    }

    public async login(username: string, pass: string) {
        await this.enterUserName(username);
        await this.page.waitForTimeout(1000);
        await this.enterUserPassword(pass);
        await this.page.waitForTimeout(1000);
        await this.clickLoginBtn();
        await this.page.waitForTimeout(1000);
    }
}
