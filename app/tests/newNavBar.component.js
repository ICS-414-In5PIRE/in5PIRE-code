import { Selector, t } from 'testcafe';

class NewNavBar {
  constructor() {
    // Define the page ID and its selectors
    this.pageId = `#new-nav`;
    this.pageSelector = Selector(this.pageId);

    this.homeLink = Selector('a').withText('Home');
    this.userGuideLink = Selector('a').withText('User Guide');
    this.faqLink = Selector('a').withText('FAQ');
    this.contactSupportLink = Selector('a').withText('Contact Support');
    this.signInButton = Selector('button').withText('Sign in');
    this.signOutButton = Selector('button').withText('Sign out');
    this.dataInputDropdown = Selector('a').withText('Data Input');
    this.financialProfilesLink = Selector('a').withText('My Financial Profiles');
    this.balanceSheetLink = Selector('a').withText('Balance Input Form');
  }

  /* Assert that the Navbar is displayed */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /* Navigate to the Home page */
  async goToHomePage() {
    await t.click(this.homeLink);
  }

  /* Navigate to the User Guide page */
  async goToUserGuidePage() {
    await t.click(this.userGuideLink);
  }

  /* Open the Support dropdown and navigate to FAQ */
  async goToFaqPage() {
    await t.click(Selector('#navbarDropdown').withText('Support'));
    await t.click(this.faqLink);
  }

  /* Open the Support dropdown and navigate to Contact Support */
  async goToContactSupportPage() {
    await t.click(Selector('#navbarDropdown').withText('Support'));
    await t.click(this.contactSupportLink);
  }

  /* Sign in to the application */
  async signIn() {
    await t.click(this.signInButton);
  }

  /* Sign out of the application */
  async signOut() {
    await t.click(this.signOutButton);
  }

  /* Open the Data Input dropdown */
  async openDataInputDropdown() {
    await t.click(this.dataInputDropdown);
  }

  /* Navigate to the Financial Profiles page */
  async goToFinancialProfilesPage() {
    await this.openDataInputDropdown();
    await t.click(this.financialProfilesLink);
  }

  /* Navigate to the Balance Sheet Input Form */
  async goToBalanceSheetPage() {
    await this.openDataInputDropdown();
    await t.click(this.balanceSheetLink);
  }
}

export const newNavBar = new NewNavBar();
