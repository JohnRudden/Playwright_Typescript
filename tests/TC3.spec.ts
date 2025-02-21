/* Test Case 3: Login User with incorrect email and password
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter incorrect email address and password
7. Click 'login' button
8. Verify error 'Your email or password is incorrect!' is visible
*/

import { test, expect} from '../fixtures/basePage';

test.beforeEach( async ({homePage, consentPage, context}) => {
  await homePage.navigateToAndCheck(context);
  await consentPage.accept();
});

test('Test Case 3 : Login user with incorrect email and password' , async ({page , loginPage, navbarPage, signupPage}) => {

  await test.step("Click on 'Signup / Login' button on the Navigation bar", async() => {  
    await navbarPage.select('Signup')
    expect(page.url()).toContain('login')
  })

  await test.step("Verify 'Login to your account' is visible" , async ()=> {
    await expect(loginPage.loginHeading()).toBeVisible();
  })

  await test.step("Attempt to login with incorrect email address and password and verify error message is displayed" , async () => {
    await loginPage.login('az123456@9a8b765sz.com', 'wrngwngrg')
    await expect(loginPage.loginErrorMessage()).toBeVisible()
  })

})
