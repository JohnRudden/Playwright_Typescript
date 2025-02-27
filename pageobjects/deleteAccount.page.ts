import {Locator, Page} from '@playwright/test'

export default class DeleteAccountPage {
  readonly page : Page
  readonly successMessageHeading : Locator
  readonly continueBtn : Locator
  
  constructor(page: Page) {
  this.page = page
  this.successMessageHeading = page.getByRole('heading', {name: "Account Deleted!"})
  this.continueBtn = page.getByRole('link', {name: "Continue"})
}
  
  // actions
  async clickContinueBtn() {
    await (this.continueBtn).waitFor({state: 'visible'});
    await this.continueBtn.click();
  }
}