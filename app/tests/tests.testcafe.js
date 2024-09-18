import { signInPage } from './signin.page';
import { signUpPage } from './signup.page';
import { balanceSheetInputPage } from './balanceSheetInput.test';
import { newNavBar } from './newNavBar.component';
import { landingPage } from './landing.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

/*
test('Test that signin and signout work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});
*/

/*
test('Test that user pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoAddStuffPage();
  await addStuffPage.isDisplayed();
  await navBar.gotoListStuffPage();
  await listStuffPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
  await t.click(editLinks.nth(0));
  await editStuffPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});
*/

/*
test('Test that sign up and sign out work', async () => {
  await navBar.gotoSignUpPage();
  await signUpPage.isDisplayed();
  await signUpPage.signupUser(newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(newCredentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});
*/

/*
test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoAddStuffPage();
  await addStuffPage.isDisplayed();
  await navBar.gotoListStuffPage();
  await listStuffPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
  await t.click(editLinks.nth(0));
  await editStuffPage.isDisplayed();
  await navBar.gotoListStuffAdminPage();
  await listStuffAdminPage.isDisplayed();
  // await navBar.gotoManageDatabasePage();
  // await manageDatabasePage.isDisplayed();
});
*/

test('BalanceSheetInput is displayed', async () => {
  // Go to the signup page and sign up a new user
  await newNavBar.signIn();
  await signInPage.isDisplayed();
  await signInPage.clickSignUpLink();
  await signUpPage.signupUser(newCredentials.username, newCredentials.password);
  // Navigate to the BalanceSheetInput page
  await newNavBar.goToBalanceSheetPage();
  // Check if the BalanceSheetInput page is displayed
  await balanceSheetInputPage.isDisplayed();
});
