import {Page, expect} from '@playwright/test'

export default class CartPage {
 
  readonly page : Page
  
  constructor(page: Page) {

  this.page = page

}
// locators

cartInfoTable = () => this.page.locator('#cart_info_table');
cartInfoTableBody = () => this.cartInfoTable().locator('tbody');
productTableRow = () => this.cartInfoTableBody().locator('tr');
allProductTableRows = async () => await (this.productTableRow()).all();
proceedToCheckout = () => this.page.getByText('Proceed To Checkout');
cartIsEmpty = () => this.page.getByText('Cart is empty!');

// actions

async verifyCartProductNames(products: any[]) {
  for (let [index, item] of (await this.allProductTableRows()).entries()) {
    expect(await item.locator('.cart_description').locator('a').textContent()).toContain(products[index].productName)
  }
}

async removeAllProductsFromCart(products: any[]) {
  const number = (await this.allProductTableRows()).length
  for (let i=0; i < number; i++) {
  const id = `[data-product-id="${products[i].id}"]`
  await this.page.locator(id).click();
  await this.page.waitForEvent('requestfinished')
  }
  await expect(this.cartIsEmpty()).toBeVisible()
}
}