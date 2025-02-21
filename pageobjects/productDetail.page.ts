import {Page, expect} from '@playwright/test'

export default class ProductDetailPage {
 
  readonly page : Page
 
  constructor(page: Page) {

   this.page = page

}

// locators

productInformationSection = () => this.page.locator('.product-information')
productName = () => this.productInformationSection().getByRole('heading', {name : 'Blue Top'})
category = () => this.productInformationSection().getByText(/category/i)
price = () => this.productInformationSection().getByText(/Rs./i);
availability = () => this.productInformationSection().getByText(/availability:/i).locator('..')
condition = () => this.productInformationSection().getByText(/condition/i).locator('..')
brand = () => this.productInformationSection().getByText(/brand/i).locator('..')
quantity = () => this.page.locator('#quantity');
addToCart = () => this.page.getByText('Add to cart');
reviewForm = () => this.page.locator('#review-form');
nameInput = () => this.reviewForm().getByRole('textbox', {name: "name"});
emailInput = () => this.reviewForm().getByRole('textbox', {name: "email"});
reviewContent = () => this.reviewForm().getByRole('textbox', {name: "review"});
submitBtn = () => this.reviewForm().getByRole('button', {name: 'Submit'});

// actions

async verifyFirstProductDetails() {
      expect(await this.productName().textContent()).toEqual('Blue Top')
      expect(await this.category().textContent()).toContain('Women > Tops');
      expect(await this.price().textContent()).toContain('500');
      await expect(this.availability()).toContainText('In Stock');
      await expect(this.condition()).toContainText('New');
      await expect(this.brand()).toContainText('Polo');
}

}