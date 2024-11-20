import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const investmentStaticPercentagesPublications = {
  investmentStaticPercentages: 'InvestmentStaticPercentages',
  investmentStaticPercentagesAdmin: 'InvestmentStaticPercentagesAdmin',
};

class InvestmentStaticPercentagesCollection extends BaseCollection {
  constructor() {
    super('InvestmentStaticPercentages', new SimpleSchema({
      targetAllocationTraditionalGlobalEquity: { type: Number, optional: true, defaultValue: null },
      compoundReturnTraditionalGlobalEquity: { type: Number, optional: true, defaultValue: null },
      standardDeviationTraditionalGlobalEquity: { type: Number, optional: true, defaultValue: null },

      targetAllocationTraditionalFixedIncome: { type: Number, optional: true, defaultValue: null },
      compoundReturnTraditionalFixedIncome: { type: Number, optional: true, defaultValue: null },
      standardDeviationTraditionalFixedIncome: { type: Number, optional: true, defaultValue: null },

      targetAllocationTraditionalRealAssets: { type: Number, optional: true, defaultValue: null },
      compoundReturnTraditionalRealAssets: { type: Number, optional: true, defaultValue: null },
      standardDeviationTraditionalRealAssets: { type: Number, optional: true, defaultValue: null },

      targetAllocationHedgeFunds: { type: Number, optional: true, defaultValue: null },
      compoundReturnHedgeFunds: { type: Number, optional: true, defaultValue: null },
      standardDeviationHedgeFunds: { type: Number, optional: true, defaultValue: null },

      targetAllocationPrivateMarkets: { type: Number, optional: true, defaultValue: null },
      compoundReturnPrivateMarkets: { type: Number, optional: true, defaultValue: null },
      standardDeviationPrivateMarkets: { type: Number, optional: true, defaultValue: null },

      targetAllocationEnhancedLiquidity: { type: Number, optional: true, defaultValue: null },
      compoundReturnEnhancedLiquidity: { type: Number, optional: true, defaultValue: null },
      standardDeviationEnhancedLiquidity: { type: Number, optional: true, defaultValue: null },

      targetAllocationHawaiiDirectInvestments: { type: Number, optional: true, defaultValue: null },
      compoundReturnHawaiiDirectInvestments: { type: Number, optional: true, defaultValue: null },
      standardDeviationHawaiiDirectInvestments: { type: Number, optional: true, defaultValue: null },

      totalTargetAllocation: { type: Number, optional: true, defaultValue: null },
      overallCompoundReturn: { type: Number, optional: true, defaultValue: null },
      overallStandardDeviation: { type: Number, optional: true, defaultValue: null },
    }));
  }

  /**
   * Defines a new investment static percentage record.
   * @param data - Object containing the values for the schema fields.
   * @returns {String} - The docID of the newly inserted record.
   */
  define(data) {
    const docID = this._collection.insert(data);
    return docID;
  }

  /**
   * Updates an existing investment static percentage record.
   * @param docID - The ID of the document to update.
   * @param updateData - Object containing the fields to update.
   */
  update(docID, updateData) {
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes a document by docID.
   * @param docID - The document ID.
   * @returns true if removal is successful.
   */
  removeIt(docID) {
    this._collection.remove(docID);
    return true;
  }

  /**
   * Publishes investment static percentages, either for regular users or admins.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      // Publish only the documents for the current user
      Meteor.publish(investmentStaticPercentagesPublications.investmentStaticPercentages, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      // Publish all documents for admins
      Meteor.publish(investmentStaticPercentagesPublications.investmentStaticPercentagesAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscribes to investment static percentages for the current user.
   */
  subscribeInvestmentStaticPercentages() {
    if (Meteor.isClient) {
      return Meteor.subscribe(investmentStaticPercentagesPublications.investmentStaticPercentages);
    }
    return null;
  }

  /**
   * Subscribes to all investment static percentages (for admins).
   */
  subscribeInvestmentStaticPercentagesAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(investmentStaticPercentagesPublications.investmentStaticPercentagesAdmin);
    }
    return null;
  }

  /**
   * Dumps the document data in a format that can be used for restoration or export.
   * @param docID - The ID of the document to dump.
   * @returns {Object} - An object representing the document's data.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    return { ...doc };
  }
}

export const InvestmentStaticPercentages = new InvestmentStaticPercentagesCollection();
