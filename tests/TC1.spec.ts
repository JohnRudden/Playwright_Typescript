/*
Test Case 1: Register User
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and email address
7. Click 'Signup' button
8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
9. Fill details: Title, Name, Email, Password, Date of birth
10. Select checkbox 'Sign up for our newsletter!'
11. Select checkbox 'Receive special offers from our partners!'
12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
13. Click 'Create Account button'
14. Verify that 'ACCOUNT CREATED!' is visible
15. Click 'Continue' button
16. Verify that 'Logged in as username' is visible
17. Click 'Delete Account' button
18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
*/

import { test, expect} from '../fixtures/basePage';
import userDetails from '../data/testData'
import adBlock from '../helpers/ad_block';

test.beforeEach( async ({page, context}) => {
  await adBlock(context);
  await page.goto('/');
});

test('Test Case 1: Register User', async ({page , loginPage, navbarPage, signupPage, deleteAccountPage}) => {

    const user = await userDetails();
  
    await test.step('Verify that home page is visible successfully', async()=> {
      await expect(page.getByAltText('Website for automation practice')).toBeVisible();
      expect(page.url()).toContain('www.automationexercise.com')
    })

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

    await test.step("Verify that 'ENTER ACCOUNT INFORMATION' is visible", async()=> {
      await expect(page.getByText("ENTER ACCOUNT INFORMATION")).toBeVisible();
    })

    await test.step("Fill details: Title, Name, Email, Password, Date of birth", async()=> {
     await signupPage.enterUserDetails(user)
    })

    await test.step("Click the 'Create account button' ", async () => {
      await signupPage.createAccountBtn().click()
    });

    await test.step("Verify that 'ACCOUNT CREATED!' is visible", async () => {
      await expect(signupPage.accountCreatedMsg()).toBeVisible()
    })

    await test.step("Click 'Continue' button", async () => {
      await signupPage.continueBtn().click();
    })

    await test.step("Verify that 'Logged in as username' is visible", async () => {
      await expect(navbarPage.loggedInUser().filter({ hasText: `${user.name}`})).toBeVisible()
    })

    await test.step("Click 'Delete Account' button", async () => {
      await navbarPage.select('Delete Account')
    })

    await test.step("Verify that 'Account Deleted!' is visible", async () => {
      expect(page.url()).toContain('delete_account');
      await expect(deleteAccountPage.successMessageHeading).toBeVisible();
    })

    await test.step("Click 'Continue' button", async () => {
      await deleteAccountPage.clickContinueBtn();
      expect(page.url()).not.toContain('delete_account');
      await expect(page.getByAltText('Website for automation practice')).toBeVisible();
      expect(page.url()).toContain('www.automationexercise.com')
    })
  });




 


