/*
Test Case 21: Add review on product
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Click on 'Products' button
4. Verify user is navigated to ALL PRODUCTS page successfully
5. Click on 'View Product' button
6. Verify 'Write Your Review' is visible
7. Enter name, email and review
8. Click 'Submit' button
9. Verify success message 'Thank you for your review.'
*/


import { test, expect} from '../fixtures/basePage';
import userDetails from '../data/testData';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test('Test Case 21: Add review on product ', async ({page , productsPage, navbarPage, productDetailPage }) => {

  const user = await userDetails();

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

   await test.step("Click on 'Product View' on any random product " , async() => {
    const item = await productsPage.selectRandomProduct();
    await item.locator('..').locator('li > a').click()
  });

  await test.step("Verify review form is visible " , async() => {
    await expect(productDetailPage.reviewForm).toBeVisible();
    await expect( page.getByPlaceholder('Add Review Here!')).toBeVisible()
  });

  await test.step("Enter review information...." , async () => {
    await productDetailPage.nameInput.fill(`${user.firstName} ${user.lastName}`)
    await productDetailPage.emailInput.fill(`${user.email}`)
    await productDetailPage.reviewContent.fill("This is an automated review test.....")
  })

  await test.step("Submit review and check success message is displayed" , async () => {
    await productDetailPage.submitBtn.click();
    await expect(productDetailPage.reviewForm.getByText('Thank you for your review.')).toBeVisible()
  })

});
