import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const budgetProjectionPublications = {
  projections: 'BudgetProjections',
  projectionsAdmin: 'BudgetProjectionsAdmin',
};

class BudgetProjectionCollection extends BaseCollection {
  constructor() {
    super('BudgetProjection', new SimpleSchema({
      financialProfileId: String,
      year: Number,
      forecastType: {
        type: String,
        allowedValues: ['revenue', 'expense', 'assets'], // Extend as needed
      },
      values: {
        type: Array,
        optional: true,
      },
      'values.$': Number,
    }));
  }

  /**
   * Defines a new BudgetProjection document.
   * @param {Object} data The projection data including year, profile ID, and forecast values.
   * @return {String} The document ID of the new BudgetProjection.
   */
  define({ financialProfileId, year, forecastType, values }) {
    // Ensure no duplicate projections for the same year and profile.
    const existing = this._collection.findOne({ financialProfileId, year, forecastType });
    if (existing) {
      throw new Meteor.Error('Projection already exists for this year and profile');
    }

    // Insert the new projection document
    return this._collection.insert({
      financialProfileId,
      year,
      forecastType,
      values,
    });
  }

  /**
   * Updates a BudgetProjection document.
   * @param {String} docID The ID of the document to update.
   * @param {Object} updateData The updated fields.
   */
  update(docID, updateData) {
    this.assertDefined(docID);
    const projection = { ...updateData, lastUpdatedAt: new Date() }; // Add timestamp for tracking updates
    this._collection.update(docID, { $set: projection });
  }

  /**
   * Removes a BudgetProjection document.
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
   * Publishes budget projections
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;

      Meteor.publish(budgetProjectionPublications.projections, function publish() {
        if (this.userId) {
          const user = Meteor.users.findOne(this.userId);
          return instance._collection.find({ financialProfileId: user.profileId });
        }
        return this.ready();
      });

      Meteor.publish(budgetProjectionPublications.projectionsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for budget projections owned by the current user.
   */
  subscribeProjections() {
    if (Meteor.isClient) {
      return Meteor.subscribe(budgetProjectionPublications.projections);
    }
    return null;
  }

  /**
   * Subscription method for admin users to view all projections.
   */
  subscribeProjectionsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(budgetProjectionPublications.projectionsAdmin);
    }
    return null;
  }

  /**
   * Validates user has a valid role for defining, updating, or removing projections.
   * @param {String} userId The ID of the logged-in user.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Dumps a projection for testing purposes.
   * @param {String} docID The document ID of the projection.
   * @return {Object} The object representing the projection document.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    return {
      financialProfileId: doc.financialProfileId,
      year: doc.year,
      forecastType: doc.forecastType,
      values: doc.values,
    };
  }
}

export const BudgetProjections = new BudgetProjectionCollection();
