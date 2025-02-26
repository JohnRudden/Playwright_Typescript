import {Locator, Page, expect} from '@playwright/test'

type products = {id: string, productName: string};

export default class CartPage {
 
  readonly page : Page
  readonly cartInfoTable : Locator
  readonly cartInfoTableBody: Locator
  readonly productTableRow: Locator 
  readonly proceedToCheckout: Locator
  readonly cartIsEmpty: Locator

  constructor(page: Page) {

  this.page = page
  this.cartInfoTable = this.page.locator('#cart_info_table');
  this.cartInfoTableBody = this.cartInfoTable.locator('tbody');
  this.productTableRow = this.cartInfoTableBody.locator('tr');
  this.proceedToCheckout = this.page.locator('text=Proceed To Checkout');
  this.cartIsEmpty = this.page.getByText('Cart is empty!')

}

// actions
async clickProceedToCheckout() {
  await this.proceedToCheckout.click()
}

async allProductTableRows() {
  return await (this.productTableRow).all();
}

async verifyCartProductNames(products: products[]) {
  for (let [index, item] of (await this.allProductTableRows()).entries()) {
    expect(await item.locator('.cart_description').locator('a').textContent()).toContain(products[index].productName)
  }
}

async removeAllProductsFromCart(products: products[]) {
  const number = (await this.allProductTableRows()).length
  for (let i=0; i < number; i++) {
  const id = `[data-product-id="${products[i].id}"]`
  await this.page.locator(id).click();
  await this.page.waitForEvent('requestfinished')
  }
  await expect(this.cartIsEmpty).toBeVisible()
}
}