// /tests/register-login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { makeUser } from '../utils/generators';

test('Register with random data and login using the same credentials (POM)', async ({ page }) => {
  const login = new LoginPage(page);
  const register = new RegisterPage(page);
  const user = makeUser();

  console.log('[TEST USER]', user);

  await login.goto();
  await login.openRegistration();

  await register.expectOnPage();
  await register.fillForm(user);
  await register.submit();

  await register.expectAccountCreated();
  await register.backToLogin();

  await login.login(user.email, user.password);
  await login.expectLoggedIn();
});
