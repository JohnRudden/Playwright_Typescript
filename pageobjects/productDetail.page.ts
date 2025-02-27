import {Locator, Page, expect} from '@playwright/test'

export default class ProductDetailPage {
 
      readonly page : Page
      readonly productInformationSection: Locator
      readonly productName: Locator
      readonly category: Locator
      readonly price: Locator
      readonly availability: Locator
      readonly condition: Locator
      readonly brand: Locator
      readonly quantity: Locator
      readonly addToCart: Locator
      readonly reviewForm: Locator
      readonly nameInput: Locator
      readonly emailInput: Locator
      readonly reviewContent: Locator
      readonly submitBtn: Locator

  constructor(page: Page) {
      this.page = page
      this.productInformationSection = page.locator('.product-information');
      this.productName = this.productInformationSection.getByRole('heading', {name : 'Blue Top'});
      this.category = this.productInformationSection.getByText(/category/i);
      this.price = this.productInformationSection.getByText(/Rs./i);
      this.availability = this.productInformationSection.getByText(/availability:/i).locator('..');
      this.condition = this.productInformationSection.getByText(/condition/i).locator('..');
      this.brand = this.productInformationSection.getByText(/brand/i).locator('..');
      this.quantity = page.locator('#quantity');
      this.addToCart = page.getByText('Add to cart');
      this.reviewForm = page.locator('#review-form');
      this.nameInput = this.reviewForm.getByRole('textbox', {name: "name"});
      this.emailInput = this.reviewForm.getByRole('textbox', {name: "email"});
      this.reviewContent = this.reviewForm.getByRole('textbox', {name: "review"});
      this.submitBtn = this.reviewForm.getByRole('button', {name: 'Submit'});
}

// actions

async verifyFirstProductDetails() {
      expect(await this.productName.textContent()).toEqual('Blue Top')
      expect(await this.category.textContent()).toContain('Women > Tops');
      expect(await this.price.textContent()).toContain('500');
      await expect(this.availability).toContainText('In Stock');
      await expect(this.condition).toContainText('New');
      await expect(this.brand).toContainText('Polo');
}

}