import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
// import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const staticFinancialsPublications = {
  staticFinancials: 'StaticFinancials', // For regular users
  staticFinancialsAdmin: 'StaticFinancialsAdmin', // For admin users
};

class StaticFinancialsCollection extends BaseCollection {
  // Constructor to define the schema and collection name
  constructor() {
    super('StaticFinancials', new SimpleSchema({
      customerName: {
        type: String,
        optional: true,
      }, // Name of customer
      profileId: {
        type: String,
        optional: true,
      },
      year: Number, // Fiscal year
      assets: Number, // Total assets
      liabilities: Number, // Total liabilities
      netPosition: Number, // Net financial position (assets - liabilities)
      cashOnHand: Number, // Available cash
      investment: Number, // Investments
      liquidity: Number, // liquidity of assets
      debt: Number, // Total debts
      revenues: Number, // Total revenues
      opex: Number, // Operational expenses
      netIncome: Number, // Income after expenses
      cashFlow: { // Define cashFlow as an object
        type: Object,
        optional: true, // Optional if it's not always required
      },
      'cashFlow.inflow': { // Define inflow as a sub-field of cashFlow
        type: Number,
        optional: true,
      },
      'cashFlow.outflow': { // Define outflow as a sub-field of cashFlow
        type: Number,
        optional: true,
      },
      'cashFlow.net': { // Define net as a sub-field of cashFlow
        type: Number,
        optional: true,
      },
      incrementalFringeBenefits: { // Define incrementalFringeBenefits as an object
        type: Object,
        optional: true,
      },
      'incrementalFringeBenefits.admin': { // Define sub-fields using dot notation
        type: Number,
        optional: true,
      },
      'incrementalFringeBenefits.mgmtStaff': {
        type: Number,
        optional: true,
      },
      'incrementalFringeBenefits.mgmt': {
        type: Number,
        optional: true,
      },
      owner: String, // Owner field to associate with user
    }));
  }

  /**
   * Defines a new static financial record.
   * @param customerName - Name of the customer.
   * @param year - Fiscal year.
   * @param assets - Total assets.
   * @param liabilities - Total liabilities.
   * @param netPosition - Net financial position.
   * @param cashOnHand - Available cash.
   * @param investment - Investments made.
   * @param liquidity - Liquidity of assets.
   * @param debt - Total debt.
   * @param revenues - Total revenues.
   * @param opex - Operational expenses.
   * @param netIncome - Net income.
   * @param cashFlow - Cash flow breakdown.
   * @param incrementalFringeBenefits - Breakdown of fringe benefits.
   * @param owner - Owner of the record.
   * @returns {String} - The docID of the newly inserted record.
   */
  define({
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
  }) {
    console.log('Defining financial data:', customerName);
    const docID = this._collection.insert({
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
    });
    return docID;
  }

  /**
   * Updates an existing static financial record.
   * @param docID - The ID of the document to update.
   * @param customerName - The updated customer name (optional).
   * @param year - The updated year (optional).
   * @param assets - The updated assets (optional).
   * @param liabilities - The updated liabilities (optional).
   * @param netPosition - The updated net position (optional).
   * @param cashOnHand - The updated cash on hand (optional).
   * @param investment - The updated investments (optional).
   * @param liquidity - The updated liquidity (optional).
   * @param debt - The updated debt (optional).
   * @param revenues - The updated revenues (optional).
   * @param opex - The updated operational expenses (optional).
   * @param netIncome - The updated net income (optional).
   * @param cashFlow - The updated cash flow (optional).
   * @param incrementalFringeBenefits - The updated fringe benefits (optional).
   */
  update(docID, {
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
  }) {
    const updateData = {};
    if (customerName) updateData.customerName = customerName;
    if (profileId) updateData.customerName = customerName;
    if (_.isNumber(year)) updateData.year = year;
    if (_.isNumber(assets)) updateData.assets = assets;
    if (_.isNumber(liabilities)) updateData.liabilities = liabilities;
    if (_.isNumber(netPosition)) updateData.netPosition = netPosition;
    if (_.isNumber(cashOnHand)) updateData.cashOnHand = cashOnHand;
    if (_.isNumber(investment)) updateData.investment = investment;
    if (_.isNumber(liquidity)) updateData.liquidity = liquidity;
    if (_.isNumber(debt)) updateData.debt = debt;
    if (_.isNumber(revenues)) updateData.revenues = revenues;
    if (_.isNumber(opex)) updateData.opex = opex;
    if (_.isNumber(netIncome)) updateData.netIncome = netIncome;
    if (cashFlow) updateData.cashFlow = cashFlow;
    if (incrementalFringeBenefits) updateData.incrementalFringeBenefits = incrementalFringeBenefits;

    this._collection.update(docID, { $set: updateData });
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
