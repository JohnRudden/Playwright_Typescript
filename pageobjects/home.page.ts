import {BrowserContext, Page, expect} from '@playwright/test'
import adBlock from '../helpers/ad_block';

export default class HomePage {
  readonly page : Page
  constructor(page: Page) {

   this.page = page

}

// locators

sitelogo = () => this.page.getByAltText('Website for automation practice');
arrowUp = () => this.page.locator('#scrollUp');

// actions

async navigateToAndCheck(context: BrowserContext) {
  await adBlock(context);
  await this.page.goto('/');
  await expect(this.sitelogo()).toBeVisible();
  expect(this.page.url()).toContain('www.automationexercise.com')
}
}