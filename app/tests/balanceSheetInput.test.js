import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class BalanceSheetInputPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.BALANCE_SHEET_INPUT}`;
    this.pageSelector = Selector(this.pageId);

    this.submitButton = Selector('button[type="submit"]');
    this.pettyCashInput = Selector('input[name="pettyCash"]');
    this.cashInput = Selector('input[name="cash"]');
    this.errorMessage = Selector('.ui.negative.message');
    this.successMessage = Selector('.ui.positive.message');
  }

  /* Assert that the BalanceSheetInput page is displayed */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /* Fill the form fields */
  async fillForm(formData) {
    await t.typeText(this.pettyCashInput, formData.pettyCash, { replace: true });
    await t.typeText(this.cashInput, formData.cash, { replace: true });
    // Add other fields as needed
  }

  /* Submit the form */
  async submitForm() {
    await t.click(this.submitButton);
  }

  /* Assert that the form submitted successfully */
  async checkSuccess() {
    await t.expect(this.successMessage.exists).ok();
  }

  /* Assert that the form shows an error */
  async checkError() {
    await t.expect(this.errorMessage.exists).ok();
  }
}

export const balanceSheetInputPage = new BalanceSheetInputPage();