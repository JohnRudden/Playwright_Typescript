/*
Test Case 4: Logout User
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter correct email address and password
7. Click 'login' button
8. Verify that 'Logged in as username' is visible
9. Click 'Logout' button
10. Verify that user is navigated to login page
*/

import { test, expect} from '../fixtures/basePage';
import {UserDetails} from '../data/testData'

let user: UserDetails;

test.beforeEach( async ({homePage, registerUser, navbarPage, context}) => {
  await homePage.navigateToAndCheck(context);
  user = await registerUser();
  await navbarPage.select('logout');
});

test('Test Case 4 : Logout user' , {tag: []}, async ({page , loginPage, navbarPage, deleteAccountPage}) => {

  await test.step("Click on 'Signup / Login' button on the Navigation bar", async() => {  
    await navbarPage.select('Signup')
    expect(page.url()).toContain('login')
  })

  await test.step("Verify 'Login to your account' is visible" , async ()=> {
    await expect(loginPage.loginHeading()).toBeVisible();
  })

  await test.step("Enter name and email address and log in and 'Logged in as username' is visible" , async ()=> {
    await loginPage.login(user.email, user.password)
    await expect(navbarPage.loggedInUser().filter({ hasText: `${user.name}`})).toBeVisible()
    await expect(navbarPage.navItem('Logout')).toBeVisible();
    expect(page.url()).not.toContain('login')
  })

  await test.step("Log the user out and ensure that the user is navigated to the login page" , async () => {
      await navbarPage.select('logout')
      expect(page.url()).toContain('login')
      await expect(loginPage.loginHeading()).toBeVisible();
  })

  await test.step("Delete the user ", async () => {
      await navbarPage.select('Signup')
      await loginPage.login(user.email, user.password)
      await navbarPage.select('delete account')
      await page.waitForURL('**/delete_account')
      await expect(deleteAccountPage.successMessageHeading).toBeVisible();
  })
  })
