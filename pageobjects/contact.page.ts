import {Locator, Page} from '@playwright/test'

export default class ContactPage {
 
  readonly page : Page
  readonly contactFormSection : Locator
  readonly getInTouchHeading : Locator
  readonly name : Locator
  readonly email : Locator
  readonly message :  Locator
  readonly subject : Locator
  readonly uploadFileBtn : Locator
  readonly submitBtn : Locator
  
  constructor(page: Page) {
    this.page = page;
    this.contactFormSection = page.locator('.contact-form');
    this.getInTouchHeading = this.contactFormSection.getByRole('heading' , {name: 'get in touch'});  
    this.name = page.getByPlaceholder('name');
    this.email = this.contactFormSection.locator('input[name="email"]');
    this.subject = page.getByPlaceholder('subject');
    this.message = page.getByPlaceholder('your message here');
    this.uploadFileBtn = page.locator('input[name="upload_file"]')
    this.submitBtn = this.contactFormSection.locator('input[name="submit"]')
}

// actions


}