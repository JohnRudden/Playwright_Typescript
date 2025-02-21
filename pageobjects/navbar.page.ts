import {Page} from '@playwright/test'

export default class NavBarPage {
  readonly page : Page
  constructor(page: Page) {
   this.page = page
  }

// locators

// navItem = (item: string) => this.page.locator('.nav').getByRole('link' , {name: `${item}`});
navItem = (item: string) => this.page.getByRole('listitem').getByRole('link' , {name: `${item}`});
loggedInUser = () => this.page.locator('#header .nav li');

// actions

async select(item: string) {
await this.navItem(item).click()
}

}