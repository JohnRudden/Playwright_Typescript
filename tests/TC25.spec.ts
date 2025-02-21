/*
Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down page to bottom
5. Verify 'SUBSCRIPTION' is visible
6. Click on arrow at bottom right side to move upward
7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
*/

import { test, expect} from '../fixtures/basePage';
import userDetails from '../data/testData';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality" , async ({page, footerPage, homePage}) => {

  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step("Scroll down to footer and verify text 'Subscription'" , async() => {
    await footerPage.subscriptionHeading().scrollIntoViewIfNeeded()
    await expect(footerPage.subscriptionHeading()).toHaveText('Subscription')
  })

  await test.step("Click scroll up arrow and verify that the page has gone back to the top" , async () => {
    let targetText = false;
    while (!targetText) {
    await homePage.arrowUp().click();
    targetText = await page.getByText("Full-Fledged practice website for Automation Engineers").first().isVisible()
    }
    await expect(page.getByText("Full-Fledged practice website for Automation Engineers").first()).toBeInViewport();
  })
});

