import {Page} from '@playwright/test'

export default class ContactPage {
 
  readonly page : Page
  
  constructor(page: Page) {

   this.page = page

}
// locators
contactFormSection = () => this.page.locator('.contact-form');
getInTouchHeading = () => this.contactFormSection().getByRole('heading' , {name: 'get in touch'})
name = () => this.page.getByPlaceholder('name');
email = () => this.contactFormSection().getByPlaceholder('email');
subject = () => this.page.getByPlaceholder('subject');
message = () => this.page.getByPlaceholder('your message here');
uploadFileBtn = () => this.page.locator('input[name="upload_file"]');
submitBtn = () => this.contactFormSection().locator('input[name="submit"]')


// actions


}