/*
Test Case 9: Search Product
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. Enter product name in search input and click search button
7. Verify 'SEARCHED PRODUCTS' is visible
8. Verify all the products related to search are visible
*/

import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, consentPage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test('Test Case 9: Search Product ', async ({page , navbarPage, productsPage, productDetailPage}) => {

  let searchTerm = 'jeans'
  
  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step("Click on 'Products' button on the Navigation bar", async() => {  
    await navbarPage.select('Products')
    expect(page.url()).toContain('products')
  })

  await test.step("Check 'All Products' heading is displayed" , async () => {
    expect(await productsPage.allProductsHeading.textContent()).toEqual('All Products');
  });

  await test.step("Enter product search term and click the search button" , async () => {
    await productsPage.performSearch(searchTerm)
  });

  await test.step("Verify all the returned results contain the search term" , async () => {
    const list = await productsPage.productList();
    for (let item of await list) {
        expect(await (await item.textContent()).toLowerCase()).toContain(searchTerm)
    }
  });
});