import {Locator, Page, expect} from '@playwright/test'
import { UserDetails } from '../data/testData';

export default class CheckoutPage {
 
  readonly page : Page
  
  constructor(page: Page) {

   this.page = page

}

// locators

addressInformationHeading = () => this.page.getByText('Address Information');
checkoutInformationParent = () => this.page.locator('#checkout-information');
deliveryAddressDetails = async () => await this.page.locator('#address_delivery').getByRole('listitem').all();
billingAddressDetails = async () => await this.page.locator('#address_invoice').getByRole('listitem').all();
cartInfoSection = () => this.page.locator('#cart_info');
cartTableBody = () => this.cartInfoSection().locator('tbody');
productTableRow = () => this.cartTableBody().locator('tr');
allProductTableRows = () => this.productTableRow().all();
textMsgArea = () => this.page.locator('#ordermsg > textarea');
placeOrder = () => this.page.getByText('Place Order');

// actions

async verifyAddressDetails(userDetails: UserDetails, type: string) {
 let address: Locator[];
 let heading: string;
  switch (type) {
    case 'billing' :
      await this.page.waitForSelector('#address_invoice');
      address = await this.billingAddressDetails();
      heading = "Your billing address";
      break;
    case 'delivery' :
      await this.page.waitForSelector('#address_delivery');
      address = await this.deliveryAddressDetails();
      heading = "Your delivery address";
      break;
    default :
      address = await this.deliveryAddressDetails();
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