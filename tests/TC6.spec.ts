/*
Test Case 6: Contact Us Form
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Contact Us' button
5. Verify 'GET IN TOUCH' is visible
6. Enter name, email, subject and message
7. Upload file
8. Click 'Submit' button
9. Click OK button
10. Verify success message 'Success! Your details have been submitted successfully.' is visible
11. Click 'Home' button and verify that landed to home page successfully
*/

import { test, expect} from '../fixtures/basePage';
import userDetails from '../data/testData';
import path from 'path';

test.beforeEach( async ({homePage, context}) => {
  await homePage.navigateToAndCheck(context);
});

test("Test Case 6: Contact Us Form" , async ({page, navbarPage, contactPage}) => {

  await test.step('Verify that home page is visible successfully', async() => {
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
    expect(page.url()).toContain('www.automationexercise.com')
  });

  await test.step("Click on the 'Contat us' button ", async () => {
    expect(page.url()).not.toContain('contact us')
    await navbarPage.select(' Contact us')
    await page.waitForURL('**/contact_us');
  })

  await test.step("Verify that the user is navigated to the contact us page successfully, and 'Get In Touch' is displayed ", async () => {
     expect(page.url()).toContain('contact_us');
     await expect(contactPage.getInTouchHeading()).toBeVisible()
  })

  await test.step("Enter name, email, subject and message" , async () => {
    await contactPage.name().fill((await userDetails()).name);
    await contactPage.email().fill((await userDetails()).email);
    await contactPage.subject().fill('Subject line');
    await contactPage.message().fill('This is an automated test message');
  })

  await test.step("Choose file for upload...." , async ()=> {
    const chooseFile = contactPage.uploadFileBtn();
    await chooseFile.setInputFiles(path.join('data', 'blankUploadFile.txt'));
  })

  await test.step("Submit the form and check the success message is displayed " , async () => {
    page.once('dialog', dialog => {
      dialog.accept()});
  })
    await contactPage.submitBtn().click()
    await expect(page.locator('#contact-page').getByText("Success! Your details have been submitted successfully.")).toBeVisible()
});

