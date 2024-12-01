import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
// import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { FinancialProfiles } from '../FinancialProfiles/FinancialProfilesCollection';
// eslint-disable-next-line import/no-cycle
import { BalanceSheetInputs } from '../BalanceSheetInput/BalanceSheetInputCollection';
import { BudgetFormInput } from '../BudgetFormInput/BudgetFormInputCollection';
import { FinancialStatementInput } from '../FinancialStatementInput/FinancialStatementInputCollection';

export const staticFinancialsPublications = {
  staticFinancials: 'StaticFinancials',
  staticFinancialsAdmin: 'StaticFinancialsAdmin',
};

class StaticFinancialsCollection extends BaseCollection {
  constructor() {
    super('StaticFinancials', new SimpleSchema({
      customerName: { type: String, optional: true },
      profileId: { type: String },
      year: { type: Number },
      assets: { type: Number, defaultValue: 0 },
      liabilities: { type: Number, defaultValue: 0 },
      netPosition: { type: Number, defaultValue: 0 },
      cashOnHand: { type: Number, defaultValue: 0 },
      investment: { type: Number, defaultValue: 0 },
      liquidity: { type: Number, defaultValue: 0 },
      debt: { type: Number, defaultValue: 0 },
      revenues: { type: Number, defaultValue: 0 },
      opex: { type: Number, defaultValue: 0 },
      netIncome: { type: Number, defaultValue: 0 },
      cashFlow: {
        type: Object,
        defaultValue: { inflow: 0, outflow: 0, net: 0 },
        optional: true,
      },
      'cashFlow.inflow': { type: Number, defaultValue: 0 },
      'cashFlow.outflow': { type: Number, defaultValue: 0 },
      'cashFlow.net': { type: Number, defaultValue: 0 },
      incrementalFringeBenefits: {
        type: Object,
        defaultValue: { admin: 0, mgmtStaff: 0, mgmt: 0, net: 0 },
        optional: true,
      },
      'incrementalFringeBenefits.admin': { type: Number, defaultValue: 0 },
      'incrementalFringeBenefits.mgmtStaff': { type: Number, defaultValue: 0 },
      'incrementalFringeBenefits.mgmt': { type: Number, defaultValue: 0 },
      'incrementalFringeBenefits.net': { type: Number, defaultValue: 0 },
      owner: { type: String },
    }));
  }

  /**
   * Computes the revenues field using data from other collections.
   * @param {String} profileId - The profile ID.
   * @param {Number} year - The fiscal year.
   * @returns {Object} An object containing computed fields: revenues, opex, cashFlow, incrementalFringeBenefits
   */
  computeFinancials(profileId, year) {

    const balanceSheetData = BalanceSheetInputs.findOne({ profileId, year });
    const budgetFormData = BudgetFormInput.findOne({ profileId, year });
    const financialStatementData = FinancialStatementInput.findOne({ profileId, year });

    if (!balanceSheetData || !budgetFormData || !financialStatementData) {
      console.warn(`Required data for financial calculation is missing for profileId ${profileId}, year ${year}.`);
      return {
        revenues: 0,
        opex: 0,
        cashFlow: { inflow: 0, outflow: 0, net: 0 },
        incrementalFringeBenefits: { admin: 0, mgmtStaff: 0, mgmt: 0, net: 0 },
      };
    }

    // Compute revenues
    const revenues = this.computeRevenues(profileId, year, balanceSheetData, budgetFormData, financialStatementData);

    // Compute opex from BudgetFormInput
    const opex = budgetFormData.totalExpenses || 0;

    // Compute cashFlow
    const cashFlowInflow = revenues; // Assuming cash inflow equals revenues
    const cashFlowOutflow = opex; // Assuming cash outflow equals opex
    const cashFlowNet = cashFlowInflow - cashFlowOutflow;
    const cashFlow = { inflow: cashFlowInflow, outflow: cashFlowOutflow, net: cashFlowNet };

    // Compute incremental fringe benefits
    const currentYearFringeBenefitsAdmin = budgetFormData.fringeBenefitsAdmin || 0;
    const currentYearFringeBenefitsManagement = budgetFormData.fringeBenefitsManagement || 0;
    const currentYearFringeBenefitsStaff = budgetFormData.fringeBenefitsStaff || 0;

    // Fetch data from two years ago
    const twoYearsAgo = year - 2;
    const budgetDataTwoYearsAgo = BudgetFormInput.findOne({ profileId, year: twoYearsAgo });

    const fringeBenefitsAdminTwoYearsAgo = budgetDataTwoYearsAgo ? budgetDataTwoYearsAgo.fringeBenefitsAdmin || 0 : 0;
    const fringeBenefitsManagementTwoYearsAgo = budgetDataTwoYearsAgo ? budgetDataTwoYearsAgo.fringeBenefitsManagement || 0 : 0;
    const fringeBenefitsStaffTwoYearsAgo = budgetDataTwoYearsAgo ? budgetDataTwoYearsAgo.fringeBenefitsStaff || 0 : 0;

    const admin = -(currentYearFringeBenefitsAdmin + fringeBenefitsAdminTwoYearsAgo);
    const mgmtStaff = -(currentYearFringeBenefitsStaff + fringeBenefitsStaffTwoYearsAgo);
    const mgmt = -(currentYearFringeBenefitsManagement + fringeBenefitsManagementTwoYearsAgo);
    const net = admin + mgmtStaff + mgmt;

    const incrementalFringeBenefits = { admin, mgmtStaff, mgmt, net };

    return {
      revenues,
      opex,
      cashFlow,
      incrementalFringeBenefits,
    };
  }

