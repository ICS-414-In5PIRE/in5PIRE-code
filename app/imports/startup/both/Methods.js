import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Email } from 'meteor/email'; // Use Meteor's email package
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { ROLES } from '../../api/role/Role';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';
import { calculateProjectionValues } from '../../api/projections/BudgetProjectionUtils';
import { BudgetProjections } from '../../api/projections/BudgetProjectionCollection';
// import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
// import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';
// import { updateMethod, defineMethod } from '../../api/base/BaseCollection.methods';
import { defineStaticFinancialsMethod, updateStaticFinancialsMethod } from '../../api/financial/StaticFinancialsCollection.methods';

const verificationCodes = new Map(); // Store codes temporarily in memory

Meteor.methods({
  sendVerificationCode(email) {
    check(email, String);

    const code = Random.hexString(6);
    verificationCodes.set(email, code);

    Email.send({
      to: email,
      from: 'no-reply@example.com',
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
    });
  },

  verifyCode({ email, code }) {
    check(email, String);
    check(code, String);

    const storedCode = verificationCodes.get(email);
    if (storedCode === code) {
      verificationCodes.delete(email);
      return true;
    }

    throw new Meteor.Error('invalid-code', 'The verification code is incorrect');
  },

  'FinancialProfiles.remove'(profileId) {
    check(profileId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const profile = FinancialProfiles.findDoc(profileId);
    if (!profile) {
      throw new Meteor.Error('profile-not-found');
    }

    const username = Meteor.user().username;
    if (profile.owner !== username && !Roles.userIsInRole(this.userId, ROLES.ADMIN)) {
      throw new Meteor.Error('not-authorized');
    }

    FinancialProfiles._collection.remove(profileId);
  },

  inviteUserToProfileByEmail({ profileId, email, role }) {
    check(profileId, String);
    check(email, String);
    check(role, String);

    FinancialProfiles.inviteUserByEmail(profileId, email, role);
  },

  updateUserRoleInProfile({ profileId, userId, newRole }) {
    check(profileId, String);
    check(userId, String);
    check(newRole, String);

    const profile = FinancialProfiles.findOne(profileId);
    if (!profile) {
      throw new Meteor.Error('Profile not found');
    }

    const currentUserId = Meteor.userId();
    const isOwnerOrAdmin =
      profile.owner === currentUserId ||
      profile.members.some(member => member.userId === currentUserId && member.role === 'admin');

    if (!isOwnerOrAdmin) {
      throw new Meteor.Error('Not authorized');
    }

    const memberIndex = profile.members.findIndex(member => member.userId === userId);
    if (memberIndex === -1) {
      throw new Meteor.Error('User not found in members');
    }

    const memberField = `members.${memberIndex}.role`;
    const updateResult = FinancialProfiles._collection.update(
      { _id: profileId },
      { $set: { [memberField]: newRole } },
    );

    if (updateResult === 0) {
      throw new Meteor.Error('Update failed');
    }

    return 'Role updated successfully';
  },

  getProfile(profileId) {
    check(profileId, String);

    const profile = FinancialProfiles.findOne(profileId);
    if (!profile) {
      throw new Meteor.Error('Profile not found');
    }

    return profile;
  },

  'FinancialProfiles.removeMember'(profileId, userId) {
    check(profileId, String);
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    FinancialProfiles.removeMember(profileId, userId);
  },

  generateBudgetProjections(profileId) {
    check(profileId, String);

    const actualData = BudgetFormInput.find({ profileId }, { sort: { year: -1 }, limit: 3 }).fetch();
    if (actualData.length === 0) {
      throw new Meteor.Error('No actual data found for projections.');
    }

    const growthRates = {
      revenues: 0.05,
      opex: 0.05,
      netIncome: 0.05,
    };

    actualData.forEach(data => {
      const { year, ...actualValues } = data;

      const projectedValues = calculateProjectionValues(actualValues, growthRates);

      [4, 8, 12].forEach((forecastPeriod, index) => {
        BudgetProjections.define({
          financialProfileId: profileId,
          year: year + forecastPeriod,
          forecastType: 'fullProjection',
          values: Object.fromEntries(
            Object.keys(projectedValues).map(field => [field, projectedValues[field][index]]),
          ),
        });
      });
    });
  },

  'staticFinancials.updateHistoricalData'({ profileId }) {
    check(profileId, String);

    const years = [2020, 2021, 2022, 2023, 2024];
    const errors = [];

    years.forEach((year) => {
      try {
        // Call populateFromBudget to calculate and populate specific fields
        Meteor.call('staticFinancials.populateFromBudget', profileId, year);

        // Fetch the newly populated data
        const populatedData = StaticFinancials.findOne({ profileId, year });

        // Prepare data for remaining fields that are not calculated in populateFromBudget
        const additionalFields = {
          assets: 0, // Placeholder for calculated field later
          liabilities: 0,
          netPosition: 0,
          cashOnHand: 0,
          investment: 0,
          liquidity: 0,
          debt: 0,
          owner: Meteor.userId(),
        };

        if (populatedData) {
          updateStaticFinancialsMethod.call({
            updateData: {
              docID: populatedData._id,
              ...additionalFields,
            },
          });
        } else {
          // If for some reason populate didn't define the year, add manually
          defineStaticFinancialsMethod.call({
            definitionData: {
              profileId,
              year,
              ...additionalFields,
            },
          });
        }
      } catch (error) {
        errors.push(`Error processing year ${year}: ${error.message}`);
      }
    });

    if (errors.length > 0) {
      throw new Meteor.Error('incomplete-data', `Errors occurred: ${errors.join('; ')}`);
    }

    return 'Historical data updated and populated successfully!';
  },

  'staticFinancials.populateFromBudget'(profileId, year) {
    check(profileId, String);
    check(year, Number);

    const budgetData = BudgetFormInput.findOne({ profileId, year });
    if (!budgetData) {
      throw new Meteor.Error('NoBudgetData', 'No budget data found.');
    }

    const staticFinancialsData = {
      profileId,
      year,
      revenues: budgetData.revenues || 0,
      opex: budgetData.totalExpenses || 0,
      netIncome: (budgetData.revenues || 0) - (budgetData.totalExpenses || 0),
      cashFlow: {
        inflow: budgetData.revenues || 0,
        outflow: budgetData.totalExpenses || 0,
        net: budgetData.revenues - budgetData.totalExpenses,
      },
      owner: budgetData.owner || Meteor.userId(),
    };

    const existing = StaticFinancials.findOne({ profileId, year });

    if (existing) {
      updateStaticFinancialsMethod.call({ updateData: { docID: existing._id, ...staticFinancialsData } });
    } else {
      defineStaticFinancialsMethod.call({ definitionData: staticFinancialsData });
    }
  },
});
