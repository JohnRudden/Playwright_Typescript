import {Page} from '@playwright/test'

export default class FooterPage {
  readonly page : Page
  constructor(page: Page) {
   this.page = page
  }

// locators

footer = () => this.page.locator('#footer');
subscriptionHeading = () => this.footer().getByText('Subscription');
emailInput = () => this.footer().getByRole('textbox', {name: 'email'})
subscribeBtn = async () => this.footer().locator('button');

// actions


}