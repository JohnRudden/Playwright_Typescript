import {Locator, Page, expect} from '@playwright/test'

export default class BrandsPage {
 
  readonly page : Page
  readonly sideBar: Locator
  readonly brandsHeading: Locator
  readonly product: Locator
  
  constructor(page: Page) {

   this.page = page
   this.sideBar = this.page.locator('.left-sidebar');
   this.brandsHeading= this.sideBar.getByRole('heading', {name: 'Brands'})
   this.product = this.page.locator('.single-products');
}

// locators

// sideBar = () => this.page.locator('.left-sidebar');
// brandsHeading = () => this.sideBar().getByRole('heading', {name: 'Brands'})
// products = async () => await this.page.locator('.single-products').all()

// actions

async allProducts() {
  return await this.product.all()
}

async select(main: string) {
  const mainHeading = this.sideBar.getByText(main).first();
  await mainHeading.click();
  const brandsSidebarProductCount = (await mainHeading.textContent())?.match(/(\d+)/)![0]
  return Number(brandsSidebarProductCount)
}
}