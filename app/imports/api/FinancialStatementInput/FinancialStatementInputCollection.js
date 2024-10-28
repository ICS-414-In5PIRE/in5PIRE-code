import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { FinancialStatementInputSchema } from './FinancialStatementInputSchema';

export const financialStatementPublications = {
  financialStatement: 'FinancialStatement',
  financialStatementAdmin: 'FinancialStatementAdmin',
};

class FinancialStatementInputCollection extends BaseCollection {
  constructor() {
    super('FinancialStatementInput', FinancialStatementInputSchema);
  }

  /**
   * Defines a new FinancialStatementInput.
   * @param {Object} data The input data for the Financial Statement
   * @return {String} The document ID of the new FinancialStatementInput.
   */
  define({
    year, owner, profileId, pettyCash, cash, cashInBanks, cashByInvestmentManager, restrictedCash,
    accountsReceivable, dueFromOtherFund, interestAndDividends, inventoryPrepaidAndOthers, notesReceivableWithinOneYear, notesReceivableAfterOneYear, securityDeposits, investments, netCapitalAssets, deferredOutflowsOfResources,
    accountsPayableAndAccruedLiabilities, dueToFund, dueToOtherFunds, longTermLiabilitiesWithinOneYear, longTermLiabilitiesAfterOneYear, deferredInflowsResources, deferredInflowsOPEB,
    capitalAssetsRelatedDebt, restrictedFederalFunds, unrestricted,
    chargesForService, operatingGrants, interestAndInvestmentEarnings,
    appropriationsNetLapses, trust, interestAndInvestmentLosses, newspaperAds, donationsAndOther, nonImposedFringeBenefits, llcBRevenues,
    management, supportServices, beneficiaryAdvocacy, depreciation, llcA, llcBExpenditures, proceedsFromDebt, proceedsFromCapital, netTransfers,
    beginningOfYear, restatementAdjustment,
  }) {
    try {
      const existingDocument = this._collection.findOne({ owner, profileId, year });

      if (existingDocument) {
        return {
          status: 0,
          errorMessage: 'A FinancialStatementInput already exists for this user and year.',
          docId: existingDocument._id,
        };
      }

      // Auto-calculate total cash and cash equivalents
      const totalCashAndCashEquivalents =
        (parseFloat(pettyCash) || 0) +
        (parseFloat(cash) || 0) +
        (parseFloat(cashInBanks) || 0) +
        (parseFloat(cashByInvestmentManager) || 0) +
        (parseFloat(restrictedCash) || 0);

      // Auto-calculate total other assets
      const totalOtherAssets =
        (parseFloat(totalCashAndCashEquivalents) || 0) +
        (parseFloat(accountsReceivable) || 0) +
        (parseFloat(dueFromOtherFund) || 0) +
        (parseFloat(interestAndDividends) || 0) +
        (parseFloat(inventoryPrepaidAndOthers) || 0) +
        (parseFloat(notesReceivableWithinOneYear) || 0) +
        (parseFloat(notesReceivableAfterOneYear) || 0) +
        (parseFloat(securityDeposits) || 0) +
        (parseFloat(investments) || 0) +
        (parseFloat(netCapitalAssets) || 0);

      // Auto-calculate total assets deferred outflows
      const totalAssetsDeferredOutflows =
        (parseFloat(totalOtherAssets) || 0) +
        (parseFloat(deferredOutflowsOfResources) || 0);

      // Auto-calculate total liabilities
      const totalLiabilities =
        (parseFloat(accountsPayableAndAccruedLiabilities) || 0) +
        (parseFloat(dueToFund) || 0) +
        (parseFloat(dueToOtherFunds) || 0) +
        (parseFloat(longTermLiabilitiesWithinOneYear) || 0) +
        (parseFloat(longTermLiabilitiesAfterOneYear) || 0);

      // Auto-calculate total liabilities deferred inflows
      const totalLiabilitiesDeferredInflows =
        (parseFloat(totalLiabilities) || 0) +
        (parseFloat(deferredInflowsResources) || 0) +
        (parseFloat(deferredInflowsOPEB) || 0);

      // Auto-calculate total net assets
      const totalNetAssets =
        (parseFloat(capitalAssetsRelatedDebt) || 0) +
        (parseFloat(restrictedFederalFunds) || 0) +
        (parseFloat(unrestricted) || 0);

      // Auto-calculate total liabilities net assets
      const totalLiabilitiesNetAssets =
        (parseFloat(totalLiabilitiesDeferredInflows) || 0) +
        (parseFloat(totalNetAssets) || 0);

      // Auto-calculate total program revenues
      const totalProgramRevenues =
        (parseFloat(chargesForService) || 0) +
        (parseFloat(operatingGrants) || 0) +
        (parseFloat(interestAndInvestmentEarnings) || 0);

      // Auto-calculate total general revenues
      const totalGeneralRevenues =
        (parseFloat(appropriationsNetLapses) || 0) +
        (parseFloat(trust) || 0) +
        (parseFloat(interestAndInvestmentLosses) || 0) +
        (parseFloat(newspaperAds) || 0) +
        (parseFloat(donationsAndOther) || 0) +
        (parseFloat(nonImposedFringeBenefits) || 0) +
        (parseFloat(llcBRevenues) || 0);

      // Auto-calculate total revenues
      const totalRevenues =
        (parseFloat(totalProgramRevenues) || 0) +
        (parseFloat(totalGeneralRevenues) || 0);

      // Auto-calculate total expenses
      const totalExpenses =
        (parseFloat(management) || 0) +
        (parseFloat(supportServices) || 0) +
        (parseFloat(beneficiaryAdvocacy) || 0) +
        (parseFloat(depreciation) || 0) +
        (parseFloat(llcA) || 0) +
        (parseFloat(llcBExpenditures) || 0);

      // Auto-calculate excess revenues over expenditures
      const excessRevenuesOverExpenditures =
        (parseFloat(totalRevenues) || 0) -
        (parseFloat(totalExpenses) || 0);

      // Auto-calculate change in net assets
      const changeInNetAssets =
        (parseFloat(excessRevenuesOverExpenditures) || 0) +
        (parseFloat(proceedsFromDebt) || 0) +
        (parseFloat(proceedsFromCapital) || 0) +
        (parseFloat(netTransfers) || 0);

      // Auto-calculate net position at end of year
      const netPositionEndOfYear =
        (parseFloat(changeInNetAssets) || 0) +
        (parseFloat(beginningOfYear) || 0) +
        (parseFloat(restatementAdjustment) || 0);

      const docID = this._collection.insert({
        year, owner, profileId, pettyCash, cash, cashInBanks, cashByInvestmentManager, restrictedCash, totalCashAndCashEquivalents,
        accountsReceivable, dueFromOtherFund, interestAndDividends, inventoryPrepaidAndOthers, notesReceivableWithinOneYear, notesReceivableAfterOneYear, securityDeposits, investments, netCapitalAssets, totalOtherAssets,
        deferredOutflowsOfResources, totalAssetsDeferredOutflows,
        accountsPayableAndAccruedLiabilities, dueToFund, dueToOtherFunds, longTermLiabilitiesWithinOneYear, longTermLiabilitiesAfterOneYear, totalLiabilities, deferredInflowsResources, deferredInflowsOPEB, totalLiabilitiesDeferredInflows,
        capitalAssetsRelatedDebt, restrictedFederalFunds, unrestricted, totalNetAssets, totalLiabilitiesNetAssets,
        chargesForService, operatingGrants, interestAndInvestmentEarnings, totalProgramRevenues,
        appropriationsNetLapses, trust, interestAndInvestmentLosses, newspaperAds, donationsAndOther, nonImposedFringeBenefits, llcBRevenues, totalGeneralRevenues, totalRevenues,
        management, supportServices, beneficiaryAdvocacy, depreciation, llcA, llcBExpenditures, totalExpenses, excessRevenuesOverExpenditures, proceedsFromDebt, proceedsFromCapital, netTransfers, changeInNetAssets,
        beginningOfYear, restatementAdjustment, netPositionEndOfYear,
      });

      return {
        status: 1,
        errorMessage: '',
        docId: docID,
      };
    } catch (error) {
      return {
        status: 0,
        errorMessage: `An error occurred: ${error.message}`,
        docId: '',
      };
    }
  }

