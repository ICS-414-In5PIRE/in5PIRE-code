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
    customerName = '',
    profileId,
    year,
    assets,
    liabilities,
    netPosition,
    cashOnHand,
    investment,
    debt,
    revenues,
    opex,
    cashFlow,
    incrementalFringeBenefits,
    owner,
  }) {
    // Fetch the existing record by profileId and year, if it exists
    const existingRecord = this._collection.findOne({ profileId, year });

    // Merge new data with existing data
    const mergedData = {
      customerName: customerName ?? existingRecord?.customerName ?? '',
      profileId: profileId ?? existingRecord?.profileId,
      year: year ?? existingRecord?.year,
      assets: assets ?? existingRecord?.assets,
      liabilities: liabilities ?? existingRecord?.liabilities,
      netPosition: netPosition ?? existingRecord?.netPosition,
      cashOnHand: cashOnHand ?? existingRecord?.cashOnHand ?? 0,
      investment: investment ?? existingRecord?.investment ?? 0,
      debt: debt ?? existingRecord?.debt,
      revenues: revenues ?? existingRecord?.revenues ?? 0,
      opex: opex ?? existingRecord?.opex ?? 0,
      cashFlow: {
        inflow: cashFlow?.inflow ?? existingRecord?.cashFlow?.inflow ?? 0,
        outflow: cashFlow?.outflow ?? existingRecord?.cashFlow?.outflow ?? 0,
        net: cashFlow?.net ?? existingRecord?.cashFlow?.net ?? 0,
      },
      incrementalFringeBenefits: {
        admin: incrementalFringeBenefits?.admin ?? existingRecord?.incrementalFringeBenefits?.admin ?? 0,
        mgmtStaff: incrementalFringeBenefits?.mgmtStaff ?? existingRecord?.incrementalFringeBenefits?.mgmtStaff ?? 0,
        mgmt: incrementalFringeBenefits?.mgmt ?? existingRecord?.incrementalFringeBenefits?.mgmt ?? 0,
        net: incrementalFringeBenefits?.net ?? existingRecord?.incrementalFringeBenefits?.net ?? 0,
      },
      owner: owner ?? existingRecord?.owner,
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
