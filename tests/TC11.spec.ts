/*
Test Case 11: Verify Subscription in Cart page
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Cart' button
5. Scroll down to footer
6. Verify text 'SUBSCRIPTION'
7. Enter email address in input and click arrow button
8. Verify success message 'You have been successfully subscribed!' is visible
*/

import { test, expect} from '../fixtures/basePage';
import userDetails from '../data/testData';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test("Test Case 11: Verify Subscription in Cart page " , async ({page, navbarPage, footerPage}) => {

  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step('Click on the "Cart" button in the navigation bar ', async() => {
    await navbarPage.select('Cart')
    expect(page.url()).toContain('view_cart')
  })

  await test.step("Scroll down to footer and verify text 'Subscription'" , async() => {
    await footerPage.subscriptionHeading.scrollIntoViewIfNeeded();
    await page.waitForLoadState('load');
    await expect(footerPage.subscriptionHeading).toHaveText('Subscription')
  })

  await test.step("Enter email address, click arrow button and verify success message" , async () => {
    const email = (await userDetails()).email;
    await (await footerPage.subscribeBtn).waitFor({state: 'visible'})
    await footerPage.emailInput.click();
    await footerPage.emailInput.fill(email);
    await (await footerPage.subscribeBtn).click();
    await expect(page.locator('#success-subscribe')).toBeVisible()
  })

})
