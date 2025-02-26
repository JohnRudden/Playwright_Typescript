/*
Test Case 19: View & Cart Brand Products
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Click on 'Products' button
4. Verify that Brands are visible on left side bar
5. Click on any brand name
6. Verify that user is navigated to brand page and brand products are displayed
7. On left side bar, click on any other brand link
8. Verify that user is navigated to that brand page and can see products
*/

import { test, expect} from '../fixtures/basePage';


test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test('Test Case 19: View & Cart Brand Products ', async ({page , brandsPage }) => {

  await test.step("Verify Brands section is visible on the left side bar  " , async () => {
   await expect(brandsPage.brandsHeading).toBeVisible();
  });

  await test.step("Click on any brand name and verify that the correct page is displayed", async () => {
    const productCount = await brandsPage.select('Biba');
    expect(page.url()).toContain('brand_products/Biba');
    await expect(page.getByText('Brand - Biba Products')).toBeVisible();
    expect((await brandsPage.allProducts()).length).toEqual(productCount);
  });

  await test.step("Click on any brand name and verify that the correct page is displayed", async () => {
    const productCount = await brandsPage.select('Polo');
    expect(page.url()).toContain('brand_products/Polo');
    await expect(page.getByText('Brand - Polo Products')).toBeVisible();
    expect((await brandsPage.allProducts()).length).toEqual(productCount);
  });

});
