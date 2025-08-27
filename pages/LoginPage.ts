// /pages/LoginPage.ts
import { expect, Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly registerLink: Locator;
  readonly loginSuccessToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginBtn = page.locator('#login');
    this.registerLink = page.locator('//a[normalize-space()="Register here"]');
    this.loginSuccessToast = page.locator('//div[@aria-label="Login Successfully"]');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await expect(this.emailInput).toBeVisible();
  }

  async openRegistration() {
    await this.registerLink.click();
  }

  async login(email: string, password: string) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async expectLoggedIn() {
    await expect(this.loginSuccessToast).toBeVisible({ timeout: 15000 });
  }
}