  computeRevenues(profileId, year, balanceSheetData, budgetFormData, financialStatementData) {
    // Compute 5% of the Investment Portfolio
    const investmentPortfolioValue = balanceSheetData.totalInvestments || 0;
    const fivePercentInvestmentPortfolio = 0.05 * investmentPortfolioValue;

    // Lands / Trust
    const landsTrust = (balanceSheetData.landA || 0) + (balanceSheetData.landB || 0);

    // General Fund
    const generalFund = budgetFormData.generalFund || 0;

    // Total Core Budget Revenues
    const totalCoreBudgetRevenues = fivePercentInvestmentPortfolio + landsTrust + generalFund;

    // Total Program Revenues
    const chargesForServices = financialStatementData.chargesForService || 0;
    const operatingGrants = financialStatementData.operatingGrants || 0;
    const interestAndInvestmentEarningsProgram = financialStatementData.interestAndInvestmentEarnings || 0;

    const totalProgramRevenues = chargesForServices + operatingGrants + interestAndInvestmentEarningsProgram;

    // Total Other Revenues
    const interestAndInvestmentLosses = financialStatementData.interestAndInvestmentLosses || 0;
    const reparations = financialStatementData.reparations || 0;
    const newspaperAds = financialStatementData.newspaperAds || 0;
    const donationsAndOther = financialStatementData.donationsAndOther || 0;
    const llcBRevenues = financialStatementData.llcBRevenues || 0;
    const nonImposedFringeBenefits = financialStatementData.nonImposedFringeBenefits || 0;

    const totalOtherRevenues = interestAndInvestmentLosses + reparations + newspaperAds + donationsAndOther + llcBRevenues + nonImposedFringeBenefits;

    // Total Revenues
    const totalRevenues = totalCoreBudgetRevenues + totalProgramRevenues + totalOtherRevenues;

    return totalRevenues;
  }

  recomputeAllFinancials() {
    const staticFinancialsRecords = this._collection.find().fetch();

    staticFinancialsRecords.forEach((staticFinancial) => {
      const { _id, profileId, year } = staticFinancial;

      // Compute financials
      const financials = this.computeFinancials(profileId, year);

      // Calculate derived fields based on the merged data
      const liquidity = parseFloat(staticFinancial.cashOnHand || 0) + parseFloat(staticFinancial.investment || 0);
      const netIncome = parseFloat(financials.revenues) - parseFloat(financials.opex);

      // Update the StaticFinancials document
      this._collection.update(_id, {
        $set: {
          revenues: financials.revenues,
          opex: financials.opex,
          cashFlow: financials.cashFlow,
          incrementalFringeBenefits: financials.incrementalFringeBenefits,
          liquidity,
          netIncome,
        },
      });
    });
  }

  /**
   * Defines a new static financial record.
   * @param {Object} definitionData - The data to define the record.
   * @returns {String} - The docID of the newly inserted or updated record.
   */
  define(definitionData) {
    const {
      customerName = '',
      profileId,
      year,
      assets,
      liabilities,
      netPosition,
      cashOnHand,
      investment,
      debt,
      owner,
      revenues = 0,
      opex = 0,
      cashFlow = { inflow: 0, outflow: 0, net: 0 },
      incrementalFringeBenefits = { admin: 0, mgmtStaff: 0, mgmt: 0, net: 0 },
    } = definitionData;

    // Fetch the existing record by profileId and year, if it exists
    const existingRecord = this._collection.findOne({ profileId, year });

    let finalCustomerName = customerName;

    if (!finalCustomerName && profileId) {
      const profile = FinancialProfiles.findOne({ _id: profileId });
      finalCustomerName = profile ? profile.title : 'Unknown';
    } else {
      Meteor._debug(`Using provided customerName: ${finalCustomerName}`);
    }

    // Merge new data with existing data
    const mergedData = {
      customerName: finalCustomerName ?? existingRecord?.customerName ?? '',
      profileId: profileId ?? existingRecord?.profileId,
      year: year ?? existingRecord?.year,
      assets: assets ?? existingRecord?.assets,
      liabilities: liabilities ?? existingRecord?.liabilities,
      netPosition: netPosition ?? existingRecord?.netPosition,
      cashOnHand: cashOnHand ?? existingRecord?.cashOnHand ?? 0,
      investment: investment ?? existingRecord?.investment ?? 0,
      debt: debt ?? existingRecord?.debt,
      owner: owner ?? existingRecord?.owner,
      revenues: revenues ?? existingRecord?.revenues ?? 0,
      opex: opex ?? existingRecord?.opex ?? 0,
      cashFlow: cashFlow ?? existingRecord?.cashFlow ?? { inflow: 0, outflow: 0, net: 0 },
      incrementalFringeBenefits: incrementalFringeBenefits ?? existingRecord?.incrementalFringeBenefits ?? { admin: 0, mgmtStaff: 0, mgmt: 0, net: 0 },
    };

    // Calculate derived fields based on the merged data
    const liquidity = parseFloat(mergedData.cashOnHand) + parseFloat(mergedData.investment);
    const netIncome = parseFloat(mergedData.revenues) - parseFloat(mergedData.opex);

    // Add the derived fields to the merged data
    mergedData.liquidity = liquidity;
    mergedData.netIncome = netIncome;

    // Perform the insert or update operation
    if (existingRecord) {
      this._collection.update({ profileId, year }, { $set: mergedData });
      return existingRecord._id;
    }
    const docID = this._collection.insert(mergedData);
    return docID;
  }

