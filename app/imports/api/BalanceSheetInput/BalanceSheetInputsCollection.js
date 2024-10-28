import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { BalanceSheetInputSchema } from './BalanceSheetInputSchema';

// Publication names
export const balanceSheetPublications = {
  balanceSheet: 'BalanceSheet',
  balanceSheetAdmin: 'BalanceSheetAdmin',
};

class BalanceSheetInputsCollection extends BaseCollection {
  constructor() {
    super('BalanceSheetInputs', BalanceSheetInputSchema);
  }

  /**
   * Defines a new BalanceSheetInput.
   * @param {Object} data The input data for the balance sheet.
   * @return {String} The document ID of the new BalanceSheetInput.
   */
  define({
    pettyCash, cash, cashInBanks, accountsReceivables, dueFromOtherFunds,
    interestAndDividendsReceivable, otherAssets, notesReceivableBeforeOneYear, notesReceivableAfterOneYear,
    securityDeposits, cashByInvestmentManager, mutualFunds, commingledFunds, hedgeFunds, privateEquityFunds,
    commonTrustFunds, commonAndPreferredStocks, privateDebt, otherInvestments, usTreasuries,
    usAgencies, buildings, leaseholdImprovements, furnitureFixturesEquipment,
    accumulatedDepreciation, landA, landB, constructionInProgress,
    llcBuildings, llcLeaseholdImprovements, llcFurnitureFixturesEquipment, vehicles, llcAccumulatedDepreciation,
    llcLand, restrictedCash, deferredOutflowsPensions,
    deferredOutflowsOPEB, accountsPayable, dueToFund, dueToOtherFunds,
    deferredInflowsPensions, deferredInflowsOPEB, investedInCapitalAssets,
    restrictedFederalFunds, unrestricted, owner, year, profileId, accruedVacationDueWithinOneYear, workersCompensationDueWithinOneYear, accruedRetirementPlanDueWithinOneYear,
    accruedLeaseGuarantyDueWithinOneYear, capitalLeaseObligationsDueWithinOneYear, notesPayableBuildingADueWithinOneYear,
    netPensionLiabilityDueWithinOneYear, netOPEBLiabilityDueWithinOneYear, lineOfCreditBuildingADueWithinOneYear,
    lineOfCreditBuildingBDueWithinOneYear, debtServiceDueWithinOneYear, accruedVacationDueAfterOneYear, workersCompensationDueAfterOneYear, accruedRetirementPlanDueAfterOneYear,
    accruedLeaseGuarantyDueAfterOneYear, capitalLeaseObligationsDueAfterOneYear, notesPayableBuildingADueAfterOneYear,
    netPensionLiabilityDueAfterOneYear, netOPEBLiabilityDueAfterOneYear, lineOfCreditBuildingADueAfterOneYear,
    lineOfCreditBuildingBDueAfterOneYear, debtServiceDueAfterOneYear,
  }) {
    try {
      const existingDocument = this._collection.findOne({ owner, year, profileId });
      if (existingDocument) {
        return {
          status: 0,
          errorMessage: 'A BalanceSheetInput already exists for this user and year.',
          docId: existingDocument._id,
        };
      }

      // Auto-calculate total cash and cash equivalents
      const totalCashAndCashEquivalents =
        (parseFloat(pettyCash) || 0) +
        (parseFloat(cash) || 0) +
        (parseFloat(cashInBanks) || 0);

      // Auto-calculate subtotal investments
      const subtotalInvestments =
        (parseFloat(mutualFunds) || 0) +
        (parseFloat(commingledFunds) || 0) +
        (parseFloat(hedgeFunds) || 0) +
        (parseFloat(privateEquityFunds) || 0) +
        (parseFloat(commonTrustFunds) || 0) +
        (parseFloat(commonAndPreferredStocks) || 0) +
        (parseFloat(privateDebt) || 0) +
        (parseFloat(otherInvestments) || 0);

      // Auto-calculate subtotal loan fund
      const subtotalLoanFund =
        (parseFloat(usTreasuries) || 0) +
        (parseFloat(usAgencies) || 0);

      // Auto-calculate total investments
      const totalInvestments = subtotalInvestments + subtotalLoanFund;

      // Auto-calculate net capital assets
      const netCapitalAssets =
        (parseFloat(buildings) || 0) +
        (parseFloat(leaseholdImprovements) || 0) +
        (parseFloat(furnitureFixturesEquipment) || 0) +
        (parseFloat(accumulatedDepreciation) || 0);

      // Auto-calculate subtotal capital assets net
      const subtotalCapitalAssetsNet =
        (parseFloat(landA) || 0) +
        (parseFloat(landB) || 0) +
        (parseFloat(constructionInProgress) || 0);

      // Auto-calculate LLC Net
      const llcNet =
        (parseFloat(llcBuildings) || 0) +
        (parseFloat(llcLeaseholdImprovements) || 0) +
        (parseFloat(llcFurnitureFixturesEquipment) || 0) +
        (parseFloat(vehicles) || 0) +
        (parseFloat(llcAccumulatedDepreciation) || 0);

      // Auto-calculate total capital assets net
      const llcAssetsNet = llcNet + (parseFloat(llcLand) || 0);

      // Auto-calculate total capital assets net
      const totalCapitalAssetsNet = netCapitalAssets + subtotalCapitalAssetsNet + llcAssetsNet;

      // Auto-calculate total other assets
      const totalOtherAssets =
        (parseFloat(accountsReceivables) || 0) +
        (parseFloat(dueFromOtherFunds) || 0) +
        (parseFloat(interestAndDividendsReceivable) || 0) +
        (parseFloat(otherAssets) || 0) +
        (parseFloat(notesReceivableBeforeOneYear) || 0) +
        (parseFloat(notesReceivableAfterOneYear) || 0) +
        (parseFloat(securityDeposits) || 0) +
        (parseFloat(cashByInvestmentManager) || 0) +
        (parseFloat(totalInvestments) || 0) +
        (parseFloat(totalCapitalAssetsNet) || 0) +
        (parseFloat(restrictedCash) || 0);

      // Auto-calculate net assets deferred outflows
      const netAssetsDeferredOutflows = (parseFloat(totalCashAndCashEquivalents) || 0) + (parseFloat(totalOtherAssets) || 0) + (parseFloat(deferredOutflowsPensions) || 0) + (parseFloat(deferredOutflowsOPEB) || 0);

      // Auto-calculate net liabilities due within one year
      const netLiabilitiesDueWithinOneYear =
        (parseFloat(accruedVacationDueWithinOneYear) || 0) +
        (parseFloat(workersCompensationDueWithinOneYear) || 0) +
        (parseFloat(accruedRetirementPlanDueWithinOneYear) || 0) +
        (parseFloat(accruedLeaseGuarantyDueWithinOneYear) || 0) +
        (parseFloat(capitalLeaseObligationsDueWithinOneYear) || 0) +
        (parseFloat(notesPayableBuildingADueWithinOneYear) || 0) +
        (parseFloat(netPensionLiabilityDueWithinOneYear) || 0) +
        (parseFloat(netOPEBLiabilityDueWithinOneYear) || 0) +
        (parseFloat(lineOfCreditBuildingADueWithinOneYear) || 0) +
        (parseFloat(lineOfCreditBuildingBDueWithinOneYear) || 0) +
        (parseFloat(debtServiceDueWithinOneYear) || 0);

      // Auto-calculate net liabilities due after one year
      const netLiabilitiesDueAfterOneYear =
        (parseFloat(accruedVacationDueAfterOneYear) || 0) +
        (parseFloat(workersCompensationDueAfterOneYear) || 0) +
        (parseFloat(accruedRetirementPlanDueAfterOneYear) || 0) +
        (parseFloat(accruedLeaseGuarantyDueAfterOneYear) || 0) +
        (parseFloat(capitalLeaseObligationsDueAfterOneYear) || 0) +
        (parseFloat(notesPayableBuildingADueAfterOneYear) || 0) +
        (parseFloat(netPensionLiabilityDueAfterOneYear) || 0) +
        (parseFloat(netOPEBLiabilityDueAfterOneYear) || 0) +
        (parseFloat(lineOfCreditBuildingADueAfterOneYear) || 0) +
        (parseFloat(lineOfCreditBuildingBDueAfterOneYear) || 0) +
        (parseFloat(debtServiceDueAfterOneYear) || 0);

      // Auto-calculate total liabilities
      const totalLiabilities = (parseFloat(accountsPayable) || 0) + (parseFloat(dueToFund) || 0) + (parseFloat(dueToOtherFunds) || 0) + netLiabilitiesDueWithinOneYear + netLiabilitiesDueAfterOneYear;

      // Auto-calculate total liabilities deferred net position
      const netLiabilitiesDeferredInflows = (parseFloat(deferredInflowsOPEB) || 0) + (parseFloat(deferredInflowsPensions) || 0) + totalLiabilities;

      // Auto-calculate total net position
      const totalNetPosition =
        (parseFloat(investedInCapitalAssets) || 0) +
        (parseFloat(restrictedFederalFunds) || 0) +
        (parseFloat(unrestricted) || 0);

      // Auto-calculate total liabilities deferred net position
      const totalLiabilitiesDeferredNetPosition = netLiabilitiesDeferredInflows + totalNetPosition;

      // Insert a new document
      const docID = this._collection.insert({
        pettyCash, cash, cashInBanks, totalCashAndCashEquivalents, accountsReceivables, dueFromOtherFunds,
        interestAndDividendsReceivable, otherAssets, notesReceivableBeforeOneYear, notesReceivableAfterOneYear,
        securityDeposits, cashByInvestmentManager, mutualFunds, commingledFunds, hedgeFunds, privateEquityFunds,
        commonTrustFunds, commonAndPreferredStocks, privateDebt, otherInvestments, subtotalInvestments, usTreasuries,
        usAgencies, subtotalLoanFund, totalInvestments, buildings, leaseholdImprovements, furnitureFixturesEquipment,
        accumulatedDepreciation, netCapitalAssets, landA, landB, constructionInProgress, subtotalCapitalAssetsNet,
        llcBuildings, llcLeaseholdImprovements, llcFurnitureFixturesEquipment, vehicles, llcAccumulatedDepreciation,
        llcNet, llcLand, llcAssetsNet, totalCapitalAssetsNet, restrictedCash, totalOtherAssets, deferredOutflowsPensions,
        deferredOutflowsOPEB, netAssetsDeferredOutflows, accountsPayable, dueToFund, dueToOtherFunds, totalLiabilities,
        deferredInflowsPensions, deferredInflowsOPEB, netLiabilitiesDeferredInflows, investedInCapitalAssets,
        restrictedFederalFunds, unrestricted, totalNetPosition, totalLiabilitiesDeferredNetPosition,
        accruedVacationDueWithinOneYear, workersCompensationDueWithinOneYear, accruedRetirementPlanDueWithinOneYear,
        accruedLeaseGuarantyDueWithinOneYear, capitalLeaseObligationsDueWithinOneYear, notesPayableBuildingADueWithinOneYear,
        netPensionLiabilityDueWithinOneYear, netOPEBLiabilityDueWithinOneYear, lineOfCreditBuildingADueWithinOneYear,
        lineOfCreditBuildingBDueWithinOneYear, debtServiceDueWithinOneYear, netLiabilitiesDueWithinOneYear,
        accruedVacationDueAfterOneYear, workersCompensationDueAfterOneYear, accruedRetirementPlanDueAfterOneYear,
        accruedLeaseGuarantyDueAfterOneYear, capitalLeaseObligationsDueAfterOneYear, notesPayableBuildingADueAfterOneYear,
        netPensionLiabilityDueAfterOneYear, netOPEBLiabilityDueAfterOneYear, lineOfCreditBuildingADueAfterOneYear,
        lineOfCreditBuildingBDueAfterOneYear, debtServiceDueAfterOneYear, netLiabilitiesDueAfterOneYear, owner, year, profileId,
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
   * Updates the given BalanceSheetInput document.
   * @param {String} docID The ID of the document to update.
   * @param {Object} updateData The updated fields.
   */
  update(docID, updateData) {
    this.assertDefined(docID);

    // Auto-calculate total cash and cash equivalents
    const totalCashAndCashEquivalents =
      (parseFloat(updateData.pettyCash) || 0) +
      (parseFloat(updateData.cash) || 0) +
      (parseFloat(updateData.cashInBanks) || 0);

    // Auto-calculate subtotal investments
    const subtotalInvestments =
      (parseFloat(updateData.mutualFunds) || 0) +
      (parseFloat(updateData.commingledFunds) || 0) +
      (parseFloat(updateData.hedgeFunds) || 0) +
      (parseFloat(updateData.privateEquityFunds) || 0) +
      (parseFloat(updateData.commonTrustFunds) || 0) +
      (parseFloat(updateData.commonAndPreferredStocks) || 0) +
      (parseFloat(updateData.privateDebt) || 0) +
      (parseFloat(updateData.otherInvestments) || 0);

    // Auto-calculate subtotal loan fund
    const subtotalLoanFund =
      (parseFloat(updateData.usTreasuries) || 0) +
      (parseFloat(updateData.usAgencies) || 0);

    // Auto-calculate total investments
    const totalInvestments = subtotalInvestments + subtotalLoanFund;

    // Auto-calculate net capital assets
    const netCapitalAssets =
      (parseFloat(updateData.buildings) || 0) +
      (parseFloat(updateData.leaseholdImprovements) || 0) +
      (parseFloat(updateData.furnitureFixturesEquipment) || 0) +
      (parseFloat(updateData.accumulatedDepreciation) || 0);

    // Auto-calculate subtotal capital assets net
    const subtotalCapitalAssetsNet =
      (parseFloat(updateData.landA) || 0) +
      (parseFloat(updateData.landB) || 0) +
      (parseFloat(updateData.constructionInProgress) || 0);

    // Auto-calculate LLC Net
    const llcNet =
      (parseFloat(updateData.llcBuildings) || 0) +
      (parseFloat(updateData.llcLeaseholdImprovements) || 0) +
      (parseFloat(updateData.llcFurnitureFixturesEquipment) || 0) +
      (parseFloat(updateData.vehicles) || 0) +
      (parseFloat(updateData.llcAccumulatedDepreciation) || 0);

    // Auto-calculate total capital assets net
    const llcAssetsNet = llcNet + (parseFloat(updateData.llcLand) || 0);
    const totalCapitalAssetsNet = netCapitalAssets + subtotalCapitalAssetsNet + llcAssetsNet;

    // Auto-calculate total other assets
    const totalOtherAssets =
      (parseFloat(updateData.accountsReceivables) || 0) +
      (parseFloat(updateData.dueFromOtherFunds) || 0) +
      (parseFloat(updateData.interestAndDividendsReceivable) || 0) +
      (parseFloat(updateData.otherAssets) || 0) +
      (parseFloat(updateData.notesReceivableBeforeOneYear) || 0) +
      (parseFloat(updateData.notesReceivableAfterOneYear) || 0) +
      (parseFloat(updateData.securityDeposits) || 0) +
      (parseFloat(updateData.cashByInvestmentManager) || 0) +
      totalInvestments +
      totalCapitalAssetsNet +
      (parseFloat(updateData.restrictedCash) || 0);

    // Auto-calculate net assets deferred outflows
    const netAssetsDeferredOutflows =
      totalCashAndCashEquivalents +
      totalOtherAssets +
      (parseFloat(updateData.deferredOutflowsPensions) || 0) +
      (parseFloat(updateData.deferredOutflowsOPEB) || 0);

    // Auto-calculate net liabilities due within one year
    const netLiabilitiesDueWithinOneYear =
      (parseFloat(updateData.accruedVacationDueWithinOneYear) || 0) +
      (parseFloat(updateData.workersCompensationDueWithinOneYear) || 0) +
      (parseFloat(updateData.accruedRetirementPlanDueWithinOneYear) || 0) +
      (parseFloat(updateData.accruedLeaseGuarantyDueWithinOneYear) || 0) +
      (parseFloat(updateData.capitalLeaseObligationsDueWithinOneYear) || 0) +
      (parseFloat(updateData.notesPayableBuildingADueWithinOneYear) || 0) +
      (parseFloat(updateData.netPensionLiabilityDueWithinOneYear) || 0) +
      (parseFloat(updateData.netOPEBLiabilityDueWithinOneYear) || 0) +
      (parseFloat(updateData.lineOfCreditBuildingADueWithinOneYear) || 0) +
      (parseFloat(updateData.lineOfCreditBuildingBDueWithinOneYear) || 0) +
      (parseFloat(updateData.debtServiceDueWithinOneYear) || 0);

    // Auto-calculate net liabilities due after one year
    const netLiabilitiesDueAfterOneYear =
      (parseFloat(updateData.accruedVacationDueAfterOneYear) || 0) +
      (parseFloat(updateData.workersCompensationDueAfterOneYear) || 0) +
      (parseFloat(updateData.accruedRetirementPlanDueAfterOneYear) || 0) +
      (parseFloat(updateData.accruedLeaseGuarantyDueAfterOneYear) || 0) +
      (parseFloat(updateData.capitalLeaseObligationsDueAfterOneYear) || 0) +
      (parseFloat(updateData.notesPayableBuildingADueAfterOneYear) || 0) +
      (parseFloat(updateData.netPensionLiabilityDueAfterOneYear) || 0) +
      (parseFloat(updateData.netOPEBLiabilityDueAfterOneYear) || 0) +
      (parseFloat(updateData.lineOfCreditBuildingADueAfterOneYear) || 0) +
      (parseFloat(updateData.lineOfCreditBuildingBDueAfterOneYear) || 0) +
      (parseFloat(updateData.debtServiceDueAfterOneYear) || 0);

    // Auto-calculate total liabilities
    const totalLiabilities =
      (parseFloat(updateData.accountsPayable) || 0) +
      (parseFloat(updateData.dueToFund) || 0) +
      (parseFloat(updateData.dueToOtherFunds) || 0) +
      netLiabilitiesDueWithinOneYear +
      netLiabilitiesDueAfterOneYear;

    // Auto-calculate total liabilities deferred net position
    const netLiabilitiesDeferredInflows =
      (parseFloat(updateData.deferredInflowsOPEB) || 0) +
      (parseFloat(updateData.deferredInflowsPensions) || 0) +
      totalLiabilities;

    // Auto-calculate total net position
    const totalNetPosition =
      (parseFloat(updateData.investedInCapitalAssets) || 0) +
      (parseFloat(updateData.restrictedFederalFunds) || 0) +
      (parseFloat(updateData.unrestricted) || 0);

    // Auto-calculate total liabilities deferred net position
    const totalLiabilitiesDeferredNetPosition =
      netLiabilitiesDeferredInflows + totalNetPosition;

    const updatedDataWithCalculations = {
      ...updateData,
      totalCashAndCashEquivalents,
      subtotalInvestments,
      subtotalLoanFund,
      totalInvestments,
      netCapitalAssets,
      subtotalCapitalAssetsNet,
      llcNet,
      llcAssetsNet,
      totalCapitalAssetsNet,
      totalOtherAssets,
      netAssetsDeferredOutflows,
      netLiabilitiesDueWithinOneYear,
      netLiabilitiesDueAfterOneYear,
      totalLiabilities,
      netLiabilitiesDeferredInflows,
      totalNetPosition,
      totalLiabilitiesDeferredNetPosition,
    };

    this._collection.update(docID, { $set: updatedDataWithCalculations });
  }

  /**
   * Removes a BalanceSheetInput document.
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
   * Default publication method for BalanceSheetInput entities.
   * Publishes documents for the logged-in user or all documents if the user is an admin.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;

      /** This subscription publishes only the documents associated with the logged-in user */
      Meteor.publish(balanceSheetPublications.balanceSheet, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents, but only if the logged-in user is an Admin. */
      Meteor.publish(balanceSheetPublications.balanceSheetAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for balance sheet inputs owned by the current user.
   */
  subscribeBalanceSheet() {
    if (Meteor.isClient) {
      return Meteor.subscribe(balanceSheetPublications.balanceSheet);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeBalanceSheetAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(balanceSheetPublications.balanceSheetAdmin);
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
      pettyCash, cash, cashInBanks, totalCashAndCashEquivalents, accountsReceivables, dueFromOtherFunds,
      interestAndDividendsReceivable, otherAssets, notesReceivableBeforeOneYear, notesReceivableAfterOneYear,
      securityDeposits, cashByInvestmentManager, mutualFunds, commingledFunds, hedgeFunds, privateEquityFunds,
      commonTrustFunds, commonAndPreferredStocks, privateDebt, otherInvestments, subtotalInvestments, usTreasuries,
      usAgencies, subtotalLoanFund, totalInvestments, buildings, leaseholdImprovements, furnitureFixturesEquipment,
      accumulatedDepreciation, netCapitalAssets, landA, landB, constructionInProgress, subtotalCapitalAssetsNet,
      llcBuildings, llcLeaseholdImprovements, llcFurnitureFixturesEquipment, vehicles, llcAccumulatedDepreciation,
      llcNet, llcLand, llcAssetsNet, totalCapitalAssetsNet, restrictedCash, totalOtherAssets, deferredOutflowsPensions,
      deferredOutflowsOPEB, netAssetsDeferredOutflows, accountsPayable, dueToFund, dueToOtherFunds, totalLiabilities,
      deferredInflowsPensions, deferredInflowsOPEB, netLiabilitiesDeferredInflows, investedInCapitalAssets,
      restrictedFederalFunds, unrestricted, totalNetPosition, totalLiabilitiesDeferredNetPosition, owner, profileId,
    } = doc;
    return {
      pettyCash, cash, cashInBanks, totalCashAndCashEquivalents, accountsReceivables, dueFromOtherFunds,
      interestAndDividendsReceivable, otherAssets, notesReceivableBeforeOneYear, notesReceivableAfterOneYear,
      securityDeposits, cashByInvestmentManager, mutualFunds, commingledFunds, hedgeFunds, privateEquityFunds,
      commonTrustFunds, commonAndPreferredStocks, privateDebt, otherInvestments, subtotalInvestments, usTreasuries,
      usAgencies, subtotalLoanFund, totalInvestments, buildings, leaseholdImprovements, furnitureFixturesEquipment,
      accumulatedDepreciation, netCapitalAssets, landA, landB, constructionInProgress, subtotalCapitalAssetsNet,
      llcBuildings, llcLeaseholdImprovements, llcFurnitureFixturesEquipment, vehicles, llcAccumulatedDepreciation,
      llcNet, llcLand, llcAssetsNet, totalCapitalAssetsNet, restrictedCash, totalOtherAssets, deferredOutflowsPensions,
      deferredOutflowsOPEB, netAssetsDeferredOutflows, accountsPayable, dueToFund, dueToOtherFunds, totalLiabilities,
      deferredInflowsPensions, deferredInflowsOPEB, netLiabilitiesDeferredInflows, investedInCapitalAssets,
      restrictedFederalFunds, unrestricted, totalNetPosition, totalLiabilitiesDeferredNetPosition, owner, profileId,
    };
  }
}

export const BalanceSheetInputs = new BalanceSheetInputsCollection();
