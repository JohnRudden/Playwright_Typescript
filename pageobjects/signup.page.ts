import {Page, expect} from '@playwright/test'
// import {userDetails} from '../data/testData'

export default class SignupPage {
  readonly page : Page
  readonly userDetails: any
  
  constructor(page: Page) {
    this.page = page
}

// Locators

genderTitle = (userDetailsTitle: string) => this.page.getByRole('radio', {name: `${userDetailsTitle}`})
name = () => this.page.getByRole('textbox' , {name: 'Name *'})
password = () => this.page.getByRole('textbox' , {name: 'Password *'})
day = () => this.page.locator('#days')
month = () => this.page.locator('#months')
year = () => this.page.locator('#years')
newsletter = () => this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })
offers = () => this.page.getByRole('checkbox', { name: 'Receive special offers from' })
firstName = () => this.page.getByRole('textbox', { name: 'First name *' })
lastName = () => this.page.getByRole('textbox', { name: 'Last name *' })
company = () => this.page.getByRole('textbox', { name: 'Company', exact: true })
address = () => this.page.getByRole('textbox', { name: 'Address *', exact: false })
address2 = () => this.page.getByRole('textbox', { name: 'Address 2', exact: true })
country = () => this.page.getByLabel('Country *')
state = () => this.page.getByRole('textbox', { name: 'State *', exact: true })
city = () => this. page.getByRole('textbox', { name: 'City'})
zipcode = () => this.page.locator('[data-qa="zipcode"]')
mobile = () => this.page.getByRole('textbox', { name: 'Mobile Number *', exact: true })
createAccountBtn = () => this.page.getByRole('button', {name:'Create Account'})
accountCreatedMsg = () => this.page.getByRole('heading', {name: "Account Created!"})
continueBtn = () => this.page.getByRole('link', {name: "Continue"})

// actions

enterUserDetails = async (userDetails:any) => {
      const [day, month, year] = userDetails.birthDate.split("/");
      const isOffersChecked = await this.offers().isChecked();
      const isNewsletterChecked = await this.newsletter().isChecked();
      await this.genderTitle(userDetails.title).click();
      await this.password().fill(userDetails.password);
      await this.day().selectOption(parseInt(day).toString());
      await this.month().selectOption(parseInt(month).toString());
      await this.year().selectOption(parseInt(year).toString());
      if (userDetails.newsletter && !isNewsletterChecked) {
        await this.newsletter().check();
      } else if (!userDetails.newsletter && isNewsletterChecked) {
        await this.newsletter().check();
      }
      if (userDetails.offers && !isOffersChecked) {
          await this.offers().check()
        } else if (!userDetails.offers && isOffersChecked) {
            await this.offers().check()
        }
   
      await this.firstName().click();
      await this.firstName().fill(userDetails.firstName);
      await this.lastName().click();
      await this.lastName().fill(userDetails.lastName);
      await this.company().click();
      await this.company().fill(userDetails.company);
      await this.address().fill(userDetails.address);
      await this.address2().fill(userDetails.address2);
      await this.country().selectOption(userDetails.country);
      await this.state().fill(userDetails.state);
      await this.city().fill(userDetails.city);
      await this.zipcode().fill(userDetails.zip)
      await this.mobile().fill(userDetails.mobile);
}

    /**
            There is a bug in the HTML on the site - The label for zipcode is also assigned to the city input field therefore
            when trying to enter data into the zipcode input field using getByRole
            it populates the city input field, overriding the previous value - This causes the accessibility and roles to be messed up for both City and Zipcode
            This would be logged as a defect to be resolved and the automation test would be failed.
            However, in order to carry on with writing tests I have used a different locator method which will select the zipcode field correctly. I would not normally allow this.
      **/
}



