import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductListPage } from '../pages/product-list.page';

test('TC001: Login with valid credentials (customer1)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    expect(productListPage.productListPageIsVisible)
})

test('TC001: Login with valid credentials (customer2)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer2', 'password')
    expect(productListPage.productListPageIsVisible)
})

test('TC003: Login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('invaliduser', 'password')
    expect(loginPage.errorMessageIsDisplayed('Invalid username or password.'))
})

test('TC004: Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'wrongpassword')
    expect(loginPage.errorMessageIsDisplayed('Invalid username or password.'))
})

test('TC005: Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithoutUsernameAndPassword('', '')
    expect(loginPage.errorMessageIsDisplayed('Invalid username or password.'))
})