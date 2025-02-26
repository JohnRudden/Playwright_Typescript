
/*
Test Case 23: Verify address details in checkout page
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify ' Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify that the delivery address is same address filled at the time registration of account
13. Verify that the billing address is same address filled at the time registration of account
14. Click 'Delete Account' button
15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/

import { UserDetails } from '../data/testData';
import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test('Test Case 23: Verify address details in checkout page ', async ({page , registerUser, productsPage, navbarPage, cartPage, checkoutPage, deleteAccountPage }) => {

  let products : any[] = [];
  let user: UserDetails;

  await test.step("Verify that home page is visible successfully", async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step("Register User" , async () =>{
    user = await registerUser();
  })

  await test.step("Add products to cart" , async () =>{
    products = await productsPage.addRandomQtyToCart(1);
  })

  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    await page.waitForURL(/view_cart/, {waitUntil: "domcontentloaded"});
    expect(page.url()).toContain('view_cart')
    expect((await cartPage.allProductTableRows()).length).toEqual(1);
  });

  await test.step("Proceed to checkout " , async() => {
    await page.waitForLoadState('load')
    await cartPage.proceedToCheckout.click()
  })
  
  await test.step("Verify delivery address details ", async () => {
    await checkoutPage.verifyAddressDetails(user, 'delivery');
  })

  
  await test.step("Verify billing address details ", async () => {
    await checkoutPage.verifyAddressDetails(user, 'billing');
  })
  
  await test.step("Click 'Delete Account' button", async () => {
    await navbarPage.select('Delete Account')
  })

  await test.step("Verify that 'Account Deleted!' is visible", async () => {
    expect(page.url()).toContain('delete_account');
    await expect(deleteAccountPage.successMessageHeading()).toBeVisible();
  })
});

