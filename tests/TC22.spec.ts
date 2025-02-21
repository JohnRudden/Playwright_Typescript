
/*
Test Case 22: Add to cart from Recommended items
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Scroll to bottom of page
4. Verify 'RECOMMENDED ITEMS' are visible
5. Click on 'Add To Cart' on Recommended product
6. Click on 'View Cart' button
7. Verify that product is displayed in cart page
*/

import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test('Test Case 22: Add to cart from Recommended items ', async ({page , productsPage, navbarPage, cartPage }) => {

  let products : any[] = [];

  await test.step("Verify that home page is visible successfully", async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step("Scroll to recommended items section at the bottom of the page" , async () => {
    await productsPage.recommendedItems().scrollIntoViewIfNeeded();
  })

  await test.step("Add recomended product to the shopping cat ", async () => {
    await productsPage.recommendedItems().waitFor({state: 'visible'})
    products = await productsPage.addRandomQtyToCart(1, 'recommended')
  })

  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    expect(page.url()).toContain('view_cart')
    expect((await cartPage.allProductTableRows()).length).toEqual(1);
  });

  await test.step("Verify cart products " , async () => {
    await page.waitForLoadState('load');
    await cartPage.verifyCartProductNames(products);
  });

});