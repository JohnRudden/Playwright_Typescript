/*
Test Case 10: Verify Subscription in home page
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down to footer
5. Verify text 'SUBSCRIPTION'
6. Enter email address in input and click arrow button
7. Verify success message 'You have been successfully subscribed!' is visible
*/

import { test, expect} from '../fixtures/basePage';
import userDetails from '../data/testData';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test("Test Case 10 : Test Case 10: Verify Subscription in home page" , async ({page, footerPage}) => {

  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step("Scroll down to footer and verify text 'Subscription'" , async() => {
    await footerPage.subscriptionHeading.scrollIntoViewIfNeeded()
    await expect(footerPage.subscriptionHeading).toHaveText('Subscription')
  })

  await test.step("Enter email address, click arrow button and verify success message" , async () => {
    const email = (await userDetails()).email;
    await footerPage.emailInput.fill(email);
    await (await footerPage.subscribeBtn).click();
    await expect(page.locator('#success-subscribe')).toBeVisible()
  })
})