  /**
   * Updates the given FinancialStatementInput document.
   * @param {String} docID The ID of the document to update.
   * @param {Object} updateData The updated fields.
   */
  update(docID, updateData) {
    this.assertDefined(docID);

    // Auto-calculate total cash and cash equivalents
    const totalCashAndCashEquivalents =
      (parseFloat(updateData.pettyCash) || 0) +
      (parseFloat(updateData.cash) || 0) +
      (parseFloat(updateData.cashInBanks) || 0) +
      (parseFloat(updateData.cashByInvestmentManager) || 0) +
      (parseFloat(updateData.restrictedCash) || 0);

    // Auto-calculate total other assets
    const totalOtherAssets =
      (parseFloat(updateData.totalCashAndCashEquivalents) || 0) +
      (parseFloat(updateData.accountsReceivable) || 0) +
      (parseFloat(updateData.dueFromOtherFund) || 0) +
      (parseFloat(updateData.interestAndDividends) || 0) +
      (parseFloat(updateData.inventoryPrepaidAndOthers) || 0) +
      (parseFloat(updateData.notesReceivableWithinOneYear) || 0) +
      (parseFloat(updateData.notesReceivableAfterOneYear) || 0) +
      (parseFloat(updateData.securityDeposits) || 0) +
      (parseFloat(updateData.investments) || 0) +
      (parseFloat(updateData.netCapitalAssets) || 0);

    // Auto-calculate total assets deferred outflows
    const totalAssetsDeferredOutflows =
      (parseFloat(updateData.totalOtherAssets) || 0) +
      (parseFloat(updateData.deferredOutflowsOfResources) || 0);

    // Auto-calculate total liabilities
    const totalLiabilities =
      (parseFloat(updateData.accountsPayableAndAccruedLiabilities) || 0) +
      (parseFloat(updateData.dueToFund) || 0) +
      (parseFloat(updateData.dueToOtherFunds) || 0) +
      (parseFloat(updateData.longTermLiabilitiesWithinOneYear) || 0) +
      (parseFloat(updateData.longTermLiabilitiesAfterOneYear) || 0);

    // Auto-calculate total liabilities deferred inflows
    const totalLiabilitiesDeferredInflows =
      (parseFloat(updateData.totalLiabilities) || 0) +
      (parseFloat(updateData.deferredInflowsResources) || 0) +
      (parseFloat(updateData.deferredInflowsOPEB) || 0);

    // Auto-calculate total net assets
    const totalNetAssets =
      (parseFloat(updateData.capitalAssetsRelatedDebt) || 0) +
      (parseFloat(updateData.restrictedFederalFunds) || 0) +
      (parseFloat(updateData.unrestricted) || 0);

    // Auto-calculate total liabilities net assets
    const totalLiabilitiesNetAssets =
      (parseFloat(updateData.totalLiabilitiesDeferredInflows) || 0) +
      (parseFloat(updateData.totalNetAssets) || 0);

    // Auto-calculate total program revenues
    const totalProgramRevenues =
      (parseFloat(updateData.chargesForService) || 0) +
      (parseFloat(updateData.operatingGrants) || 0) +
      (parseFloat(updateData.interestAndInvestmentEarnings) || 0);

    // Auto-calculate total general revenues
    const totalGeneralRevenues =
      (parseFloat(updateData.appropriationsNetLapses) || 0) +
      (parseFloat(updateData.trust) || 0) +
      (parseFloat(updateData.interestAndInvestmentLosses) || 0) +
      (parseFloat(updateData.newspaperAds) || 0) +
      (parseFloat(updateData.donationsAndOther) || 0) +
      (parseFloat(updateData.nonImposedFringeBenefits) || 0) +
      (parseFloat(updateData.llcBRevenues) || 0);

    // Auto-calculate total revenues
    const totalRevenues =
      (parseFloat(updateData.totalProgramRevenues) || 0) +
      (parseFloat(updateData.totalGeneralRevenues) || 0);

    // Auto-calculate total expenses
    const totalExpenses =
      (parseFloat(updateData.management) || 0) +
      (parseFloat(updateData.supportServices) || 0) +
      (parseFloat(updateData.beneficiaryAdvocacy) || 0) +
      (parseFloat(updateData.depreciation) || 0) +
      (parseFloat(updateData.llcA) || 0) +
      (parseFloat(updateData.llcBExpenditures) || 0);

    // Auto-calculate excess revenues over expenditures
    const excessRevenuesOverExpenditures =
      (parseFloat(updateData.totalRevenues) || 0) -
      (parseFloat(updateData.totalExpenses) || 0);

    // Auto-calculate change in net assets
    const changeInNetAssets =
      (parseFloat(updateData.excessRevenuesOverExpenditures) || 0) +
      (parseFloat(updateData.proceedsFromDebt) || 0) +
      (parseFloat(updateData.proceedsFromCapital) || 0) +
      (parseFloat(updateData.netTransfers) || 0);

    // Auto-calculate net position at end of year
    const netPositionEndOfYear =
      (parseFloat(updateData.changeInNetAssets) || 0) +
      (parseFloat(updateData.beginningOfYear) || 0) +
      (parseFloat(updateData.restatementAdjustment) || 0);

    const updateDataWithCalculations = {
      ...updateData,
      totalCashAndCashEquivalents,
      totalOtherAssets,
      totalAssetsDeferredOutflows,
      totalLiabilities,
      totalLiabilitiesDeferredInflows,
      totalNetAssets,
      totalLiabilitiesNetAssets,
      totalProgramRevenues,
      totalGeneralRevenues,
      totalRevenues,
      totalExpenses,
      excessRevenuesOverExpenditures,
      changeInNetAssets,
      netPositionEndOfYear,
    };

    this._collection.update(docID, { $set: updateDataWithCalculations });
  }

