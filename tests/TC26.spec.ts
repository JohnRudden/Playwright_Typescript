/*
Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down page to bottom
5. Verify 'SUBSCRIPTION' is visible
6. Scroll up page to top
7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
*/

import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality " , async ({page, footerPage}) => {

  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step("Scroll down to footer and verify text 'Subscription'" , async() => {
    await footerPage.subscriptionHeading.scrollIntoViewIfNeeded()
    await expect(footerPage.subscriptionHeading).toHaveText('Subscription')
  })

  await test.step("Scroll up to the the top where the text 'Full-Fledged practice website for Automation Engineers' is displayed " , async () => {
    let targetText = page.getByText("Full-Fledged practice website for Automation Engineers").first();
    await targetText.scrollIntoViewIfNeeded();
    await expect(page.getByText("Full-Fledged practice website for Automation Engineers").first()).toBeInViewport();
  })
});