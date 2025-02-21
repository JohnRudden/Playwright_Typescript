/* 
Test Case 15: Place Order: Register before Checkout
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
12. Verify Address Details and Review Your Order
13. Enter description in comment text area and click 'Place Order'
14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
15. Click 'Pay and Confirm Order' button
16. Verify success message 'Your order has been placed successfully!'
17. Click 'Delete Account' button
18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/

import { test, expect} from '../fixtures/basePage';
import {UserDetails} from '../data/testData';

let user: UserDetails;
let products : any[] = [];

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test('Test Case 15: Place Order: Register before Checkout ', {tag: []}, async ({page , productsPage, navbarPage, registerUser, cartPage, checkoutPage, deleteAccountPage }) => {

  await test.step("Register new user" , async () => {
    user = await registerUser();
    await navbarPage.select('home');
    await page.waitForLoadState('domcontentloaded');
  })

  await test.step("Add 4 products to cart " , async () => {
    products = await productsPage.addRandomQtyToCart(2);
  })
  
  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    expect(page.url()).toContain('view_cart')
    await page.waitForEvent('load');
    const productsListPromise = cartPage.allProductTableRows();
    expect((await productsListPromise).length).toEqual(2);
    await expect(cartPage.proceedToCheckout()).toBeEnabled();
  });

  await test.step("Proceed to checkout " , async() => {
    await page.waitForLoadState('load')
    await cartPage.proceedToCheckout().click()
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
    await checkoutPage.textMsgArea().fill('Automated test');
    await checkoutPage.placeOrder().click();
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
    await page.waitForLoadState('load');
    expect(page.url()).toContain('payment_done')
    await expect(page.getByText("Order Placed!")).toBeVisible()
    })

  await test.step("Click 'Delete Account' button", async () => {
    await navbarPage.select('Delete Account')
  })

  await test.step("Verify that 'Account Deleted!' is visible", async () => {
    expect(page.url()).toContain('delete_account');
    await expect(deleteAccountPage.successMessageHeading()).toBeVisible();
    await deleteAccountPage.continueBtn().click()
    expect(page.url()).not.toContain('delete_account');
    await expect(navbarPage.navItem('Signup')).toBeVisible()
  })

});