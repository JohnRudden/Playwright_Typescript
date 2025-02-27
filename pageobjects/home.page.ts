import {BrowserContext, Locator, Page, expect} from '@playwright/test'
import adBlock from '../helpers/ad_block';

export default class HomePage {
  readonly page : Page
  readonly sitelogo : Locator
  readonly arrowUp : Locator

  constructor(page: Page) {
    this.page = page
    this.sitelogo = page.getByAltText('Website for automation practice');
    this.arrowUp = page.locator('#scrollUp');
}

// actions

async navigateToAndCheck(context: BrowserContext) {
  await adBlock(context);
  await this.page.goto('/');
  await expect(this.sitelogo).toBeVisible();
  expect(this.page.url()).toContain('www.automationexercise.com')
}
}