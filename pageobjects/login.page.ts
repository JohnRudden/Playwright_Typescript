import {Locator, Page} from '@playwright/test'

export default class LoginPage {
 
  readonly page : Page
  readonly loginHeading: Locator
  readonly signupHeading: Locator
  readonly signupName: Locator
  readonly signupEmail: Locator
  readonly loginEmail: Locator
  readonly loginPassword: Locator
  readonly signupBtn: Locator
  readonly loginBtn: Locator
  readonly loginErrorMessage: Locator
  readonly signupErrorMessage: Locator

 
  constructor(page: Page) {
    this.page = page
    this.loginHeading = page.getByText('Login to your account');
    this.signupHeading = page.getByText('New User Signup!');
    this.signupName     = page.locator('[data-qa="signup-name"]');
    this.signupEmail    = page.locator('[data-qa="signup-email"]');
    this.loginEmail     = page.locator('[data-qa="login-email"]');  
    this.loginPassword  = page.locator('[data-qa="login-password"]');
    this.signupBtn = page.getByRole('button', {name:'Signup'});
    this.loginBtn = page.getByRole('button', {name:'Login'});
    this.loginErrorMessage = page.getByText('Your email or password is incorrect!');
    this.signupErrorMessage = page.getByText('Email Address already exist!');
}

// actions

async signUp(name: string, email: string) {
  await this.signupName.fill(name);
  await this.signupEmail.fill(email);
  await this.signupBtn.click()
}

async login(email: string, password: string) {
  await this.loginEmail.fill(email);
  await this.loginPassword.fill(password);
  await this.loginBtn.click()
}
}

