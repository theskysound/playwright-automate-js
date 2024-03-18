import { expect } from "@playwright/test";
import BasePage from "./basePage";
import * as shoppingCartElement from "../matchers/shoppingCart";

export class ShoppingCart extends BasePage {

    async getBackToShopping() {
        await this.click(shoppingCartElement.getBackToShoppingLink);
    }

    async toBeEmpty() {
        await expect(this.locator(shoppingCartElement.cartItem)).toHaveCount(0)
    }

}