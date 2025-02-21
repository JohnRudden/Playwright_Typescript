/*
Test Case 2: Login User with correct email and password
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter correct email address and password
7. Click 'login' button
8. Verify that 'Logged in as username' is visible
9. Click 'Delete Account' button
10. Verify that 'ACCOUNT DELETED!' is visible
*/

import { test, expect} from '../fixtures/basePage';
import {UserDetails} from '../data/testData';

let user: UserDetails;

test.beforeEach( async ({homePage, registerUser, consentPage, context}) => {
  await homePage.navigateToAndCheck(context);
  await consentPage.accept();
  user = await registerUser();
});

test('Test Case 2: Login User with correct email and password', async ({page , loginPage, navbarPage, deleteAccountPage}) => {

  await test.step("Ensure 'Log in to your account' is displayed" , async () => {
    await expect(navbarPage.loggedInUser().filter({ hasText: `${user.name}`})).toBeVisible()
    await navbarPage.select('logout')
    await expect(page.getByText('Login to your account')).toBeVisible();
  })

  await test.step("Enter name and email address and log in" , async ()=> {
    await loginPage.login(user.email, user.password)
    await expect(navbarPage.loggedInUser().filter({ hasText: `${user.name}`})).toBeVisible()
  })

  await test.step("Click 'Delete Account' button", async () => {
    await navbarPage.select('Delete Account')
  })

  await test.step("Verify that 'Account Deleted!' is visible", async () => {
    expect(page.url()).toContain('delete_account');
    await expect(deleteAccountPage.successMessageHeading()).toBeVisible();
  })
})
