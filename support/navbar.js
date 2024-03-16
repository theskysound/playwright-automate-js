import { expect } from "@playwright/test";
import BasePage from "./basePage";
import * as navBarElement from "../matchers/navbar";

export class Navbar extends BasePage {
    
    async toBeOnPage(titlePage) {
        expect(await this.getCurrentPageNavTitle()).toEqual(titlePage.toString());
    }

    async logout() {
        await this.click(navBarElement.openBurgerMenu);
        await this.click(navBarElement.logoutLink);
    }

}