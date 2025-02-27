/*
Test Case 5: Register User with existing email
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and already registered email address
7. Click 'Signup' button
8. Verify error 'Email Address already exist!' is visible
*/

import { test, expect} from '../fixtures/basePage';
import {UserDetails} from '../data/testData';

let user: UserDetails;

test.beforeEach( async ({page, homePage, registerUser, navbarPage, context}) => {
  await homePage.navigateToAndCheck(context);
  user = await registerUser();
  await navbarPage.select('logout')
  expect(page.url()).toContain('login')
})

test.afterEach( async({loginPage, navbarPage}) => {
  // clean up - delete user
  await loginPage.login(user.email, user.password)
  await navbarPage.select('delete account')
})

test("Text Case 5 : Attempt to Register user with existing email" , async ({page, loginPage, navbarPage}) => {

  await test.step("Click on 'Signup / Login' button on the Navigation bar", async() => {  
    await navbarPage.select('Signup')
    expect(page.url()).toContain('login')
  })

  await test.step("Verify 'New User Signup!' is visible" , async ()=> {
    await expect(page.getByText('New User Signup!')).toBeVisible();
  })

  await test.step("Enter name and email address and signup" , async ()=> {
    await loginPage.signUp(user.name, user.email)
    expect(page.url()).toContain('signup')
  })

  await test.step("Verify error message is diplayed indicating that the email address is already registered" , async ()=> {
    await expect(loginPage.signupErrorMessage).toBeVisible();
  })
})
