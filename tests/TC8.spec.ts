/*
Test Case 8: Verify All Products and product detail page 
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. The products list is visible
7. Click on 'View Product' of first product
8. User is landed to product detail page
9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
*/

import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, consentPage, context}) => {
  await homePage.navigateToAndCheck(context);
})

test('Test Case 8: Verify All Products and product detail page ', async ({page , navbarPage, productsPage, productDetailPage}) => {
  
    await test.step('Verify that home page is visible successfully', async() => {
      await expect(page.getByAltText('Website for automation practice')).toBeVisible();
      expect(page.url()).toContain('www.automationexercise.com');
    })

    await test.step("Click on 'Products' button on the Navigation bar", async() => {  
      await navbarPage.select('Products');
      expect(page.url()).toContain('products');
    })

    await test.step("Check 'All Products' heading is displayed" , async () => {
      expect(await productsPage.allProductsHeading.textContent()).toEqual('All Products');
    });

    await test.step("Verify that the product list is visible" , async() => {
      const productList = await productsPage.productList();
      expect(await productList.length).toBeGreaterThan(0);
      expect(await productList[0]).toBeVisible();
  });

    await test.step("Click on 'Product View' on the first product " , async() => {
      await page.locator('.choose > .nav > li > a').first().click();
      expect(page.url()).toContain('/product_details/1')
  });

  await test.step("Verify that the product details are visible - product name, category, price, availability, condition and brand " , async () => {
      await productDetailPage.verifyFirstProductDetails();
  })
})

