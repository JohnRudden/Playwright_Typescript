import {test as base, expect} from '@playwright/test';
import HomePage from '../pageobjects/home.page';
import ConsentPage from '../pageobjects/consent.page'
import LoginPage from '../pageobjects/login.page'
import NavBarPage from '../pageobjects/navbar.page'
import SignupPage from '../pageobjects/signup.page'
import DeleteAccountPage from '../pageobjects/deleteAccount.page'
import ProductsPage from '../pageobjects/products.page';
import ProductDetailPage from '../pageobjects/productDetail.page';
import FooterPage from '../pageobjects/footer.page';
import CartPage from '../pageobjects/cart.page';
import ContactPage from '../pageobjects/contact.page';
import Modals  from '../pageobjects/modals.page';
import CheckoutPage from '../pageobjects/checkout.page';
import CategoryPage from '../pageobjects/category.page';
import BrandsPage from '../pageobjects/brands.page';
import  userDetails, { UserDetails } from '../data/testData';

type pageObjects = {
  homePage: HomePage, 
  consentPage: ConsentPage, 
  loginPage: LoginPage, 
  footerPage: FooterPage, 
  navbarPage: NavBarPage,
  signupPage:  SignupPage, 
  deleteAccountPage: DeleteAccountPage, 
  productsPage: ProductsPage, 
  productDetailPage: ProductDetailPage, 
  cartPage: CartPage,
  contactPage: ContactPage,
  modals: Modals,
  checkoutPage: CheckoutPage,
  categoryPage: CategoryPage,
  brandsPage: BrandsPage,
  registerUser: () => Promise<UserDetails>
}

export const test = base.extend<pageObjects>
({
  homePage: async({page}, use) => {
    await use(new HomePage(page))
  },
  consentPage: async({page}, use) => {
    await use(new ConsentPage(page))
  },
  loginPage: async({page}, use) => {
    await use(new LoginPage(page))
  },
  navbarPage: async({page}, use) => {
    await use(new NavBarPage(page))
  },
  signupPage: async({page}, use) => {
    await use(new SignupPage(page))
  },
  deleteAccountPage: async({page}, use) => {
    await use(new DeleteAccountPage(page))
  },
  productsPage: async({page}, use) => {
    await use(new ProductsPage(page))
  },
  productDetailPage: async({page}, use) => {
    await use(new ProductDetailPage(page))
  },
  footerPage: async({page} , use) => {
    await use(new FooterPage(page))
  },
  cartPage: async({page} , use) => {
    await use(new CartPage(page))
  },
  contactPage: async({page} , use) => {
    await use(new ContactPage(page))
  },
  modals: async({page} , use) => {
    await use(new Modals(page))
  },
  checkoutPage: async({page} , use) => {
    await use(new CheckoutPage(page))
  },
  categoryPage: async({page} , use) => {
    await use(new CategoryPage(page))
  },
  brandsPage: async({page} , use) => {
    await use(new BrandsPage(page))
  },


  registerUser: async({page,loginPage,signupPage,navbarPage}, use ) => {
        const register = async () => {
        const user = await userDetails();
        await navbarPage.select('Signup')
        await page.waitForURL('**/login');
        await loginPage.signUp(user.name, user.email)
        expect(page.url()).toContain('signup')
        await signupPage.enterUserDetails(user)
        await signupPage.createAccountBtn().click()
        await expect(signupPage.accountCreatedMsg()).toBeVisible()
        await signupPage.continueBtn().click();
        await expect(navbarPage.loggedInUser().filter({ hasText: `${user.name}`})).toBeVisible()
        return user
        }
        await use(register)
        
    }
  })

export { expect } from '@playwright/test';

