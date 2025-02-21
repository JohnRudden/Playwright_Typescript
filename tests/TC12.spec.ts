/*
Test Case 12: Add Products in Cart
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Products' button
5. Hover over first product and click 'Add to cart'
6. Click 'Continue Shopping' button
7. Hover over second product and click 'Add to cart'
8. Click 'View Cart' button
9. Verify both products are added to Cart
10. Verify their prices, quantity and total price
*/

import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test("Test Case 12: Add Products in Cart" , async ({page, navbarPage, productsPage, cartPage}) => {

  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com');
  })

  await test.step('Click on the "Products" button in the navigation bar ', async() => {
    await navbarPage.select('Products');
    expect(page.url()).toContain('products');
  })

  await test.step('Click on the "Products" button in the navigation bar ', async() => {
    await navbarPage.select('Products');
    expect(page.url()).toContain('products');
  })

  await test.step("Click on 'Product View' on the first product " , async() => {
    await page.waitForEvent('load');
    const firstProduct = (await productsPage.productItem().all())[0]
    await firstProduct.scrollIntoViewIfNeeded();
    await page.locator('.choose > .nav > li > a').first().hover();
    const addToCartBtn = firstProduct.locator('.overlay-content').getByText("Add to cart")
    await firstProduct.hover();
    await addToCartBtn.click();
    await productsPage.continueShoppingBtn().click();
});


await test.step("Click on 'Product View' on the second product " , async() => {
  const secondProduct = (await productsPage.productItem().all())[1]
  await page.locator('.choose > .nav > li > a').nth(1).hover();
  const addToCartBtn = secondProduct.locator('.overlay-content').getByText("Add to cart")
  await secondProduct.hover();
  await addToCartBtn.click();
  await productsPage.continueShoppingBtn().click();
});

await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    await page.waitForURL(/view_cart/, {waitUntil: "domcontentloaded"});
    expect(page.url()).toContain('view_cart')
});

await test.step("Check that there are 2 products in the cart " , async() => {
  expect((await cartPage.allProductTableRows()).length).toEqual(2);
});

await test.step("Verify their prices, quantity and total price", async () => {
  const firstProductRow = (await cartPage.allProductTableRows())[0]
  const secondProductRow = (await cartPage.allProductTableRows())[1]
  await expect(firstProductRow.locator('.cart_price')).toContainText('Rs. 500');
  await expect(firstProductRow.locator('.cart_quantity')).toContainText('1');
  await expect(firstProductRow.locator('.cart_total_price')).toContainText('Rs. 500');
  await expect(secondProductRow.locator('.cart_price')).toContainText('Rs. 400');
  await expect(secondProductRow.locator('.cart_quantity')).toContainText('1');
  await expect(secondProductRow.locator('.cart_total_price')).toContainText('Rs. 400');
});
});