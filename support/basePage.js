import { expect } from '@playwright/test';

export default class BasePage {
    constructor(page) {
        this.page = page;
        this.locator = (locatorElement) => page.getByTestId(locatorElement);
    }

    async click(el) {
        await this.locator(el).click();
    }

    async clearText(el) {
        await this.locator(el).clear();
    }

    async typeText(el, text) {
        await this.locator(el).fill(text);
    }

    async toBeVisible(el) {
        await expect(this.locator(el)).toBeVisible();
    }
}