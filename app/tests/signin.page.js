import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SignInPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SIGN_IN}`;
    this.pageSelector = Selector(this.pageId);
    this.emailInput = Selector(`#${COMPONENT_IDS.SIGN_IN_FORM_EMAIL}`);
    this.passwordInput = Selector(`#${COMPONENT_IDS.SIGN_IN_FORM_PASSWORD}`);
    this.submitButton = Selector(`#${COMPONENT_IDS.SIGN_IN_FORM_SUBMIT}`);
    this.errorMessage = Selector('.alert-danger');
    this.signUpLink = Selector('a').withText('Sign up');
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async fillForm(username, password) {
    await this.isDisplayed();
    await t.typeText(this.emailInput, username);
    await t.typeText(this.passwordInput, password);
    await t.wait(1000);
    await t.click(this.submitButton);
  }

  /* Assert that the form shows an error */
  async checkError() {
    await t.expect(this.errorMessage.exists).ok();
  }

  /* Assert that the user is redirected to the home page */
  async checkRedirect() {
    await t.expect(Selector('h1').withText('Home').exists).ok();
  }

  /* Click the Sign Up link and check redirection */
  async clickSignUpLink() {
    await t.click(this.signUpLink);
  }
}

export const signInPage = new SignInPage();
