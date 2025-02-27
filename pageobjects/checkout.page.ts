import {Locator, Page, expect} from '@playwright/test'
import { UserDetails } from '../data/testData';

export default class CheckoutPage {
 
  readonly page : Page
  readonly addressInformationHeading: Locator
  readonly checkoutInformationParent: Locator     
  readonly deliveryAddressDetails: Locator
  readonly billingAddressDetails: Locator      
  readonly cartInfoSection: Locator
  readonly cartTableBody: Locator
  readonly productTableRow: Locator
  readonly textMsgArea: Locator
  readonly placeOrder: Locator

  
  constructor(page: Page) {
      this.page = page
      this.addressInformationHeading = page.getByText('Address Information');
      this.checkoutInformationParent = page.locator('#checkout-information');         
      this.deliveryAddressDetails = page.locator('#address_delivery').getByRole('listitem')
      this.billingAddressDetails = page.locator('#address_invoice').getByRole('listitem')
      this.cartInfoSection = page.locator('#cart_info');
      this.cartTableBody = this.cartInfoSection.locator('tbody');
      this.productTableRow =  this.cartTableBody.locator('tr');
      this.textMsgArea = page.locator('#ordermsg > textarea');
      this.placeOrder = page.getByText('Place Order');
}

// actions

async allDeliveryAddressDetails() {
  return await this.deliveryAddressDetails.all();
}

async allBillingAddressDetails() {
  return await this.billingAddressDetails.all();
}

async allProductTableRows() {
  return await this.productTableRow.all();
}

async verifyAddressDetails(userDetails: UserDetails, type: string) {
 let address: Locator[];
 let heading: string;
  switch (type) {
    case 'billing' :
      await this.page.waitForSelector('#address_invoice');
      address = await this.allBillingAddressDetails();
      heading = "Your billing address";
      break;
    case 'delivery' :
      await this.page.waitForSelector('#address_delivery');
      address = await this.allDeliveryAddressDetails();
      heading = "Your delivery address";
      break;
    default :
      address = await this.allDeliveryAddressDetails();
      heading = "Your delivery address";
  }
        expect(await address[0].textContent()).toEqual(heading);
        expect(await address[1].textContent()).toEqual(`${userDetails.title} ${userDetails.name}`);
        expect(await address[2].textContent()).toEqual(userDetails.company);
        expect(await address[3].textContent()).toEqual(userDetails.address);
        expect(await address[4].textContent()).toEqual(userDetails.address2);
        expect((await address[5].textContent())?.replace(/\s+/g,' ').trim()).toContain(`${userDetails.city} ${userDetails.state} ${userDetails.zip}`);
        expect(await address[6].textContent()).toEqual(userDetails.country);
        expect(await address[7].textContent()).toEqual(userDetails.mobile);
}
}