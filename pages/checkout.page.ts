import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly postalCodeInput: Locator;
    readonly confirmPaymentButton: Locator;
    readonly totalPriceText: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('firstname-field')
        this.lastNameInput = page.getByTestId('lastname-field')
        this.emailInput = page.getByTestId('email-field')
        this.postalCodeInput = page.getByTestId('zipcode-field')
        this.confirmPaymentButton = page.getByTestId('confirm-payment-button')
        this.totalPriceText = page.getByTestId('total-price')
        this.errorMessage = page.getByTestId('error-message')
    }

    async fillCheckoutForm(firstName: string, lastName: string, email: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.postalCodeInput.fill(postalCode);
    }

    async calculatedTotalPrice(amount: string) {
        await this.totalPriceText.isVisible();
    }

    async clickConfirmPaymentButton() {
        await this.confirmPaymentButton.click();
    }

    async errorMessageDisplay(message: string) {
        await this.errorMessage.isVisible();
    }
}