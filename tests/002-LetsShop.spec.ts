import {test,expect} from '@playwright/test';

test('Navigate Login Page,', async({page}) => {

//Open Site
await page.goto ('https://www.demoblaze.com/index.html#');

//Adding to cart 1st Item
await page.locator('//a[3]').click(); //Laptops
await page.locator('//button[@id="next2"]').click(); //Next Page
await page.locator('//a[normalize-space()="MacBook Pro"]').click(); //Selecting item
await expect(page.locator('//a[normalize-space()="Add to cart"]')).toBeVisible();
await page.locator('//a[normalize-space()="Add to cart"]').click(); //Add to cart

// 👇 Handle the alert popup
page.once('dialog', async dialog => {
await dialog.accept(); // clicks OK
});

//Placing order
await page.locator('//a[normalize-space()="Cart"]').click(); //Go to cart
await expect(page.locator('//button[normalize-space()="Place Order"]')).toBeVisible();
await page.locator('//button[normalize-space()="Place Order"]').click(); //Place order

//Purchasing
await expect(page.locator('#orderModalLabel')).toBeVisible();
await page.locator('#name').fill('Juan dela Cruz'); //Input Name
await page.locator('#country').fill('Philippines'); //Input Country
await page.locator('#city').fill('San Fernando City'); //Input City
await page.locator('#card').fill('1234 5678 0000'); //Input Credit Card
await page.locator('#month').fill('December'); //Input Month
await page.locator('#year').fill('2025'); //Input Year
await page.locator('//button[normalize-space()="Purchase"]').click(); //Purchase

//Done
await expect(page.locator('//h2[normalize-space()="Thank you for your purchase!"]')).toBeVisible();
await page.locator('//button[normalize-space()="OK"]').click();
//await expect(page.locator('#cat')).toBeVisible();

})