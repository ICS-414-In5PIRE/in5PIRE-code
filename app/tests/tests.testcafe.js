import { signInPage } from './signin.page';
import { signUpPage } from './signup.page';
import { balanceSheetInputPage } from './balanceSheetInput.test';
import { newNavBar } from './newNavBar.component';
import { landingPage } from './landing.page';
import { financialProfiles } from './financialProfiles.page';
import { aboutUsPage } from './aboutUs.page';
import { userGuide } from './userguide.page';
// import { aboutUs } from './aboutUs.page';
import { contactUsPage } from './contactUs.page';
import { faqPage } from './FAQ.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const regCredentials = { username: 'bar@foo.com', password: 'changeme' };
const newCredentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});
test('Test that about us shows up', async () => {
  // Click the "About Us" button
  await landingPage.clickAboutUs();
  // Verify that the About Us page is displayed
  await aboutUsPage.isDisplayed();
});

test('Test that the user guide page shows up', async () => {
  await newNavBar.goToUserGuidePage();
  await userGuide.isDisplayed();
});

test('Test that the about us page shows up', async () => {
  await newNavBar.goToAboutUsPage();
  await aboutUsPage.isDisplayed();
});

test('Test that the FAQ page shows up', async () => {
  await newNavBar.goToFaqPage();
  await faqPage.isDisplayed();
});

test('Test that the contact us page shows up', async () => {
  await newNavBar.goToContactSupportPage();
  await contactUsPage.isDisplayed();
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
