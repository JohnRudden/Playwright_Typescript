import {Page} from '@playwright/test'

export default class DeleteAccountPage {
  readonly page : Page
  
  constructor(page: Page) {
  this.page = page
}

// locators

successMessageHeading = () =>  this.page.getByRole('heading', {name: "Account Deleted!"})
continueBtn = () => this.page.getByRole('link', {name: "Continue"})

}