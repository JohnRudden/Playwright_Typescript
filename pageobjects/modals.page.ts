import {Locator, Page} from '@playwright/test'

export default class Modal {
 
  readonly page : Page
  readonly cartParent: Locator
  readonly cartAdded: Locator
  readonly viewCart: Locator
  readonly continueShoppingBtn: Locator
  readonly checkoutParent: Locator
  readonly registerOrLogin: Locator
  readonly continueOnCart: Locator
  
  constructor(page: Page) {
    this.page = page
    this.cartParent = page.locator('#cartModal');
    this.cartAdded = this.cartParent.getByText('Added!');
    this.viewCart = this.cartParent.getByRole('link', {name: 'View Cart'});
    this.continueShoppingBtn = this.cartParent.getByText('Continue Shopping');
    this.checkoutParent = page.locator('#checkoutModal');
    this.registerOrLogin = this.checkoutParent.getByRole('link', {name: 'Register / Login'});
    this.continueOnCart = this.checkoutParent.getByAltText('Continue On Cart');
}

}