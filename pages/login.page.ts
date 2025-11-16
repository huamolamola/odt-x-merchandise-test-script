import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly errorMessage: Locator;
    readonly loginButton: Locator;
    readonly usernameInputField: Locator;
    readonly passwordInputField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorMessage = page.getByTestId('error-message-label')
        this.loginButton = page.getByTestId('submit-button')
        this.usernameInputField = page.getByTestId('login-field')
        this.passwordInputField = page.getByTestId('password-field')
    }

    async openMerchandiseWebsite() {
        await this.page.goto('https://merchandise-dev.odds.team/');
    }

    async loginWithUsernameAndPassword(username: string, password: string) {
        await this.usernameInputField.fill(username);
        await this.passwordInputField.fill(password);
        await this.loginButton.click();
    }

    async loginWithoutUsernameAndPassword() {
        await this.loginButton.click();
    }

    async errorMessageIsDisplayed(message: string) {
        await this.errorMessage.isVisible()
    }
}