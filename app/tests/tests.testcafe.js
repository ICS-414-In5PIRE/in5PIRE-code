import { signInPage } from './signin.page';
import { signUpPage } from './signup.page';
import { balanceSheetInputPage } from './balanceSheetInput.test';
import { newNavBar } from './newNavBar.component';
import { landingPage } from './landing.page';
import { financialProfiles } from './financialProfiles.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const regCredentials = { username: 'bar@foo.com', password: 'changeme' };
const newCredentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that signin works', async () => {
  await newNavBar.signIn();
  await signInPage.isDisplayed();
  await signInPage.fillForm(newCredentials.username, newCredentials.password);
  await landingPage.isDisplayed();
});

test('Test that signup works', async () => {
  await newNavBar.signIn();
  await signInPage.clickSignUpLink();
  await signUpPage.isDisplayed();
  await signUpPage.signupUser(regCredentials.username, regCredentials.password);
  await landingPage.isDisplayed();
});

test('Test the Balance input page page', async () => {
  // Go to the signup page and sign up a new user
  await newNavBar.signIn();
  await signInPage.fillForm(newCredentials.username, newCredentials.password);
  // Navigate to the BalanceSheetInput page
  await newNavBar.goToBalanceSheetPage();
  // Check if the BalanceSheetInput page is displayed
  await balanceSheetInputPage.isDisplayed();
});

test('Test the financial profiles page', async (testController) => {
  await newNavBar.signIn();
  await signInPage.fillForm(newCredentials.username, newCredentials.password);
  await newNavBar.goToFinancialProfilesPage(testController);
  await financialProfiles.isDisplayed();
});
