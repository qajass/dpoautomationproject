import { test } from '@playwright/test';
import { StorePage } from '../pages/demoblaze/StorePage';
import { makeOrder } from '../utils/fakerPerson';

test('Add MacBook Pro to cart and complete purchase (POM + Faker)', async ({ page }) => {
  const store = new StorePage(page);

  await store.goto();

  // Adding to cart
  await store.openLaptopsCategory();
  await store.nextPage();
  await store.openProduct('MacBook Pro');
  await store.addToCartAndAcceptAlert();

  // Placing the order
  await store.goToCart();
  await store.openPlaceOrder();

  // Generate fake person/order
  const order = makeOrder();
  console.log('[FAKER ORDER]', order);

  await store.fillOrderForm(order);
  await store.purchase();

  // Confirmation
  await store.expectThankYou();
  await store.confirmOk();
});
