import { Locator, Page } from '@playwright/test';

export class OrderSummaryPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly subTotalPrice: Locator;
    readonly continueShoppingButton: Locator;
    readonly noItemInCartText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByTestId('checkout-button')
        this.subTotalPrice = page.getByTestId('subtotal-price')
        this.continueShoppingButton = page.getByTestId('continue-shopping-link')
        this.noItemInCartText = page.getByTestId('empty-cart-container')
    }

    async clickCheckoutButton() {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click();
    }

    async displaySubTotalPrice(amount: string) {
        await this.subTotalPrice.isVisible()
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
}