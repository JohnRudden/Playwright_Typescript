import {Locator, Page, expect} from '@playwright/test'

export default class ProductsPage {
 
  readonly page : Page
  readonly allProductsHeading: Locator
  readonly productListParent: Locator
  readonly productItem: Locator
  readonly searchInput: Locator
  readonly searchBtn: Locator
  readonly cartParent: Locator
  readonly continueShoppingBtn: Locator
  readonly recommendedItems: Locator
  readonly recommendedItemsCarousel: Locator
  readonly activeRecommendedItems: Locator
 
  constructor(page: Page) {
    this.page = page
    this.allProductsHeading = page.getByRole('heading', {name: 'All Products'});;
    this.productListParent = page.locator('.features_items');
    this.productItem = this.productListParent.locator('.product-image-wrapper > .single-products');
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchBtn = this.searchInput.locator('..').locator('#submit_search');
    this.cartParent = page.locator('#cartModal');
    this.continueShoppingBtn = this.cartParent.getByText('Continue Shopping');
    this.recommendedItems = page.locator('.recommended_items');
    this.recommendedItemsCarousel = this.recommendedItems.locator('#recommended-item-carousel');
    this.activeRecommendedItems = this.recommendedItemsCarousel.locator('.item.active').locator('.product-image-wrapper > .single-products');
}

// actions

async randomItem (array: []) {
  const randomIndex = Math.floor(Math.random() * array .length);
  return array[randomIndex];
}

async selectRandomProduct(): Promise<any> {
  const list = await this.productList();
  const selectItem = await this.randomItem(await list)
  return selectItem;
};

async selectRandomRecommendedItem(): Promise<any> {
  const list = await this.activeRecommendedList();
  const selectItem = await this.randomItem(list)
  return selectItem;
};
  
async productList(): Promise<any> {
  await this.page.waitForLoadState('domcontentloaded')
  const productList = await this.productItem.all()
  return productList
  }

async activeRecommendedList(): Promise<any> {
  return await this.activeRecommendedItems.all();
  }

async performSearch(text: string) {
  await this.page.waitForEvent('load');
  await this.searchInput.fill(text);
  await this.searchBtn.click();
}

async addRandomQtyToCart(quantity: number = 1, productSection: string = "featured") {
  let i = 0;
  let productCapture : any[] = [];
  while (i < quantity) {
    let item:any;
    switch (productSection) {
        case "featured" :
          item = await this.selectRandomProduct();
          break;
        case "recommended" :
          item = await this.selectRandomRecommendedItem();
          break;
        default:
          item = await this.selectRandomProduct();
    }
    await item.scrollIntoViewIfNeeded();
    const prodcutNameSelector = item.locator('.productinfo').locator('p');
    const productName = await prodcutNameSelector.textContent();
    const productId = await item.locator('.productinfo > a').getAttribute('data-product-id');
    const productObj = {"id": productId, "productName": productName};
   
    if (!productCapture.some(item => item.productName === productObj.productName)) {
      productCapture.push(productObj );
      await (await (item.getByText("Add to cart"))).first().click();
      await this.continueShoppingBtn.click();
      i++
      } 
    }
    return productCapture;
  }

async addAllToCart(list: any) {
  await this.page.waitForLoadState('load');
  let productCapture : any[] = [];
  let i=0;
  while (i < list.length) {
    const productName = await (list[i]).locator('.productinfo > p').textContent();
    const productId = await  (list[i]).locator('.productinfo > a').getAttribute('data-product-id');
    const productObj = {"id": await productId, "productName": await productName};
    if (!productCapture.some(item => item.productName === productObj.productName)) {
      await (await (list[i]).getByText("Add to cart")).first().click();
      productCapture.push(productObj );
      await this.continueShoppingBtn.click();
      i++
    } 
    }
    return productCapture;
  }

};