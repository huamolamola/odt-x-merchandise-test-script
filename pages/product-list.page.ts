import { Page, Locator } from '@playwright/test';

export class ProductListPage {
    readonly page: Page;
    readonly shopTitle: Locator;
    readonly addToCartButton: Locator;
    readonly cartItemCount: Locator;
    readonly cart: Locator;
    readonly removeAddedProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByTestId('add-to-cart-button');
        this.shopTitle = page.getByTestId('shop-title');
        this.cart = page.getByTestId('cart').locator('#Layer_1');
        this.cartItemCount = page.getByTestId('cart-items-count')
        this.removeAddedProduct = page.getByTestId('remove-from-cart-button')
    }

    async productListPageIsVisible() {
        await this.shopTitle.waitFor({ state: 'visible' });
    }
    async addOneProductToCart() {
        await this.addToCartButton.first().click();
    }

    async addTwoProductToCart() {
        await this.addToCartButton.first().click();
        await this.addToCartButton.nth(1).click();
    }

    async removeOneProductFromCart() {
        await this.removeAddedProduct.first().click()
    }

    async itemInCart(count: string) {
        await this.cartItemCount.isVisible()
    }

    async clickToCartSummary() {
        await this.cart.click();
    }

}