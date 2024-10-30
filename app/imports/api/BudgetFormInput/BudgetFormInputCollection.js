import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { BudgetFormInputSchema } from './BudgetFormInputSchema';

export const budgetFormPublications = {
  budgetForm: 'BudgetForm',
  budgetFormAdmin: 'BudgetFormAdmin',
};

class BudgetFormInputCollection extends BaseCollection {
  constructor() {
    super('BudgetFormInput', BudgetFormInputSchema);
  }

  /**
   * Defines a new BudgetFormInput.
   * @param {Object} data The input data for the Budget Form.
   * @return {String} The document ID of the new BudgetFormInput.
   */
  define({
    year, owner, profileId,
    fivePercent, revenues, generalFund, coreOperatingBudget,
    personnel, program, contracts, grants, travel, equipment, overhead, debtService, other,
    salaryAdmin, pensionAccumulationAdmin, retireeHealthInsuranceAdmin, postEmploymentBenefitsAdmin, employeesHealthFundAdmin,
    socialSecurityAdmin, medicareAdmin, workersCompensationAdmin, unemploymentCompensationAdmin, pensionAdministrationAdmin,
    salaryManagement, pensionAccumulationManagement, retireeHealthInsuranceManagement, postEmploymentBenefitsManagement, employeesHealthFundManagement,
    socialSecurityManagement, medicareManagement, workersCompensationManagement, unemploymentCompensationManagement, pensionAdministrationManagement,
    salaryStaff, pensionAccumulationStaff, retireeHealthInsuranceStaff, postEmploymentBenefitsStaff, employeesHealthFundStaff,
    socialSecurityStaff, medicareStaff, workersCompensationStaff, unemploymentCompensationStaff, pensionAdministrationStaff,
    management, supportServices, beneficiaryAdvocacy,
  }) {
    try {
      const existingDocument = this._collection.findOne({ owner, year, profileId });

      if (existingDocument) {
        return {
          status: 0,
          errorMessage: 'A BudgetFormInput already exists for this user and year.',
          docId: existingDocument._id,
        };
      }

      // Auto-calculate total revenues
      const totalRevenue =
        (parseFloat(fivePercent) || 0) +
        (parseFloat(revenues) || 0) +
        (parseFloat(generalFund) || 0) +
        (parseFloat(coreOperatingBudget) || 0);

      // Auto-calculate total expenses
      const totalExpenses =
        (parseFloat(personnel) || 0) +
        (parseFloat(program) || 0) +
        (parseFloat(contracts) || 0) +
        (parseFloat(grants) || 0) +
        (parseFloat(travel) || 0) +
        (parseFloat(equipment) || 0) +
        (parseFloat(overhead) || 0) +
        (parseFloat(debtService) || 0) +
        (parseFloat(other) || 0);

      // Auto-calculate management fringe benefits
      const fringeBenefitsManagement =
        (parseFloat(pensionAccumulationManagement) || 0) +
        (parseFloat(retireeHealthInsuranceManagement) || 0) +
        (parseFloat(postEmploymentBenefitsManagement) || 0) +
        (parseFloat(employeesHealthFundManagement) || 0) +
        (parseFloat(socialSecurityManagement) || 0) +
        (parseFloat(medicareManagement) || 0) +
        (parseFloat(workersCompensationManagement) || 0) +
        (parseFloat(unemploymentCompensationManagement) || 0) +
        (parseFloat(pensionAdministrationManagement) || 0);

      // Auto-calculate personnel and fringe management
      const personnelAndFringeManagement =
        (parseFloat(salaryManagement) || 0) +
        (parseFloat(fringeBenefitsManagement) || 0);

      // Auto-calculate staff fringe benefits
      const fringeBenefitsStaff =
        (parseFloat(pensionAccumulationStaff) || 0) +
        (parseFloat(retireeHealthInsuranceStaff) || 0) +
        (parseFloat(postEmploymentBenefitsStaff) || 0) +
        (parseFloat(employeesHealthFundStaff) || 0) +
        (parseFloat(socialSecurityStaff) || 0) +
        (parseFloat(medicareStaff) || 0) +
        (parseFloat(workersCompensationStaff) || 0) +
        (parseFloat(unemploymentCompensationStaff) || 0) +
        (parseFloat(pensionAdministrationStaff) || 0);

      // Auto-calculate personnel and fringe staff
      const personnelAndFringeStaff =
        (parseFloat(management) || 0) -
        (parseFloat(personnelAndFringeManagement) || 0);

      // Auto-calculate admin fringe benefits
      const fringeBenefitsAdmin =
        (parseFloat(pensionAccumulationAdmin) || 0) +
        (parseFloat(retireeHealthInsuranceAdmin) || 0) +
        (parseFloat(postEmploymentBenefitsAdmin) || 0) +
        (parseFloat(employeesHealthFundAdmin) || 0) +
        (parseFloat(socialSecurityAdmin) || 0) +
        (parseFloat(medicareAdmin) || 0) +
        (parseFloat(workersCompensationAdmin) || 0) +
        (parseFloat(unemploymentCompensationAdmin) || 0) +
        (parseFloat(pensionAdministrationAdmin) || 0);

      // Auto-calculate personnel and fringe admin
      const personnelAndFringeAdmin =
        (parseFloat(personnel) || 0) -
        (parseFloat(personnelAndFringeStaff) || 0) -
        (parseFloat(personnelAndFringeManagement) || 0);

      // Auto-calculate surplus deficit
      const surplusDeficit =
        (parseFloat(totalRevenue) || 0) -
        (parseFloat(totalExpenses) || 0);

      // Insert a new document
      const docID = this._collection.insert({
        year, owner, profileId,
        fivePercent, revenues, generalFund, coreOperatingBudget, totalRevenue,
        personnel, program, contracts, grants, travel, equipment, overhead, debtService, other, totalExpenses,
        salaryAdmin, pensionAccumulationAdmin, retireeHealthInsuranceAdmin, postEmploymentBenefitsAdmin, employeesHealthFundAdmin,
        socialSecurityAdmin, medicareAdmin, workersCompensationAdmin, unemploymentCompensationAdmin, pensionAdministrationAdmin, fringeBenefitsAdmin, personnelAndFringeAdmin,
        salaryManagement, pensionAccumulationManagement, retireeHealthInsuranceManagement, postEmploymentBenefitsManagement, employeesHealthFundManagement,
        socialSecurityManagement, medicareManagement, workersCompensationManagement, unemploymentCompensationManagement, pensionAdministrationManagement, fringeBenefitsManagement, personnelAndFringeManagement,
        salaryStaff, pensionAccumulationStaff, retireeHealthInsuranceStaff, postEmploymentBenefitsStaff, employeesHealthFundStaff,
        socialSecurityStaff, medicareStaff, workersCompensationStaff, unemploymentCompensationStaff, pensionAdministrationStaff, fringeBenefitsStaff, personnelAndFringeStaff,
        management, supportServices, beneficiaryAdvocacy, surplusDeficit,
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
   * Updates the given BudgetFormInput document.
   * @param {String} docID The ID of the document to update.
   * @param {Object} updateData The updated fields.
   */
  update(docID, updateData) {
    this.assertDefined(docID);

    // Auto-calculate total revenue
    const totalRevenue =
      (parseFloat(updateData.fivePercent) || 0) +
      (parseFloat(updateData.revenues) || 0) +
      (parseFloat(updateData.generalFund) || 0) +
      (parseFloat(updateData.coreOperatingBudget) || 0);

    // Auto-calculate total expenses
    const totalExpenses =
      (parseFloat(updateData.personnel) || 0) +
      (parseFloat(updateData.program) || 0) +
      (parseFloat(updateData.contracts) || 0) +
      (parseFloat(updateData.grants) || 0) +
      (parseFloat(updateData.travel) || 0) +
      (parseFloat(updateData.equipment) || 0) +
      (parseFloat(updateData.overhead) || 0) +
      (parseFloat(updateData.debtService) || 0) +
      (parseFloat(updateData.other) || 0);

    // Auto-calculate management fringe benefits
    const fringeBenefitsManagement =
      (parseFloat(updateData.pensionAccumulationManagement) || 0) +
      (parseFloat(updateData.retireeHealthInsuranceManagement) || 0) +
      (parseFloat(updateData.postEmploymentBenefitsManagement) || 0) +
      (parseFloat(updateData.employeesHealthFundManagement) || 0) +
      (parseFloat(updateData.socialSecurityManagement) || 0) +
      (parseFloat(updateData.medicareManagement) || 0) +
      (parseFloat(updateData.workersCompensationManagement) || 0) +
      (parseFloat(updateData.unemploymentCompensationManagement) || 0) +
      (parseFloat(updateData.pensionAdministrationManagement) || 0);

    // Auto-calculate personnel and fringe management
    const personnelAndFringeManagement =
      (parseFloat(updateData.salaryManagement) || 0) +
      (parseFloat(updateData.fringeBenefitsManagement) || 0);

    // Auto-calculate staff fringe benefits
    const fringeBenefitsStaff =
      (parseFloat(updateData.pensionAccumulationStaff) || 0) +
      (parseFloat(updateData.retireeHealthInsuranceStaff) || 0) +
      (parseFloat(updateData.postEmploymentBenefitsStaff) || 0) +
      (parseFloat(updateData.employeesHealthFundStaff) || 0) +
      (parseFloat(updateData.socialSecurityStaff) || 0) +
      (parseFloat(updateData.medicareStaff) || 0) +
      (parseFloat(updateData.workersCompensationStaff) || 0) +
      (parseFloat(updateData.unemploymentCompensationStaff) || 0) +
      (parseFloat(updateData.pensionAdministrationStaff) || 0);

    // Auto-calculate personnel and fringe staff
    const personnelAndFringeStaff =
      (parseFloat(updateData.management) || 0) -
      (parseFloat(updateData.personnelAndFringeManagement) || 0);

    // Auto-calculate admin fringe benefits
    const fringeBenefitsAdmin =
      (parseFloat(updateData.pensionAccumulationAdmin) || 0) +
      (parseFloat(updateData.retireeHealthInsuranceAdmin) || 0) +
      (parseFloat(updateData.postEmploymentBenefitsAdmin) || 0) +
      (parseFloat(updateData.employeesHealthFundAdmin) || 0) +
      (parseFloat(updateData.socialSecurityAdmin) || 0) +
      (parseFloat(updateData.medicareAdmin) || 0) +
      (parseFloat(updateData.workersCompensationAdmin) || 0) +
      (parseFloat(updateData.unemploymentCompensationAdmin) || 0) +
      (parseFloat(updateData.pensionAdministrationAdmin) || 0);

    // Auto-calculate personnel and fringe admin
    const personnelAndFringeAdmin =
      (parseFloat(updateData.personnel) || 0) -
      ((parseFloat(updateData.personnelAndFringeStaff) || 0) +
        (parseFloat(updateData.personnelAndFringeManagement) || 0));

    // Auto-calculate surplus deficit
    const surplusDeficit =
      (parseFloat(updateData.totalRevenue) || 0) -
      (parseFloat(updateData.totalExpenses) || 0);

    const updatedDataWithCalculations = {
      ...updateData,
      totalRevenue,
      totalExpenses,
      fringeBenefitsManagement,
      personnelAndFringeManagement,
      fringeBenefitsStaff,
      personnelAndFringeStaff,
      fringeBenefitsAdmin,
      personnelAndFringeAdmin,
      surplusDeficit,
    };

    this._collection.update(docID, { $set: updatedDataWithCalculations });
  }

  /**
   * Removes a BudgetFormInput document.
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
   * Default publication method for BudgetFormInput entities.
   * Publishes documents for the logged-in user or all documents if the user is an admin.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;

      /** This subscription publishes only the documents associated with the logged-in user */
      Meteor.publish(budgetFormPublications.budgetForm, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents, but only if the logged-in user is an Admin. */
      Meteor.publish(budgetFormPublications.budgetFormAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for Budget Form inputs owned by the current user.
   */
  subscribeBudgetForm() {
    if (Meteor.isClient) {
      return Meteor.subscribe(budgetFormPublications.budgetForm);
    }
    return null;
  }

  /**
     * Subscription method for admin users.
     * It subscribes to the entire collection.
     */
  subscribeBudgetFormAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(budgetFormPublications.budgetFormAdmin);
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
      year, owner, profileId,
      fivePercent, revenues, generalFund, coreOperatingBudget, totalRevenue,
      personnel, program, contracts, grants, travel, equipment, overhead, debtService, other, totalExpenses,
      salaryAdmin, pensionAccumulationAdmin, retireeHealthInsuranceAdmin, postEmploymentBenefitsAdmin, employeesHealthFundAdmin,
      socialSecurityAdmin, medicareAdmin, workersCompensationAdmin, unemploymentCompensationAdmin, pensionAdministrationAdmin, fringeBenefitsAdmin, personnelAndFringeAdmin,
      salaryManagement, pensionAccumulationManagement, retireeHealthInsuranceManagement, postEmploymentBenefitsManagement, employeesHealthFundManagement,
      socialSecurityManagement, medicareManagement, workersCompensationManagement, unemploymentCompensationManagement, pensionAdministrationManagement, fringeBenefitsManagement, personnelAndFringeManagement,
      salaryStaff, pensionAccumulationStaff, retireeHealthInsuranceStaff, postEmploymentBenefitsStaff, employeesHealthFundStaff,
      socialSecurityStaff, medicareStaff, workersCompensationStaff, unemploymentCompensationStaff, pensionAdministrationStaff, fringeBenefitsStaff, personnelAndFringeStaff,
      management, supportServices, beneficiaryAdvocacy, surplusDeficit,
    } = doc;
    return {
      year, owner, profileId,
      fivePercent, revenues, generalFund, coreOperatingBudget, totalRevenue,
      personnel, program, contracts, grants, travel, equipment, overhead, debtService, other, totalExpenses,
      salaryAdmin, pensionAccumulationAdmin, retireeHealthInsuranceAdmin, postEmploymentBenefitsAdmin, employeesHealthFundAdmin,
      socialSecurityAdmin, medicareAdmin, workersCompensationAdmin, unemploymentCompensationAdmin, pensionAdministrationAdmin, fringeBenefitsAdmin, personnelAndFringeAdmin,
      salaryManagement, pensionAccumulationManagement, retireeHealthInsuranceManagement, postEmploymentBenefitsManagement, employeesHealthFundManagement,
      socialSecurityManagement, medicareManagement, workersCompensationManagement, unemploymentCompensationManagement, pensionAdministrationManagement, fringeBenefitsManagement, personnelAndFringeManagement,
      salaryStaff, pensionAccumulationStaff, retireeHealthInsuranceStaff, postEmploymentBenefitsStaff, employeesHealthFundStaff,
      socialSecurityStaff, medicareStaff, workersCompensationStaff, unemploymentCompensationStaff, pensionAdministrationStaff, fringeBenefitsStaff, personnelAndFringeStaff,
      management, supportServices, beneficiaryAdvocacy, surplusDeficit,
    };
  }
}

export const BudgetFormInput = new BudgetFormInputCollection();