  /**
   * Updates an existing static financial record.
   * @param {String} docID - The ID of the document to update.
   * @param {Object} updateData - The updated fields.
   */
  update(docID, updateData) {
    const doc = this.findDoc(docID);
    const profileId = doc.profileId;
    const year = doc.year;

    // Compute financials
    const financials = this.computeFinancials(profileId, year);

    // Include computed financials in the updateData
    const cleanedUpdateData = {
      ...updateData,
      revenues: financials.revenues,
      opex: financials.opex,
      cashFlow: financials.cashFlow,
      incrementalFringeBenefits: financials.incrementalFringeBenefits,
    };

    // Calculate derived fields based on the updated data
    const liquidity = parseFloat(cleanedUpdateData.cashOnHand || doc.cashOnHand) + parseFloat(cleanedUpdateData.investment || doc.investment);
    const netIncome = parseFloat(cleanedUpdateData.revenues) - parseFloat(cleanedUpdateData.opex);

    // Add the derived fields to the cleanedUpdateData
    cleanedUpdateData.liquidity = liquidity;
    cleanedUpdateData.netIncome = netIncome;

    this._collection.update(docID, { $set: cleanedUpdateData });
  }

  /**
   * Removes a document by docID or customerName.
   * @param docIDOrCustomer - The document ID or customer name.
   * @returns true if removal is successful.
   * @throws {Meteor.Error} if the document cannot be found.
   */
  removeIt(docIDOrCustomer) {
    let doc;
    if (this.isValidID(docIDOrCustomer)) {
      doc = this.findDoc(docIDOrCustomer);
    } else {
      doc = this._collection.findOne({ customerName: docIDOrCustomer });
    }
    if (!doc) {
      throw new Meteor.Error('Document not found', `No document found with ID or customer name: ${docIDOrCustomer}`);
    }
    this._collection.remove(doc._id);
    return true;
  }

  isValidID(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  /**
   * Publishes static financial data, either for regular users or admins.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      // Publish only the documents for the current user
      Meteor.publish(staticFinancialsPublications.staticFinancials, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });
      // Publish all documents for admins
      Meteor.publish(staticFinancialsPublications.staticFinancialsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for static financial data for the current user.
   */
  subscribeStaticFinancials() {
    if (Meteor.isClient) {
      return Meteor.subscribe(staticFinancialsPublications.staticFinancials);
    }
    return null;
  }

  /**
   * Subscription method for admin users to access all static financials.
   */
  subscribeStaticFinancialsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(staticFinancialsPublications.staticFinancialsAdmin);
    }
    return null;
  }

  /**
   * Ensures the user has a valid role (Admin or User) for certain actions.
   * @param userId - The ID of the logged-in user.
   * @throws {Meteor.Error} if the user does not have a valid role.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Dumps the document data in a format that can be used for restoration or export.
   * @param docID - The ID of the document to dump.
   * @returns {Object} An object representing the document's data.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const {
      customerName, profileId, year, assets, liabilities, netPosition, cashOnHand,
      investment, liquidity, debt, revenues, opex, netIncome, cashFlow, incrementalFringeBenefits,
      owner,
    } = doc;

    return {
      customerName,
      profileId,
      year,
      assets,
      liabilities,
      netPosition,
      cashOnHand,
      investment,
      liquidity,
      debt,
      revenues,
      opex,
      netIncome,
      cashFlow,
      incrementalFringeBenefits,
      owner,
    };
  }
}

export const StaticFinancials = new StaticFinancialsCollection();
