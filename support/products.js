import * as productElement from "../matchers/products";
import BasePage from "./basePage";

export class Products extends BasePage {

    async clickSelectItem(nth) {
        for (const product of await page.locator(`div.inventory_list > ${productElement.inventoryIitem}`).all()) {
            await this.click(product[nth]);
        }
    }

    async addToCart(itemId) {
        await this.click(productElement.addToCartButton(itemId));
    }

}