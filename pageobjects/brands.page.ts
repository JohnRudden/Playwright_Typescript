import {Page, expect} from '@playwright/test'

export default class BrandsPage {
 
  readonly page : Page
  
  constructor(page: Page) {

   this.page = page

}

// locators

sideBar = () => this.page.locator('.left-sidebar');
brandsHeading = () => this.sideBar().getByRole('heading', {name: 'Brands'})
products = async () => await this.page.locator('.single-products').all()

// actions


async select(main: string) {
  const mainHeading = this.sideBar().getByText(main).first();
  await mainHeading.click();
  const brandsSidebarProductCount = (await mainHeading.textContent())?.match(/(\d+)/)![0]
  return Number(brandsSidebarProductCount)
}
}