  /**
   * Removes a FinancialStatementInput document.
   * @param {String | Object} docID The document ID or object to remove.
   * @returns {boolean} True if the document was successfully removed.
   */
  removeIt(docID) {
    const doc = this.findDoc(docID);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for FinancialStatementInput entities.
   * Publishes documents for the logged-in user or all documents if the user is an admin.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;

      /** This subscription publishes only the documents associated with the logged-in user */
      Meteor.publish(financialStatementPublications.financialStatement, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents, but only if the logged-in user is an Admin. */
      Meteor.publish(financialStatementPublications.financialStatementAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for Budget Form inputs owned by the current user.
   */
  subscribeFinancialStatement() {
    if (Meteor.isClient) {
      return Meteor.subscribe(financialStatementPublications.financialStatement);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeFinancialStatementAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(financialStatementPublications.financialStatementAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param {String} userId The userId of the logged-in user. Can be null or undefined.
   * @throws {Meteor.Error} If there is no logged-in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to restoreOne or define function.
   * @param {String} docID The document ID.
   * @return {Object} The object representing the document.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const {
      year, owner, profileId, pettyCash, cash, cashInBanks, cashByInvestmentManager, restrictedCash, totalCashAndCashEquivalents,
      accountsReceivable, dueFromOtherFund, interestAndDividends, inventoryPrepaidAndOthers, notesReceivableWithinOneYear, notesReceivableAfterOneYear, securityDeposits, investments, netCapitalAssets, totalOtherAssets,
      deferredOutflowsOfResources, totalAssetsDeferredOutflows,
      accountsPayableAndAccruedLiabilities, dueToFund, dueToOtherFunds, longTermLiabilitiesWithinOneYear, longTermLiabilitiesAfterOneYear, totalLiabilities, deferredInflowsResources, deferredInflowsOPEB, totalLiabilitiesDeferredInflows,
      capitalAssetsRelatedDebt, restrictedFederalFunds, unrestricted, totalNetAssets, totalLiabilitiesNetAssets,
      chargesForService, operatingGrants, interestAndInvestmentEarnings, totalProgramRevenues,
      appropriationsNetLapses, trust, interestAndInvestmentLosses, newspaperAds, donationsAndOther, nonImposedFringeBenefits, llcBRevenues, totalGeneralRevenues, totalRevenues,
      management, supportServices, beneficiaryAdvocacy, depreciation, llcA, llcBExpenditures, totalExpenses, excessRevenuesOverExpenditures, proceedsFromDebt, proceedsFromCapital, netTransfers, changeInNetAssets,
      beginningOfYear, restatementAdjustment, netPositionEndOfYear,
    } = doc;
    return {
      year, owner, profileId, pettyCash, cash, cashInBanks, cashByInvestmentManager, restrictedCash, totalCashAndCashEquivalents,
      accountsReceivable, dueFromOtherFund, interestAndDividends, inventoryPrepaidAndOthers, notesReceivableWithinOneYear, notesReceivableAfterOneYear, securityDeposits, investments, netCapitalAssets, totalOtherAssets,
      deferredOutflowsOfResources, totalAssetsDeferredOutflows,
      accountsPayableAndAccruedLiabilities, dueToFund, dueToOtherFunds, longTermLiabilitiesWithinOneYear, longTermLiabilitiesAfterOneYear, totalLiabilities, deferredInflowsResources, deferredInflowsOPEB, totalLiabilitiesDeferredInflows,
      capitalAssetsRelatedDebt, restrictedFederalFunds, unrestricted, totalNetAssets, totalLiabilitiesNetAssets,
      chargesForService, operatingGrants, interestAndInvestmentEarnings, totalProgramRevenues,
      appropriationsNetLapses, trust, interestAndInvestmentLosses, newspaperAds, donationsAndOther, nonImposedFringeBenefits, llcBRevenues, totalGeneralRevenues, totalRevenues,
      management, supportServices, beneficiaryAdvocacy, depreciation, llcA, llcBExpenditures, totalExpenses, excessRevenuesOverExpenditures, proceedsFromDebt, proceedsFromCapital, netTransfers, changeInNetAssets,
      beginningOfYear, restatementAdjustment, netPositionEndOfYear,
    };
  }
}

export const FinancialStatementInput = new FinancialStatementInputCollection();
