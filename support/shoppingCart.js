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

    async removeItemFromCart(itemId) {
        await this.click(shoppingCartElement.removeItemButton(itemId));
    }

    async toHaveAmountOfItems(expectItemAmount) {
        let actualItemAmount;
        for (const item of await this.locator(shoppingCartElement.cartItem).all()) {
            actualItemAmount = await item.count()
        }
        expect(actualItemAmount).toEqual(expectItemAmount)
    }

    async completeCheckoutForm(firstName, lastName, postalCode) {
        await this.typeText(shoppingCartElement.firstNameInput, firstName.toString());
        await this.typeText(shoppingCartElement.lastNameInput, lastName.toString());
        await this.typeText(shoppingCartElement.postalCodeInput, postalCode.toString());
    }
    

}