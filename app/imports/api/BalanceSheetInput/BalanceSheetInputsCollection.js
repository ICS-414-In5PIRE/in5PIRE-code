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
    restrictedFederalFunds, unrestricted, totalNetPosition, totalLiabilitiesDeferredNetPosition, owner, year, profileId,
    accruedVacation, workersCompensation, accruedRetirementPlan, accruedLeaseGuaranty, capitalLeaseObligations,
    notesPayableBuildingA, netPensionLiability, netOPEBLiability, lineOfCreditBuildingA, lineOfCreditBuildingB,
    debtService, netLiabilities,
  }) {
    try {
      const existingDocument = this._collection.findOne({ owner, year, profileId });

      if (existingDocument) {
        return {
          status: 0,
          errorMessage: 'A BalanceSheetInput already exists for this user, year and profile.',
          docId: existingDocument._id,
        };
      }

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
        restrictedFederalFunds, unrestricted, totalNetPosition, totalLiabilitiesDeferredNetPosition, owner, year, profileId,
        accruedVacation, workersCompensation, accruedRetirementPlan, accruedLeaseGuaranty, capitalLeaseObligations,
        notesPayableBuildingA, netPensionLiability, netOPEBLiability, lineOfCreditBuildingA, lineOfCreditBuildingB,
        debtService, netLiabilities,
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
    this._collection.update(docID, { $set: updateData });
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
      restrictedFederalFunds, unrestricted, totalNetPosition, totalLiabilitiesDeferredNetPosition, owner,
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
      restrictedFederalFunds, unrestricted, totalNetPosition, totalLiabilitiesDeferredNetPosition, owner,
    };
  }
}

export const BalanceSheetInputs = new BalanceSheetInputsCollection();
