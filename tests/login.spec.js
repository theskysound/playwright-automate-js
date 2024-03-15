import { test, expect } from "@playwright/test";
import { baseUrl, password, usernames } from "../utils/constants";
import { Login } from "../support/login";

test.describe('login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
      });

    test('validation of login page', async ({ page }) => {
        const loginPage = new Login(page)
        await loginPage.toBeVisible("username");
        await loginPage.toBeVisible("password");
        await loginPage.toBeVisible("login-button");
    });

    test('login with standart user', async ({ page }) => {
        const loginPage = new Login(page)
        await loginPage.login(usernames.standart, password)
        await loginPage.click("login-button");
    });
})


/* test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Swag Labs/);
});
 */

