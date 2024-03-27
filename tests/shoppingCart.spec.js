import { test, expect } from "@playwright/test";
import { baseUrl, password, usernames } from "../utils/constants";
import { Login } from "../support/login";
import { Navbar } from "../support/navbar";
import { ShoppingCart } from "../support/shoppingCart";
import * as loginElement from "../matchers/login";
import * as navBarElement from "../matchers/navbar"
import { Products } from "../support/products";
import * as shoppingCartElement from "../matchers/shoppingCart";

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

    test('add item to shopping cart', async ({ page }) => {
        const product = new Products(page);
        await product.addToCart('add-to-cart-sauce-labs-backpack');
        const navBar = new Navbar(page);
        await navBar.click(navBarElement.shoppingCartLink);
        const shoppingCart = new ShoppingCart(page);
        await shoppingCart.toHaveAmountOfItems(1);
    });

    test('remove item from shopping cart', async ({ page }) => {
        const product = new Products(page);
        await product.addToCart('add-to-cart-sauce-labs-backpack');
        const navBar = new Navbar(page);
        await navBar.click(navBarElement.shoppingCartLink);
        const shoppingCart = new ShoppingCart(page);
        await shoppingCart.removeItemFromCart('remove-sauce-labs-backpack');
        await shoppingCart.toBeEmpty();
        await navBar.toNotHaveItemsInShoppingCart();
    });

    test('finalize checkout', async ({ page }) => {
        const product = new Products(page);
        await product.addToCart('add-to-cart-sauce-labs-backpack');

        const navBar = new Navbar(page);
        await navBar.click(navBarElement.shoppingCartLink);

        const shoppingCart = new ShoppingCart(page);
        await shoppingCart.toBeVisible(shoppingCartElement.checkoutButton);
        await shoppingCart.click(shoppingCartElement.checkoutButton);

        await navBar.toBeOnPage("Checkout: Your Information");
        await shoppingCart.completeCheckoutForm('John', 'Doe', 'MD-32541');
        await shoppingCart.toBeVisible(shoppingCartElement.continueButton);
        await shoppingCart.click(shoppingCartElement.continueButton);

        await navBar.toBeOnPage("Checkout: Overview");
        await shoppingCart.toBeVisible(shoppingCartElement.finalizeButton);
        await shoppingCart.click(shoppingCartElement.finalizeButton);

        await navBar.toBeOnPage("Checkout: Complete!");
        await shoppingCart.toBeVisible(shoppingCartElement.getBackToProductsButton);
        await navBar.toNotHaveItemsInShoppingCart();
    });

    test('cancel checkout', async ({ page }) => {
        const product = new Products(page);
        await product.addToCart('add-to-cart-sauce-labs-backpack');

        const navBar = new Navbar(page);
        await navBar.click(navBarElement.shoppingCartLink);

        const shoppingCart = new ShoppingCart(page);
        await shoppingCart.toBeVisible(shoppingCartElement.checkoutButton);
        await shoppingCart.click(shoppingCartElement.checkoutButton);

        await navBar.toBeOnPage("Checkout: Your Information");
        await shoppingCart.completeCheckoutForm('John', 'Doe', 'MD-32541');
        await shoppingCart.toBeVisible(shoppingCartElement.continueButton);
        await shoppingCart.click(shoppingCartElement.continueButton);

        await navBar.toBeOnPage("Checkout: Overview");
        await shoppingCart.toBeVisible(shoppingCartElement.cancelButton);
        await shoppingCart.click(shoppingCartElement.cancelButton);

        await navBar.toBeOnPage("Products");
        await navBar.toHaveItemsInShoppingCart(1);
    });

});