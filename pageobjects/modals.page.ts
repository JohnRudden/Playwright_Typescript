import {Page} from '@playwright/test'

export default class Modal {
 
  readonly page : Page
  
  constructor(page: Page) {

   this.page = page

}

// locators

// Cart Modal
cartParent = () => this.page.locator('#cartModal');
cartAdded = () => this.cartParent().getByText('Added!')
viewCart = () => this.cartParent().getByRole('link', {name: 'View Cart'})
continueShoppingBtn = () => this.cartParent().getByText('Continue Shopping');


// Checkout Modal
checkoutParent = () => this.page.locator('#checkoutModal');
registerOrLogin = () => this.checkoutParent().getByRole('link', {name: 'Register / Login'});
continueOnCart = ()=> this.checkoutParent().getByAltText('Continue On Cart')

}