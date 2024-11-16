import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
// import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

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
        defaultValue: { admin: 0, mgmtStaff: 0, mgmt: 0 },
        optional: true,
      },
      'incrementalFringeBenefits.admin': { type: Number, defaultValue: 0 },
      'incrementalFringeBenefits.mgmtStaff': { type: Number, defaultValue: 0 },
      'incrementalFringeBenefits.mgmt': { type: Number, defaultValue: 0 },
      owner: { type: String },
    }));
  }

  define({
    customerName = '',
    profileId,
    year,
    assets = 0,
    liabilities = 0,
    netPosition = 0,
    cashOnHand = 0,
    investment = 0,
    liquidity = 0,
    debt = 0,
    revenues = 0,
    opex = 0,
    netIncome = 0,
    cashFlow = { inflow: 0, outflow: 0, net: 0 },
    incrementalFringeBenefits = { admin: 0, mgmtStaff: 0, mgmt: 0 },
    owner,
  }) {
    console.log(`Defining financial data for ${profileId}, year ${year}`);
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

  update(docID, updateData) {
    const cleanedUpdateData = { ...updateData };

    // Ensure nested objects have default values if missing
    if (!cleanedUpdateData.cashFlow) {
      cleanedUpdateData.cashFlow = { inflow: 0, outflow: 0, net: 0 };
    }

    if (!cleanedUpdateData.incrementalFringeBenefits) {
      cleanedUpdateData.incrementalFringeBenefits = { admin: 0, mgmtStaff: 0, mgmt: 0 };
    }

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
