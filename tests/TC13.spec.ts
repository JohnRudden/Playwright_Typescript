/*
Test Case 13: Verify Product quantity in Cart
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'View Product' for any product on home page
5. Verify product detail is opened
6. Increase quantity to 4
7. Click 'Add to cart' button
8. Click 'View Cart' button
9. Verify that product is displayed in cart page with exact quantity
*/

import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

let productCapture : string[] = [];

test("Test Case 13: Verify Product quantity in Cart" , async ({page, navbarPage, productDetailPage, productsPage, cartPage}) => {

  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step('Click on the "Products" button in the navigation bar ', async() => {
    await navbarPage.select('Products')
    expect(page.url()).toContain('products')
  })

  await test.step('Click on the "Products" button in the navigation bar ', async() => {
    await navbarPage.select('Products')
    expect(page.url()).toContain('products')
  })

  await test.step("Click on 'Product View' on any random product " , async() => {
    const item = await productsPage.selectRandomProduct();
    const productName = await item.locator('.productinfo').locator('p').textContent();
    productCapture.push(await productName);
    await item.locator('..').locator('li > a').click()
});

  await test.step("Increase quantity to 4 and add to cart " , async ()=> {
    await productDetailPage.quantity.fill('4');
    await page.waitForLoadState('load');
    await productDetailPage.addToCart.click();
    const modalPromise = page.waitForResponse(/add_to_cart/);
    await productsPage.continueShoppingBtn.click();
    const fulfilled = await modalPromise
  })

  await test.step("View cart and verify product and quantity" , async () => {
      await navbarPage.select('Cart')
      await page.waitForURL(/view_cart/, {waitUntil: "domcontentloaded"});
      expect(page.url()).toContain('view_cart')
      expect(await (await cartPage.allProductTableRows())[0].locator('.cart_description > h4 a').textContent()).toContain(productCapture[0]);
      expect(await (await cartPage.allProductTableRows())[0].locator('.cart_quantity').textContent()).toContain('4');
  })
})
