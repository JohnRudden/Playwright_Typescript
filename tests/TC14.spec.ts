/*
Test Case 14: Place Order: Register while in Checkout
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click Proceed To Checkout
8. Click 'Register / Login' button
9. Fill all details in Signup and create account
10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
11. Verify ' Logged in as username' at top
12.Click 'Cart' button
13. Click 'Proceed To Checkout' button
14. Verify Address Details and Review Your Order
15. Enter description in comment text area and click 'Place Order'
16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
17. Click 'Pay and Confirm Order' button
18. Verify success message 'Your order has been placed successfully!'
19. Click 'Delete Account' button
20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/

import { test, expect} from '../fixtures/basePage';
import {UserDetails} from '../data/testData';

let user: UserDetails;

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

let products : any[] = [];

test("Test Case 14: Place Order: Register while in Checkout " , {tag: ['@Flake']} ,async ({page, navbarPage, modals, productsPage, cartPage, registerUser, checkoutPage, deleteAccountPage}) => {

  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step("Add 2 products to cart " , async () => {
    products = await productsPage.addRandomQtyToCart(2);
  })

  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    expect(page.url()).toContain('view_cart')
    expect((await cartPage.allProductTableRows()).length).toEqual(2);
    await expect(cartPage.proceedToCheckout()).toBeEnabled()
  });

  await test.step("Proceed to checkout " , async() => {
    await page.waitForLoadState('domcontentloaded');
    await cartPage.proceedToCheckout().click()
  })

  await test.step("Click the 'Register/Login button' on the checkout modal and proceed to the signup page " , async () => {
    await modals.registerOrLogin().click()
    expect(page.url()).toContain('login')
  })

  await test.step("Register a new user ", async () => {
    user = await registerUser();
  })

  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    expect(page.url()).toContain('view_cart');
    await cartPage.productTableRow().first().waitFor({state:"visible"})
    expect((await cartPage.allProductTableRows()).length).toEqual(2);
  });

  await test.step("Proceed to checkout" , async () => {
    await page.waitForLoadState('domcontentloaded');
    await cartPage.proceedToCheckout().click()
    expect(page.url()).toContain('checkout')
    await page.waitForSelector('#address_delivery');
  })

  await test.step("Verify delivery address details ", async () => {
    await checkoutPage.verifyAddressDetails(user, 'delivery');
  })

  await test.step("Verify billing address details ", async () => {
    await checkoutPage.verifyAddressDetails(user, 'billing');
 })

 await test.step("Review order " , async ()=> {
    expect(await (await checkoutPage.allProductTableRows())[0].locator('.cart_description > h4 a').textContent()).toContain(products[0].productName);
    expect(await (await checkoutPage.allProductTableRows())[0].locator('.cart_quantity').textContent()).toContain('1');
    expect(await (await checkoutPage.allProductTableRows())[1].locator('.cart_description > h4 a').textContent()).toContain(products[1].productName);
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
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await page.waitForURL(/payment_done/);
  })

  await test.step("Verify navigates to payment done page and displays 'Order Placed!" , async() => {
    expect(page.url()).toContain('payment_done')
    await expect(page.getByText("Order Placed!")).toBeVisible()
    })

  await test.step("Click 'Delete Account' button", async () => {
    await navbarPage.select('Delete Account')
  })

  await test.step("Verify that 'Account Deleted!' is visible", async () => {
    expect(page.url()).toContain('delete_account');
    await expect(deleteAccountPage.successMessageHeading()).toBeVisible();
    await deleteAccountPage.continueBtn().waitFor({state: 'visible'})
    await deleteAccountPage.continueBtn().click();
    await expect(navbarPage.navItem('Signup')).toBeVisible()
  })
})

