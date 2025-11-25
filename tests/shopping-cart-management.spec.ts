import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductListPage } from '../pages/product-list.page';
import { OrderSummaryPage } from '../pages/order-summary.page';
import { CheckoutPage } from '../pages/checkout.page';

test('TC006: Add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()

    await productListPage.addOneProductToCart()
    expect(await productListPage.itemInCart('1'))
})

test('TC007: Update product quantity in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);
    const checkOutPage = new CheckoutPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()

    await productListPage.addTwoProductToCart()
    await productListPage.itemInCart('2')
    await productListPage.clickToCartSummary()
    await orderSummaryPage.displaySubTotalPrice('285.89')
    await orderSummaryPage.backToProductListPage()

    await productListPage.removeOneProductFromCart()
    expect(await productListPage.itemInCart('1'))

    await productListPage.clickToCartSummary()
    expect(await orderSummaryPage.displaySubTotalPrice('206.20'))

    await orderSummaryPage.goToCheckoutPage()
    expect(await checkOutPage.calculatedTotalPrice('220.63'))
})

test('TC008: Remove product from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()

    await productListPage.addOneProductToCart()
    await productListPage.itemInCart('1')
    await productListPage.clickToCartSummary()
    await orderSummaryPage.displaySubTotalPrice('285.89')
    await orderSummaryPage.backToProductListPage()

    await productListPage.removeOneProductFromCart()

    await productListPage.clickToCartSummary()
    expect(await orderSummaryPage.displaySubTotalPrice('0.00'))
    expect(await orderSummaryPage.noItemToCheckoutMessage('No item in cart.'))
})


test('TC009: View empty cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer2', 'password')
    await productListPage.productListPageIsVisible()

    await productListPage.addOneProductToCart()
    await productListPage.itemInCart('1')
    await productListPage.clickToCartSummary()
    await orderSummaryPage.displaySubTotalPrice('285.89')
    await orderSummaryPage.backToProductListPage()

    await productListPage.removeOneProductFromCart()
    expect(await productListPage.itemInCart('0'))

    await productListPage.clickToCartSummary()
    expect(await orderSummaryPage.displaySubTotalPrice('0.00'))
    expect(await orderSummaryPage.noItemToCheckoutMessage('No item in cart.'))
})

test('TC010: Add multiple products to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productListPage = new ProductListPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);

    await loginPage.openMerchandiseWebsite();
    await loginPage.loginWithUsernameAndPassword('customer1', 'password')
    await productListPage.productListPageIsVisible()

    await productListPage.addOneProductToCart()
    expect(await productListPage.itemInCart('1'))

    await productListPage.addAnotherProductToCart()
    expect(await productListPage.itemInCart('2'))

    await productListPage.clickToCartSummary()

    expect(await orderSummaryPage.getCalculatedPrice())
        .toEqual(await orderSummaryPage.getSubTotalPrice());

})