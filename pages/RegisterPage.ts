// /pages/RegisterPage.ts
import { expect, Page, Locator } from '@playwright/test';
import type { User } from '../utils/generators';

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly mobile: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly genderMale: Locator;
  readonly occupation: Locator;
  readonly termsCheckbox: Locator;
  readonly submitBtn: Locator;
  readonly successHeader: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.mobile = page.locator('#userMobile');
    this.password = page.locator('#userPassword');
    this.confirmPassword = page.locator('#confirmPassword');
    this.genderMale = page.locator('//input[@value="Male"]');
    this.occupation = page.locator('select.custom-select'); // stable selector
    this.termsCheckbox = page.locator('//input[@type="checkbox"]');
    this.submitBtn = page.locator('#login');
    this.successHeader = page.locator('//h1[normalize-space()="Account Created Successfully"]');
    this.loginBtn = page.locator('//button[normalize-space()="Login"]');
  }

  async expectOnPage() {
    await expect(this.email).toBeVisible();
  }

  async fillForm(u: User) {
    await this.firstName.fill(u.firstName);
    await this.lastName.fill(u.lastName);
    await this.email.fill(u.email);
    await this.mobile.fill(u.phone);
    await this.password.fill(u.password);
    await this.confirmPassword.fill(u.password);
    await this.genderMale.click();
    await this.occupation.selectOption({ label: 'Engineer' });
    await this.termsCheckbox.click();
  }

  async submit() {
    await this.submitBtn.click();
  }

  async expectAccountCreated() {
    await expect(this.successHeader).toBeVisible({ timeout: 15000 });
  }

  async backToLogin() {
    await this.loginBtn.click();
  }
}
