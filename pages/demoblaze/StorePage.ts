// /pages/demoblaze/StorePage.ts
import { expect, Page, Locator } from '@playwright/test';

export type OrderData = {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
};

export class StorePage {
  readonly page: Page;

  // --- your original selectors preserved ---
  readonly laptopsTab: Locator;
  readonly nextBtn: Locator;
  productLink = (name: string) =>
    this.page.locator(`//a[normalize-space()="${name}"]`);
  readonly addToCartLink: Locator;
  readonly cartLink: Locator;
  readonly placeOrderBtn: Locator;

  // order modal
  readonly orderModalLabel: Locator;
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly cardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly purchaseBtn: Locator;

  // confirmation
  readonly thankYouHeader: Locator;
  readonly okBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.laptopsTab = page.locator('//a[3]'); // Laptops
    this.nextBtn = page.locator('//button[@id="next2"]');
    this.addToCartLink = page.locator('//a[normalize-space()="Add to cart"]');
    this.cartLink = page.locator('//a[normalize-space()="Cart"]');
    this.placeOrderBtn = page.locator('//button[normalize-space()="Place Order"]');

    this.orderModalLabel = page.locator('#orderModalLabel');
    this.nameInput = page.locator('#name');
    this.countryInput = page.locator('#country');
    this.cityInput = page.locator('#city');
    this.cardInput = page.locator('#card');
    this.monthInput = page.locator('#month');
    this.yearInput = page.locator('#year');
    this.purchaseBtn = page.locator('//button[normalize-space()="Purchase"]');

    this.thankYouHeader = page.locator('//h2[normalize-space()="Thank you for your purchase!"]');
    this.okBtn = page.locator('//button[normalize-space()="OK"]');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html#');
  }

  async openLaptopsCategory() {
    await this.laptopsTab.click();
  }

  async nextPage() {
    await this.nextBtn.click();
  }

  async openProduct(name: string) {
    await this.productLink(name).click();
  }

  async addToCartAndAcceptAlert() {
    await expect(this.addToCartLink).toBeVisible();
    this.page.once('dialog', async d => { await d.accept(); });
    await this.addToCartLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openPlaceOrder() {
    await expect(this.placeOrderBtn).toBeVisible();
    await this.placeOrderBtn.click();
  }

  async fillOrderForm(data: OrderData) {
    await expect(this.orderModalLabel).toBeVisible();
    await this.nameInput.fill(data.name);
    await this.countryInput.fill(data.country);
    await this.cityInput.fill(data.city);
    await this.cardInput.fill(data.card);
    await this.monthInput.fill(data.month);
    await this.yearInput.fill(data.year);
  }

  async purchase() {
    await this.purchaseBtn.click();
  }

  async expectThankYou() {
    await expect(this.thankYouHeader).toBeVisible();
  }

  async confirmOk() {
    await this.okBtn.click();
  }
}
