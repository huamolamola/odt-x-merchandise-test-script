import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly postalCodeInput: Locator;
    readonly confirmPaymentButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('input[id="firstname-field"]')
        this.lastNameInput = page.locator('input[id="lastname-field"]')
        this.emailInput = page.locator('input[id="email-field"]')
        this.postalCodeInput = page.locator('input[id="zipcode-field"]')
        this.confirmPaymentButton = page.getByTestId('confirm-payment-button')
    }

    async fillCheckoutForm(firstName: string, lastName: string, email: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.postalCodeInput.fill(postalCode);
    }
}