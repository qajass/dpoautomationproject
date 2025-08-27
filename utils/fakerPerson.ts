// utils/fakerPerson.ts
import { faker } from '@faker-js/faker';
import type { OrderData } from '../pages/demoblaze/StorePage';

// Optional: make runs deterministic (great for CI):
// faker.seed(12345);

export const makeOrder = (): OrderData => {
  // Month name (e.g., "December")
  const month = faker.date.month();

  // A future year (1–5 years ahead)
  const year = String(new Date().getFullYear() + faker.number.int({ min: 1, max: 5 }));

  // Random credit card number, stripped to digits (Demoblaze isn’t strict)
  const card = faker.finance.creditCardNumber().replace(/\D/g, '').slice(0, 16);

  return {
    name: faker.person.fullName(),
    country: 'Philippines',            // keep fixed if you prefer
    city: faker.location.city(),
    card,
    month,
    year,
  };
};
