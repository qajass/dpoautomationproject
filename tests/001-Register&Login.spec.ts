import {test,expect} from '@playwright/test';

// 🔹 Utility functions for random values
const randomString = (len: number) =>
  Math.random().toString(36).substring(2, 2 + len);

const randomEmail = () =>
  `user_${Date.now()}_${Math.floor(Math.random() * 1000)}@mailinator.com`;

const randomPhone = () =>
  Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');

test('Register with random data and login using the same credentials', async ({ page }) => {
  // Generate random user details
  const firstName = `FN_${randomString(5)}`;
  const lastName = `LN_${randomString(5)}`;
  const email = randomEmail();
  const phone = randomPhone();
  const password = '@Qwerty543!'; // keep password fixed for simplicity

//Logs
console.log({ firstName, lastName, email, phone, password });

//test('Navigate Login Page,', async({page}) => {

//Open Site
await page.goto ('https://rahulshettyacademy.com/client/#/auth/login');

//Open Registration
await page.locator('//a[normalize-space()="Register here"]').click();

// 🔹 Fill Registration Form
await expect(page.locator('#userEmail')).toBeVisible();
await page.locator('#firstName').fill(firstName);
await page.locator('#lastName').fill(lastName);
await page.locator('#userEmail').fill(email);
await page.locator('#userMobile').fill(phone); // adjust selector if different
await page.locator('#userPassword').fill(password);
await page.locator('#confirmPassword').fill(password);
await page.locator('//input[@value="Male"]').click();
await page.locator('select.custom-select').selectOption({ label: 'Engineer' });
await page.locator('//input[@type="checkbox"]').click();

// 🔹 Register
await page.locator('#login').click();

// Wait for registration success (adjust locator as needed)
await expect(page.locator('//h1[normalize-space()="Account Created Successfully"]')).toBeVisible({ timeout: 15000 });

//Return to Login
await page.locator('//button[normalize-space()="Login"]').click();

//Verify Login Page
await expect(page.locator('#userEmail')).toBeVisible();

// 🔹 Login using the same random email & password
await page.locator('#userEmail').fill(email);
await page.locator('#userPassword').fill(password);
await page.locator('#login').click();

// 🔹 Verify successful login
await expect(page.locator('//div[@aria-label="Login Successfully"]')).toBeVisible({ timeout: 15000 });

});