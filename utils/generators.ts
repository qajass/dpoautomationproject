// /utils/generators.ts
export const randomString = (len: number) =>
  Math.random().toString(36).substring(2, 2 + len);

export const randomEmail = () =>
  `user_${Date.now()}_${Math.floor(Math.random() * 1000)}@mailinator.com`;

export const randomPhone = () =>
  Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export const makeUser = (): User => ({
  firstName: `FN_${randomString(5)}`,
  lastName: `LN_${randomString(5)}`,
  email: randomEmail(),
  phone: randomPhone(),
  password: '@Qwerty543!' // keep fixed or randomize if you prefer
});
