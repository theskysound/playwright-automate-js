import { test, expect } from "@playwright/test";
import { baseUrl, password, usernames } from "../utils/constants";
import { Login } from "../support/login";
import { Navbar } from "../support/navbar";
import { ShoppingCart } from "../support/shoppingCart";
import * as loginElement from "../matchers/login";
import * as navBarElement from "../matchers/navbar"
import { Products } from "../support/products";
import * as productElement from "../matchers/products";

test.describe('products page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
        const loginPage = new Login(page);
        await loginPage.login(usernames.standart, password);
        await loginPage.click(loginElement.loginButton);
        const navBar = new Navbar(page);
        await navBar.toBeOnPage("Products");
      });

    test('products are visible and not empty', async ({ page }) => {
        for (const product of await page.locator(`div.inventory_list > ${productElement.inventoryIitem}`).all()) {
            await product.isVisible()
            await expect(product.locator(productElement.inventoryItemName)).not.toBeEmpty();
            await expect(product.locator(productElement.inventoryItemDesc)).not.toBeEmpty();
            await expect(product.locator(productElement.inventoryItemPrice)).not.toBeEmpty();
        }
    });

    test('add to cart button', async ({ page }) => {
        const product = new Products(page);
        await product.toHaveText(productElement.addToCartButton('add-to-cart-sauce-labs-backpack'), 'Add to cart');
        await product.addToCart('add-to-cart-sauce-labs-backpack');
        await product.toHaveText(productElement.addToCartButton('add-to-cart-sauce-labs-backpack'), 'Remove');
    });

    test('add item to shopping cart', async ({ page }) => {
        const product = new Products(page);
        await product.addToCart('add-to-cart-sauce-labs-backpack');
        const navBar = new Navbar(page);
        await navBar.toHaveItemsInShoppingCart(1);
    });
})