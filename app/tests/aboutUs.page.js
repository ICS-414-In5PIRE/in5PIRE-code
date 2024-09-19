import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AboutUsPage {
  constructor() {
    // Ensure the correct page selector, #landingPage might be incorrect.
    this.pageId = `#${PAGE_IDS.ABOUT_US}`; // Assuming you have a correct PAGE_ID for About Us.
    this.pageSelector = Selector(this.pageId);

  }

  // Asserts the About Us page is correctly displayed
  async isDisplayed() {

    await t.expect(this.pageSelector.exists).ok();
  }

}

export const aboutUsPage = new AboutUsPage();
