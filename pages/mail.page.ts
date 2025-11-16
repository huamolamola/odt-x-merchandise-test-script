import { Page, Locator } from '@playwright/test';

export class MailinatorPage {
    readonly page: Page;
    readonly mailTo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mailTo = page.locator('.list-group.my-2 a:has-text("To: huajiti@mailinator.com")');

    }

    async navigateToInbox() {
        await this.page.goto('https://mailpit.odds.team/')
    }

    async clickTargetMail() {
        await this.mailTo.waitFor({ state: 'visible' });
        await this.mailTo.first().click();
    }
}