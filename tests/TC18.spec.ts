/*
Test Case 18: View Category Products
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that categories are visible on left side bar
4. Click on 'Women' category
5. Click on any category link under 'Women' category, for example: Dress
6. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
7. On left side bar, click on any sub-category link of 'Men' category
8. Verify that user is navigated to that category page
*/

import { test, expect} from '../fixtures/basePage';


test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test('Test Case 18: View Category Products ', async ({page , categoryPage }) => {

  await test.step("Verify categories are visible on the left side bar  " , async () => {
   await expect(categoryPage.categoryHeading).toBeVisible();
  })

  await test.step("Click on category 'Women' and sub category 'Dress' ", async () => {
    await categoryPage.select('Women', 'Dress')
  })

  await test.step("Confirm that the correct category page is displayed and verify that it displays 'WOMEN - DRESS PRODUCTS" , async() => {
    expect(page.url()).toContain('category_products/1')
    await expect(page.getByRole('heading', {name: 'Women - Dress Products'})).toBeVisible()
  })

  await test.step("Click on category 'Men' and sub category 'Jeans' ", async () => {
    await categoryPage.select('Men', 'Jeans')
  })

  await test.step("Confirm that the correct category page is displayed and verify that it displays 'MEN - JEANS PRODUCTS" , async() => {
    expect(page.url()).toContain('category_products/6')
    await expect(page.getByRole('heading', {name: 'Men - Jeans Products'})).toBeVisible()
  })

});