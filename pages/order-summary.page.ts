import { Locator, Page } from '@playwright/test';

export class OrderSummaryPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly subTotalPrice: Locator;
    readonly continueShoppingButton: Locator;
    readonly noItemInCartText: Locator;
    readonly priceText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByTestId('checkout-button')
        this.subTotalPrice = page.getByTestId('subtotal-price')
        this.continueShoppingButton = page.getByTestId('continue-shopping-link')
        this.noItemInCartText = page.getByTestId('empty-cart-container')
        this.priceText = page.getByTestId('price')
    }

    async clickCheckoutButton() {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click();
    }

    async displaySubTotalPrice(price: string) {
        await this.subTotalPrice.isVisible();

    }
    async getSubTotalPrice() {
        await this.subTotalPrice.isVisible();
        const text = await this.subTotalPrice.innerText();
        return parseFloat(text.replace(/[^0-9.]/g, ""));
    }

    async backToProductListPage() {
        await this.continueShoppingButton.first().click()
    }

    async goToCheckoutPage() {
        await this.checkoutButton.click()
    }

    async noItemToCheckoutMessage(message: string) {
        await this.noItemInCartText.isVisible()
    }

    async firstProductPrice() {
        await this.priceText.first().isVisible()
    }

    async secondProductPrice() {
        await this.priceText.nth(1).isVisible()
    }

    async getCalculatedPrice() {
        const firstText = (await this.priceText.first().innerText());
        const secondText = (await this.priceText.nth(1).innerText());

        const firstPrice = parseFloat(firstText.replace(/[^0-9.]/g, ""));
        const secondPrice = parseFloat(secondText.replace(/[^0-9.]/g, ""));

        return firstPrice + secondPrice;
    }
}