import {Page} from '@playwright/test'

export default class ConsentPage {
 
  readonly page : Page
  
  constructor(page: Page) {

   this.page = page

}
// locators
consentBtn = () => this.page.getByRole('button', {name:/consent/i});

// actions
async accept() {
const isBtnVisible = await this.consentBtn().isVisible();
if (isBtnVisible) await this.consentBtn().click();
}

}