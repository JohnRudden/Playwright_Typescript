import {Locator, Page, expect} from '@playwright/test'

export default class CategoryPage {
 
  readonly page : Page
  readonly sideBar: Locator
  readonly categoryHeading: Locator
  
  constructor(page: Page) {
      this.page = page
      this.sideBar = page.locator('.left-sidebar')
      this.categoryHeading = this.sideBar.getByRole('heading', {name: 'Category'})
}

// actions

topLevelCategories: string[] = ['Women', 'Men', 'Kids']
subCategories: string[] = ['Dress', 'Tops', 'Saree', 'Jeans', 'Tshirts', 'Tops & Shirts']

async select(main: string = 'women', subItem : string = 'dress') {
  if (!this.topLevelCategories.includes(main) || !this.subCategories.includes(subItem)) {
    throw Error("Category does not exist")
  }
  const mainHeading = this.sideBar.getByText(main, {exact: true}).first();
  const subHeading = this.page.locator(`#${main}`).getByText(subItem);
  await this.page.waitForLoadState('load');
  await mainHeading.click();
  await subHeading.click();
}

}