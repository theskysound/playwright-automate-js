import { expect } from "@playwright/test";
import BasePage from "./basePage";

export class Navbar extends BasePage {
    
    async toBeOnPage(titlePage) {
        expect(await this.getCurrentPageNavTitle()).toEqual(titlePage.toString());
    }

    async logout() {
        await this.click("button#react-burger-menu-btn");
        await this.click("#logout_sidebar_link");
    }

}