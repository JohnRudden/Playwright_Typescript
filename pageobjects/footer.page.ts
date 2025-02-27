import {Locator, Page} from '@playwright/test'

export default class FooterPage {
  
  readonly page : Page
  readonly footer : Locator
  readonly subscriptionHeading : Locator
  readonly emailInput : Locator 
  readonly subscribeBtn : Locator 

  constructor(page: Page) {
    this.page = page
    this.footer = page.locator('#footer');
    this.subscriptionHeading = this.footer.getByText('Subscription');
    this.emailInput = this.footer.getByRole('textbox', {name: 'email'});
    this.subscribeBtn = this.footer.locator('button');
  }

}