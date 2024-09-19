import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class LandingPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.LANDING}`;
    this.pageSelector = Selector(this.pageId);

    // Selectors for buttons
    this.getStartedButton = Selector('a').withText('Get Started');
    this.aboutUsButton = Selector('[data-test="about-us-link"]'); // Updated to select by data-test attribute
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }

  /* Clicks the "Get Started" button */
  async clickGetStarted() {
    await t.expect(this.getStartedButton.exists).ok(); // Ensure button exists
    await t.click(this.getStartedButton); // Click button
  }

  /* Clicks the "About us" button */
  async clickAboutUs() {
    await t.expect(this.aboutUsButton.exists).ok(); // Ensure button exists
    await t.click(this.aboutUsButton); // Click button
  }
}

export const landingPage = new LandingPage();
