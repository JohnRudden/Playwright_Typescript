/*
Test Case 17: Remove Products From Cart
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click 'X' button corresponding to particular product
8. Verify that product is removed from the cart
*/

import { test, expect} from '../fixtures/basePage';
import {UserDetails} from '../data/testData';

let user: UserDetails;
let products : string[] = [];


test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test('Test Case 17: Remove Products From Cart ', async ({page , productsPage, navbarPage, registerUser, cartPage, checkoutPage, deleteAccountPage }) => {

  await test.step("Add 3 products to cart " , async () => {
    products = await productsPage.addRandomQtyToCart(2);
  })
  
  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    expect(page.url()).toContain('view_cart')
    expect((await cartPage.allProductTableRows()).length).toEqual(2);
  });

  await test.step("Verify the product names in the cart " , async () => {
    await cartPage.verifyCartProductNames(products);
  })

  await test.step("Remove all of the products from the cart and verify 'Cart is empty!' message is displayed" , async () => {
    await page.waitForLoadState('load');
    await cartPage.removeAllProductsFromCart(products);
  })

});