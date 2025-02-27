import {Locator, Page} from '@playwright/test'

export default class ConsentPage {
 
  readonly page : Page
  readonly consentBtn: Locator
  
  constructor(page: Page) {

   this.page = page
   this.consentBtn = page.getByRole('button', {name:/consent/i});

  }
  
// actions
async accept() {
const isBtnVisible = await this.consentBtn.isVisible();
if (isBtnVisible) await this.consentBtn.click();
}

}