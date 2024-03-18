import { test, expect } from "@playwright/test";
import { baseUrl, password, usernames } from "../utils/constants";
import { Login } from "../support/login";
import { Navbar } from "../support/navbar";
import { ShoppingCart } from "../support/shoppingCart";
import * as loginElement from "../matchers/login";
import * as navBarElement from "../matchers/navbar"

test.describe('shopping cart', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
        const loginPage = new Login(page);
        await loginPage.login(usernames.standart, password);
        await loginPage.click(loginElement.loginButton);
      });

    test('shopping cart is empty', async ({ page }) => {
        const navBar = new Navbar(page);
        await navBar.click(navBarElement.shoppingCartLink);
        await navBar.toBeOnPage("Your Cart");
        const shoppingCart = new ShoppingCart(page);
        await shoppingCart.toBeEmpty();
    });

});