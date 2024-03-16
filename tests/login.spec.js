import { test, expect } from "@playwright/test";
import { baseUrl, password, usernames } from "../utils/constants";
import { Login } from "../support/login";
import { Navbar } from "../support/navbar";

test.describe('login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
      });

    test('validation of login page', async ({ page }) => {
        const loginPage = new Login(page);
        await loginPage.toBeVisible("#user-name");
        await loginPage.toBeVisible("#password");
        await loginPage.toBeVisible("#login-button");
    });

    test('login with standart user', async ({ page }) => {
        const loginPage = new Login(page);
        await loginPage.login(usernames.standart, password);
        await loginPage.click("#login-button");

        const navBar = new Navbar(page);
        await navBar.toBeOnPage("Products"); //assert customer is redireted to Products page
    });

    test('login without providing username', async ({ page }) => {
        const loginPage = new Login(page);
        await loginPage.login("", password);
        await loginPage.click("#login-button");
        await loginPage.toBeVisible("div.error-message-container.error > h3");
        await loginPage.toHaveText("div.error-message-container.error > h3", "Epic sadface: Username is required");
    });

    test('login without providing password', async ({ page }) => {
        const loginPage = new Login(page);
        await loginPage.login(usernames.standart, "");
        await loginPage.click("#login-button");
        await loginPage.toBeVisible("div.error-message-container.error > h3");
        await loginPage.toHaveText("div.error-message-container.error > h3", "Epic sadface: Password is required");
    });

    test('login with unknown user', async ({ page }) => {
        const loginPage = new Login(page);
        await loginPage.login("test", password);
        await loginPage.click("#login-button");
        await loginPage.toBeVisible("div.error-message-container.error > h3");
        await loginPage.toHaveText("div.error-message-container.error > h3", "Epic sadface: Username and password do not match any user in this service");
    });

    test('login with locked user', async ({ page }) => {
        const loginPage = new Login(page);
        await loginPage.login(usernames.locked, password);
        await loginPage.click("#login-button");
        await loginPage.toBeVisible("div.error-message-container.error > h3");
        await loginPage.toHaveText("div.error-message-container.error > h3", "Epic sadface: Sorry, this user has been locked out.");
    });

    test('logout', async ({ page }) => {
        const loginPage = new Login(page);
        await loginPage.login(usernames.standart, password);
        await loginPage.click("#login-button");

        const navBar = new Navbar(page);
        await navBar.toBeVisible("#react-burger-menu-btn");
        await navBar.logout();
        await loginPage.toBeVisible("#login-button")
    });
})


/* test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Swag Labs/);
});
 */

