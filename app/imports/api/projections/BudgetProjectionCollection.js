import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import FinancialProfiles from '../../ui/pages/FinancialProfiles';

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
        allowedValues: ['revenue', 'expense', 'assets', 'fullProjection'],
      },
      values: Object,
      'values.fivePercent': { type: Number, optional: true },
      'values.revenues': { type: Number, optional: true },
      'values.generalFund': { type: Number, optional: true },
      'values.coreOperatingBudget': { type: Number, optional: true },
      'values.personnel': { type: Number, optional: true },
      'values.program': { type: Number, optional: true },
      'values.contracts': { type: Number, optional: true },
      'values.grants': { type: Number, optional: true },
      'values.travel': { type: Number, optional: true },
      'values.equipment': { type: Number, optional: true },
      'values.overhead': { type: Number, optional: true },
      'values.debtService': { type: Number, optional: true },
      'values.other': { type: Number, optional: true },
      'values.salaryAdmin': { type: Number, optional: true },
      'values.pensionAccumulationAdmin': { type: Number, optional: true },
      'values.retireeHealthInsuranceAdmin': { type: Number, optional: true },
      'values.postEmploymentBenefitsManagement': { type: Number, optional: true },
      'values.employeesHealthFundManagement': { type: Number, optional: true },
      'values.socialSecurityManagement': { type: Number, optional: true },
      'values.medicareManagement': { type: Number, optional: true },
      'values.workersCompensationManagement': { type: Number, optional: true },
      'values.unemploymentCompensationManagement': { type: Number, optional: true },
      'values.pensionAdministrationManagement': { type: Number, optional: true },
      'values.salaryStaff': { type: Number, optional: true },
      'values.pensionAccumulationStaff': { type: Number, optional: true },
      'values.retireeHealthInsuranceStaff': { type: Number, optional: true },
      'values.postEmploymentBenefitsStaff': { type: Number, optional: true },
      'values.employeesHealthFundStaff': { type: Number, optional: true },
      'values.socialSecurityStaff': { type: Number, optional: true },
      'values.medicareStaff': { type: Number, optional: true },
      'values.workersCompensationStaff': { type: Number, optional: true },
      'values.unemploymentCompensationStaff': { type: Number, optional: true },
      'values.pensionAdministrationStaff': { type: Number, optional: true },
      'values.management': { type: Number, optional: true },
      'values.supportServices': { type: Number, optional: true },
      'values.beneficiaryAdvocacy': { type: Number, optional: true },
    }));
  }

  /**
   * Defines a new BudgetProjection document.
   * @param {Object} data The projection data including year, profile ID, and forecast values.
   * @return {String} The document ID of the new BudgetProjection.
   */
  define({ financialProfileId, year, forecastType, values }) {
    // No duplicate projections for the same year and profile.
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
          const profile = FinancialProfiles.findOne({ owner: user.username });
          if (profile) {
            return instance._collection.find({ financialProfileId: profile._id });
          }
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
