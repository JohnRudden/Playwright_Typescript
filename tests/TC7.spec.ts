/*
Test Case 7: Verify Test Cases Page
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Test Cases' button
5. Verify user is navigated to test cases page successfully
*/

import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, consentPage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test("Text Case 7 : Verify Test Cases Page" , async ({page, navbarPage}) => {

  await test.step("Click on the 'Test Cases' button ", async () => {
    expect(page.url()).not.toContain('test_cases')
    await navbarPage.select(' Test Cases')
    await page.waitForURL('**/test_cases');
  })

  await test.step("Verify that the user is navigated to the test page successfully ", async () => {
      expect(page.url()).toContain('test_cases');
      await expect(page.locator('h2').getByText('Test Cases')).toBeVisible();
  })
})
