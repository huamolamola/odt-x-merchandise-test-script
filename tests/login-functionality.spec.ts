import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductListPage } from '../pages/product-list.page';

test('User can login with valid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    expect(productListPage.productListPageIsVisible)
})

test('User can login with another valid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer2', 'password')
    expect(productListPage.productListPageIsVisible)
})

test('User cannot login with invalid username but correct password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('invaliduser', 'password')
    expect(loginPage.errorMessageIsDisplayed('Invalid username or password.'))
})

test('User cannot login with valid username but incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'wrongpassword')
    expect(loginPage.errorMessageIsDisplayed('Invalid username or password.'))
})

test('User cannot login without username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithoutUsernameAndPassword()
    expect(loginPage.errorMessageIsDisplayed('Invalid username or password.'))
})