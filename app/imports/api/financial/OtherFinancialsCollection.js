import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
// import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const OtherFinancialsPublications = {
  otherFinancials: 'OtherFinancials', // For regular users
  otherFinancialsAdmin: 'OtherFinancialsAdmin', // For admin users
};

class OtherFinancialsCollection extends BaseCollection {
  // Constructor to define the schema and collection name
  constructor() {
    super('OtherFinancials', new SimpleSchema({
      customerName: String, // Name of customer
      yearsTranspired: Number, // Number of years transpired
      budget: Number, // Budgeted amount
      actual: Number, // Actual amount
      encumbrance: Number, // Encumbered amount
      NHTFReturns: { // Define NHTFReturns as an object
        type: Object,
        optional: true,
      },
      'NHTFReturns.actual': { // Define actual as an object
        type: Object,
        optional: true,
      },
      'NHTFReturns.actual.oneYear': { // Define actual returns with dot notation
        type: Number,
        optional: true,
      },
      'NHTFReturns.actual.threeYears': {
        type: Number,
        optional: true,
      },
      'NHTFReturns.actual.fiveYears': {
        type: Number,
        optional: true,
      },
      'NHTFReturns.actual.sevenYears': {
        type: Number,
        optional: true,
      },
      'NHTFReturns.benchmark': { // Define benchmark as an object
        type: Object,
        optional: true,
      },
      'NHTFReturns.benchmark.oneYear': { // Define benchmark returns with dot notation
        type: Number,
        optional: true,
      },
      'NHTFReturns.benchmark.threeYears': {
        type: Number,
        optional: true,
      },
      'NHTFReturns.benchmark.fiveYears': {
        type: Number,
        optional: true,
      },
      'NHTFReturns.benchmark.sevenYears': {
        type: Number,
        optional: true,
      },
    }));
  }

  /**
   * Defines a new 'other' financial record.
   * @param customerName - Name of the customer.
   * @param yearsTranspired - Number of years transpired.
   * @param budget - Budgeted amount.
   * @param actual - Actual amount.
   * @param encumbrance - Encumbered amount.
   * @param NHTFReturns - NHTF return data.
   * @returns {String} - The docID of the newly inserted record.
   */
  define({
    customerName,
    yearsTranspired,
    budget,
    actual,
    encumbrance,
    NHTFReturns,
  }) {
    const docID = this._collection.insert({
      customerName,
      yearsTranspired,
      budget,
      actual,
      encumbrance,
      NHTFReturns,
    });
    return docID;
  }

  /**
   * Updates an existing static financial record.
   * @param docID - The ID of the document to update.
   * @param customerName - The updated customer name (optional).
   * @param yearsTranspired - The updated number of years transpired (optional).
   * @param budget - The updated budgeted amount (optional).
   * @param actual - The updated actual amount (optional).
   * @param encumbrance - The updated encumbered amount (optional).
   * @param NHTFReturns - The updated NHTF return data (optional).
   */
  update(docID, {
    customerName,
    yearsTranspired,
    budget,
    actual,
    encumbrance,
    NHTFReturns,
  }) {
    const updateData = {};
    if (customerName) updateData.customerName = customerName;
    if (_.isNumber(yearsTranspired)) updateData.yearsTranspired = yearsTranspired;
    if (_.isNumber(budget)) updateData.budget = budget;
    if (_.isNumber(actual)) updateData.actual = actual;
    if (_.isNumber(encumbrance)) updateData.encumbrance = encumbrance;
    if (NHTFReturns) updateData.NHTFReturns = NHTFReturns;

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
   * Publishes other financial data, either for regular users or admins.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      // Publish only the documents for the current user
      Meteor.publish(OtherFinancialsPublications.otherFinancials, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });
      // Publish all documents for admins
      Meteor.publish(OtherFinancialsPublications.otherFinancialsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for other financial data for the current user.
   */
  subscribeStaticFinancials() {
    if (Meteor.isClient) {
      return Meteor.subscribe(OtherFinancialsPublications.otherFinancials);
    }
    return null;
  }

  /**
   * Subscription method for admin users to access all other financials.
   */
  subscribeStaticFinancialsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(OtherFinancialsPublications.otherFinancialsAdmin);
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
      customerName, yearsTranspired, budget, actual, encumbrance, NHTFReturns,
    } = doc;

    return {
      customerName,
      yearsTranspired,
      budget,
      actual,
      encumbrance,
      NHTFReturns,
    };
  }
}

export const OtherFinancials = new OtherFinancialsCollection();
