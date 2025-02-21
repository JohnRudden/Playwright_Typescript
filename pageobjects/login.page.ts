import {Page} from '@playwright/test'

export default class LoginPage {
 
  readonly page : Page
 
  constructor(page: Page) {

   this.page = page

}

// locators

loginHeading = () => this.page.getByText('Login to your account');
signupHeading = () => this.page.getByText('New User Signup!');
signupName     = () => this.page.locator('[data-qa="signup-name"]');
signupEmail    = () => this.page.locator('[data-qa="signup-email"]');
loginEmail     = () => this.page.locator('[data-qa="login-email"]');
loginPassword  = () => this.page.locator('[data-qa="login-password"]');
signupBtn = () => this.page.getByRole('button', {name:'Signup'})
loginBtn = () => this.page.getByRole('button', {name:'Login'})
loginErrorMessage = () => this.page.getByText('Your email or password is incorrect!')
signupErrorMessage = () => this.page.getByText('Email Address already exist!')

// actions

async signUp(name: string, email: string) {
  await this.signupName().fill(name);
  await this.signupEmail().fill(email);
  await this.signupBtn().click()
}

async login(email: string, password: string) {
  await this.loginEmail().fill(email);
  await this.loginPassword().fill(password);
  await this.loginBtn().click()
}
}

