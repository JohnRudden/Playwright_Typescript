/*
Test Case 20: Search Products and Verify Cart After Login
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Click on 'Products' button
4. Verify user is navigated to ALL PRODUCTS page successfully
5. Enter product name in search input and click search button
6. Verify 'SEARCHED PRODUCTS' is visible
7. Verify all the products related to search are visible
8. Add those products to cart
9. Click 'Cart' button and verify that products are visible in cart
10. Click 'Signup / Login' button and submit login details
11. Again, go to Cart page
12. Verify that those products are visible in cart after login as well
*/

import { Locator } from 'playwright';
import { test, expect} from '../fixtures/basePage';
import { UserDetails } from '../data/testData';

let user: UserDetails;

test.beforeEach( async ({homePage, context, registerUser, navbarPage}) => {
  await homePage.navigateToAndCheck(context);
  user = await registerUser();
  await navbarPage.select('logout')
});

test('Test Case 20: Search Products and Verify Cart After Login ', {tag: []}, async ({page , cartPage, productsPage, navbarPage, loginPage, deleteAccountPage }) => {

  let searchTerm = 'jeans';
  let list: Locator[];
  let products : any[] = [];
 
  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  })

  await test.step("Click on 'Products' button on the Navigation bar", async() => {  
    await navbarPage.select('Products')
    expect(page.url()).toContain('products')
  })

  await test.step("Check 'All Products' heading is displayed" , async () => {
    expect(await productsPage.allProductsHeading().textContent()).toEqual('All Products');
  });

  await test.step("Enter product search term and click the search button" , async () => {
    await productsPage.performSearch(searchTerm);
  });

  await test.step("Verify all the returned results contain the search term" , async () => {
    list = await productsPage.productList();
    for (let item of list) {
        expect((await item.textContent())?.toLowerCase()).toContain(searchTerm)
    }
  });

  await test.step("Add all returned product results to the cart " , async () => {
    products = await productsPage.addAllToCart(list)
  })

  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    await page.waitForURL(/view_cart/, {waitUntil: "domcontentloaded"});
    expect(page.url()).toContain('view_cart')
    expect((await cartPage.allProductTableRows()).length).toEqual(3);
  });

  await test.step("Verify cart products " , async () => {
    await cartPage.verifyCartProductNames(products);
  });

  await test.step("Enter name and email address and log in and 'Logged in as username' is visible" , async ()=> {
    await navbarPage.select('Signup')
    await loginPage.login(user.email, user.password)
    await expect(navbarPage.loggedInUser().filter({ hasText: `${user.name}`})).toBeVisible()
    await expect(navbarPage.navItem('Logout')).toBeVisible();
    expect(page.url()).not.toContain('login')
    })

  await test.step("Go to shopping cart page " , async() => {
    await navbarPage.select('Cart')
    expect(page.url()).toContain('view_cart')
    expect((await cartPage.allProductTableRows()).length).toEqual(3);
  });

  await test.step("Verify cart products " , async () => {
    await cartPage.verifyCartProductNames(products);
  });

  await test.step("Delete the user ", async () => {
    await navbarPage.select('delete account');  
  })

  await test.step("Verify that 'Account Deleted!' is visible", async () => {
    expect(page.url()).toContain('delete_account');
    await expect(deleteAccountPage.successMessageHeading).toBeVisible();
  })

})
