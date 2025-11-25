import { Page, Locator } from '@playwright/test';

export class PurchaseSuccessPage {
    readonly page: Page;
    readonly thankyouMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.thankyouMessage = page.getByTestId('thank-you-container')
    }

    async thankYouForYourOrderMessage() {
        await this.thankyouMessage.isVisible();
    }
}
