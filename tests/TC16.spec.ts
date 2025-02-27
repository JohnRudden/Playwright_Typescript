/*
Test Case 16: Place Order: Login before Checkout
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill email, password and click 'Login' button
6. Verify 'Logged in as username' at top
7. Add products to cart
8. Click 'Cart' button
9. Verify that cart page is displayed
10. Click Proceed To Checkout
11. Verify Address Details and Review Your Order
12. Enter description in comment text area and click 'Place Order'
13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
14. Click 'Pay and Confirm Order' button
15. Verify success message 'Your order has been placed successfully!'
16. Click 'Delete Account' button
17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/

import { test, expect} from '../fixtures/basePage';
import {UserDetails} from '../data/testData';

let user: UserDetails;
let products : any[] = [];

test.beforeEach( async ({homePage, context, registerUser}) => {
  await homePage.navigateToAndCheck(context);
  user = await registerUser();

});

test('Test Case 16: Place Order: Login before Checkout ', {tag: []}, async ({page , productsPage, navbarPage, loginPage, cartPage, checkoutPage, deleteAccountPage }) => {

  await test.step("Ensure user is logged out after registration ", async () => {
    await navbarPage.select('logout')
    await expect(page.getByText('Login to your account')).toBeVisible();
  });

  await test.step("Enter name and email address and log in" , async ()=> {
    await loginPage.login(user.email, user.password)
    await expect(navbarPage.loggedInUser().filter({ hasText: `${user.name}`})).toBeVisible()
    await page.waitForLoadState('domcontentloaded');
  })
  
  await test.step("Add 2 products to cart " , async () => {
    products = await productsPage.addRandomQtyToCart(2);
  })
  
  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    await page.waitForURL(/view_cart/, {waitUntil: "domcontentloaded"});
    expect(page.url()).toContain('view_cart')
    expect((await cartPage.allProductTableRows()).length).toEqual(2);
  });

  await test.step("Proceed to checkout " , async() => {
    await cartPage.clickProceedToCheckout();
   })

  await test.step("Verify delivery address details ", async () => {
    await checkoutPage.verifyAddressDetails(user, 'delivery');
  })

  await test.step("Verify billing address details ", async () => {
    await checkoutPage.verifyAddressDetails(user, 'billing');
  })

  await test.step("Review order " , async ()=> {
    expect(await (await checkoutPage.allProductTableRows())[0].locator('.cart_description').locator('h4 a').textContent()).toContain(products[0].productName);
    expect(await (await checkoutPage.allProductTableRows())[0].locator('.cart_quantity').textContent()).toContain('1');
    expect(await (await checkoutPage.allProductTableRows())[1].locator('.cart_description').locator('h4 a').textContent()).toContain(products[1].productName);
    expect(await (await checkoutPage.allProductTableRows())[1].locator('.cart_quantity').textContent()).toContain('1');
  })

  await test.step("Enter message and place order" , async () => {
    await checkoutPage.textMsgArea.fill('Automated test');
    await checkoutPage.placeOrder.click();
    expect(page.url()).toContain('payment')
  });

  await test.step("Enter card payment details " , async() => {
    await page.locator('input[name="name_on_card"]').fill(user.name);
    await page.locator('input[name="card_number"]').fill(user.cardnumber);
    await page.getByRole('textbox', { name: 'ex.' }).fill(user.cardCVC);
    await page.getByRole('textbox', { name: 'MM' }).fill(user.expiryMonth);
    await page.getByRole('textbox', { name: 'YYYY' }).fill(user.expiryYear);
    await expect(page.locator('.form-row > div#success_message')).toHaveClass(/hide/);
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click(); 
    })

  await test.step("Verify navigates to payment done page and displays 'Order Placed!" , async() => {
    expect(page.url()).toContain('payment_done')
    await expect(page.getByText("Order Placed!")).toBeVisible()
    })

  await test.step("Click 'Delete Account' button", async () => {
    await navbarPage.select('Delete Account')
    await page.waitForURL(/delete_account/);
  })

  await test.step("Verify that 'Account Deleted!' is visible", async () => {
    expect(page.url()).toContain('delete_account');
    await expect(deleteAccountPage.successMessageHeading).toBeVisible();
    await deleteAccountPage.clickContinueBtn();
    await page.waitForURL('/', {waitUntil: 'load'});
    await expect(navbarPage.navItem('Signup')).toBeVisible()
  })

});