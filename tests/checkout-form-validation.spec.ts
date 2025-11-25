import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductListPage } from '../pages/product-list.page';
import { OrderSummaryPage } from '../pages/order-summary.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PurchaseSuccessPage } from '../pages/purchase-success.page';

test('TC011: Checkout with all valid information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkoutPage = new CheckoutPage(page);
    const purchaseSuccessPage = new PurchaseSuccessPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()
    await productListPage.addOneProductToCart()
    await productListPage.addAnotherProductToCart()
    await productListPage.clickToCartSummary()

    await orderSummaryPage.goToCheckoutPage()
    await checkoutPage.fillCheckoutForm('Geeky', 'Base', 'test@mailinator.com', '12345')
    await checkoutPage.clickConfirmPaymentButton()
    expect(await purchaseSuccessPage.thankYouForYourOrderMessage())
})

test('TC012: Checkout with invalid email domain', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()
    await productListPage.addOneProductToCart()
    await productListPage.addAnotherProductToCart()
    await productListPage.clickToCartSummary()

    await orderSummaryPage.goToCheckoutPage()
    await checkoutPage.fillCheckoutForm('Code', 'Git', 'test@gmail.com', '54321')
    await checkoutPage.clickConfirmPaymentButton()
    expect(await checkoutPage.errorMessageDisplay('We support only email address with domain mailinator.com.'))
})

test('TC013: Checkout with invalid zip code format ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()
    await productListPage.addOneProductToCart()
    await productListPage.addAnotherProductToCart()
    await productListPage.clickToCartSummary()

    await orderSummaryPage.goToCheckoutPage()
    await checkoutPage.fillCheckoutForm('Code', 'Git', 'test@mailinator.com', '543')
    await checkoutPage.clickConfirmPaymentButton()
    expect(await checkoutPage.errorMessageDisplay('We support only 5 digits zip code.'))
})

test('TC014: Checkout with empty required fields - First name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()
    await productListPage.addOneProductToCart()
    await productListPage.addAnotherProductToCart()
    await productListPage.clickToCartSummary()

    await orderSummaryPage.goToCheckoutPage()
    await checkoutPage.fillCheckoutForm('', 'Git', 'test@mailinator.com', '54321')
    await checkoutPage.clickConfirmPaymentButton()
    expect(await checkoutPage.errorMessageDisplay('First name is required.'))
})

test('TC014: Checkout with empty required fields - Last name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()
    await productListPage.addOneProductToCart()
    await productListPage.addAnotherProductToCart()
    await productListPage.clickToCartSummary()

    await orderSummaryPage.goToCheckoutPage()
    await checkoutPage.fillCheckoutForm('Code', '', 'test@mailinator.com', '54321')
    await checkoutPage.clickConfirmPaymentButton()
    expect(await checkoutPage.errorMessageDisplay('Last name is required.'))
})

test('TC014: Checkout with empty required fields - Email address', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()
    await productListPage.addOneProductToCart()
    await productListPage.addAnotherProductToCart()
    await productListPage.clickToCartSummary()

    await orderSummaryPage.goToCheckoutPage()
    await checkoutPage.fillCheckoutForm('Code', 'Git', '', '54321')
    await checkoutPage.clickConfirmPaymentButton()
    expect(await checkoutPage.errorMessageDisplay('Email address is required.'))
})

test('TC014: Checkout with empty required fields - Zip code', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()
    await productListPage.addOneProductToCart()
    await productListPage.addAnotherProductToCart()
    await productListPage.clickToCartSummary()

    await orderSummaryPage.goToCheckoutPage()
    await checkoutPage.fillCheckoutForm('Code', 'Git', 'test@mailinator.com', '')
    await checkoutPage.clickConfirmPaymentButton()
    expect(await checkoutPage.errorMessageDisplay('Zip code is required.'))
})

test('TC015: Checkout with zip code containing non-numeric characters', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()
    await productListPage.addOneProductToCart()
    await productListPage.addAnotherProductToCart()
    await productListPage.clickToCartSummary()

    await orderSummaryPage.goToCheckoutPage()
    await checkoutPage.fillCheckoutForm('Code', 'Git', 'test@mailinator.com', '12A45')
    await checkoutPage.clickConfirmPaymentButton()
    expect(await checkoutPage.errorMessageDisplay('We support only 5 digits zip code.'))
})



