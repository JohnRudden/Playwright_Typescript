import {Locator, Page} from '@playwright/test'

export default class NavBarPage {
  readonly page : Page
  readonly nav: Locator
  readonly loggedInUser: Locator

  constructor(page: Page) {
   this.page = page
   this.nav = page.locator('.nav');
   this.loggedInUser = page.locator('#header .nav li');
  }

// actions

async navItem(item: string) {
return this.nav.getByRole('link' , {name: `${item}`});
} 

async select(item: string) {
await (await this.navItem(item)).click()
}

}