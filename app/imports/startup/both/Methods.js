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
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';
import { updateMethod, defineMethod } from '../../api/base/BaseCollection.methods';

const verificationCodes = new Map(); // Store codes temporarily in memory

Meteor.methods({
  // Method to send the verification code to the user's email
  sendVerificationCode(email) {
    check(email, String);

    // Generate a random verification code
    const code = Random.hexString(6);
    verificationCodes.set(email, code); // Store the code with the email key

    // Send the email with the verification code
    Email.send({
      to: email,
      from: 'no-reply@example.com', // Configure sender address
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
    });
  },

  // Method to verify the code
  verifyCode({ email, code }) {
    check(email, String);
    check(code, String);

    const storedCode = verificationCodes.get(email);
    if (storedCode === code) {
      verificationCodes.delete(email); // Remove the code after verification
      return true; // Success, correct code entered
    }

    // Throw an error if the code is invalid
    throw new Meteor.Error('invalid-code', 'The verification code is incorrect');
  },

  // Method to remove a financial profile
  'FinancialProfiles.remove'(profileId) {
    check(profileId, String);

    // Ensure the user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to perform this action.');
    }

    // Get the profile document
    const profile = FinancialProfiles.findDoc(profileId);
    if (!profile) {
      throw new Meteor.Error('profile-not-found', 'Profile not found.');
    }

    // Get the username of the logged-in user
    const username = Meteor.users.findOne(this.userId).username;

    // Check if the user is the owner of the profile or an admin
    if (profile.owner !== username && !Roles.userIsInRole(this.userId, ROLES.ADMIN)) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to delete this profile.');
    }

    // Remove the profile from the collection
    FinancialProfiles._collection.remove(profileId);
  },

  // Method to invite a user to a financial profile by email
  inviteUserToProfileByEmail({ profileId, email, role }) {
    check(profileId, String);
    check(email, String);
    check(role, String);

    FinancialProfiles.inviteUserByEmail(profileId, email, role);
  },

  // Method to update a user's role in a financial profile
  updateUserRoleInProfile({ profileId, userId, newRole }) {
    check(profileId, String);
    check(userId, String);
    check(newRole, String);

    const profile = FinancialProfiles.findOne(profileId);
    if (!profile) {
      throw new Meteor.Error('Profile not found');
    }

    const currentUserId = Meteor.userId();
    const isOwnerOrAdmin = profile.owner === currentUserId ||
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

  // Method to get a financial profile by its ID
  getProfile(profileId) {
    check(profileId, String);

    const profile = FinancialProfiles.findOne(profileId);
    if (!profile) {
      throw new Meteor.Error('Profile not found');
    }

    return profile;
  },

  // Method to remove a member from a financial profile
  'FinancialProfiles.removeMember'(profileId, userId) {
    check(profileId, String);
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    FinancialProfiles.removeMember(profileId, userId);
  },
  // Method to generate budget form projections for a profile
  generateBudgetProjections(profileId) {
    check(profileId, String);

    const actualData = BudgetFormInput.find({ profileId }, { sort: { year: -1 }, limit: 3 }).fetch();
    if (actualData.length === 0) throw new Meteor.Error('No actual data found for projections.');

    // Define growth rates for each field
    // 5% is a placeholder for now
    const growthRates = {
      fivePercent: 0.05,
      revenues: 0.05,
      generalFund: 0.05,
      coreOperatingBudget: 0.05,
      personnel: 0.05,
      program: 0.05,
      contracts: 0.05,
      grants: 0.05,
      travel: 0.05,
      equipment: 0.05,
      overhead: 0.05,
      debtService: 0.05,
      other: 0.05,
      salaryAdmin: 0.05,
      pensionAccumulationAdmin: 0.05,
      retireeHealthInsuranceAdmin: 0.05,
      postEmploymentBenefitsAdmin: 0.05,
      employeesHealthFundAdmin: 0.05,
      socialSecurityAdmin: 0.05,
      medicareAdmin: 0.05,
      workersCompensationAdmin: 0.05,
      unemploymentCompensationAdmin: 0.05,
      pensionAdministrationAdmin: 0.05,
      salaryManagement: 0.05,
      pensionAccumulationManagement: 0.05,
      retireeHealthInsuranceManagement: 0.05,
      postEmploymentBenefitsManagement: 0.05,
      employeesHealthFundManagement: 0.05,
      socialSecurityManagement: 0.05,
      medicareManagement: 0.05,
      workersCompensationManagement: 0.05,
      unemploymentCompensationManagement: 0.05,
      pensionAdministrationManagement: 0.05,
      salaryStaff: 0.05,
      pensionAccumulationStaff: 0.05,
      retireeHealthInsuranceStaff: 0.05,
      postEmploymentBenefitsStaff: 0.05,
      employeesHealthFundStaff: 0.05,
      socialSecurityStaff: 0.05,
      medicareStaff: 0.05,
      workersCompensationStaff: 0.05,
      unemploymentCompensationStaff: 0.05,
      pensionAdministrationStaff: 0.05,
      management: 0.05,
      supportServices: 0.05,
      beneficiaryAdvocacy: 0.05,
    };

    actualData.forEach((data) => {
      const { year, ...actualValues } = data;

      // Calculate projections for specified forecast years
      const projectedValues = calculateProjectionValues(actualValues, growthRates);

      // Insert projection data for each forecast period (4, 8, and 12 years ahead)
      [4, 8, 12].forEach((forecastPeriod, index) => {
        BudgetProjections.define({
          financialProfileId: profileId,
          year: year + forecastPeriod,
          forecastType: 'fullProjection',
          values: Object.fromEntries(
            Object.keys(projectedValues).map((field) => [field, projectedValues[field][index]]),
          ),
        });
      });
    });
  },

  'staticFinancials.updateHistoricalData'({ profileId }) {
    check(profileId, String);

    const years = [2020, 2021, 2022, 2023, 2024];
    const errors = [];

    years.forEach(async (year) => {
      // console.log(`Processing data for year: ${year}`);

      // Retrieve data from each collection for the given year and profileId
      const balanceSheetData = BalanceSheetInputs.findOne({ profileId, year }) || {};
      const budgetFormData = BudgetFormInput.findOne({ profileId, year }) || {};
      const financialStatementData = FinancialStatementInput.findOne({ profileId, year }) || {};

      if (!balanceSheetData) {
        errors.push(`BalanceSheetInputs data missing for year ${year}`);
        // console.log(`Error: BalanceSheetInputs data missing for year ${year}`);
      }
      if (!budgetFormData) {
        errors.push(`BudgetFormInput data missing for year ${year}`);
        // console.log(`Error: BudgetFormInput data missing for year ${year}`);
      }
      if (!financialStatementData) {
        errors.push(`FinancialStatementInput data missing for year ${year}`);
        // console.log(`Error: FinancialStatementInput data missing for year ${year}`);
      }

      // Calculations for fields
      const assets = (balanceSheetData.totalCashAndCashEquivalents || 0)
        + (balanceSheetData.totalOtherAssets || 0)
        + (balanceSheetData.totalInvestments || 0);
      const liabilities = balanceSheetData.totalLiabilities || 0;
      const netPosition = assets - liabilities;
      const cashOnHand = balanceSheetData.cash || 0;
      const investment = balanceSheetData.totalInvestments || 0;
      const liquidity = balanceSheetData.cashInBanks || 0;
      const debt = liabilities + (balanceSheetData.longTermLiabilitiesAfterOneYear || 0);
      const revenues = budgetFormData.revenues || 0;
      const opex = budgetFormData.totalExpenses || 0;
      const netIncome = revenues - opex;

      const cashFlow = {
        inflow: financialStatementData.totalProgramRevenues || 0,
        outflow: financialStatementData.totalExpenses || 0,
        net: (financialStatementData.totalProgramRevenues || 0) - (financialStatementData.totalExpenses || 0),
      };

      const incrementalFringeBenefits = {
        admin: budgetFormData.fringeBenefitsAdmin || 0,
        mgmtStaff: budgetFormData.fringeBenefitsStaff || 0,
        mgmt: budgetFormData.fringeBenefitsManagement || 0,
      };

      // Check if StaticFinancials data for this year already exists
      const existingData = StaticFinancials.findOne({ profileId, year });
      const definitionData = {
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
        owner: Meteor.userId(),
      };

      try {
        if (existingData) {
          // console.log(`Updating existing StaticFinancials record for year ${year}`);
          // Update using updateMethod
          await updateMethod.callPromise({
            collectionName: StaticFinancials.getCollectionName(),
            updateData: { ...definitionData, id: existingData._id },
          });
        } else {
          // console.log(`Inserting new StaticFinancials record for year ${year}`);
          // Define new record using defineMethod
          await defineMethod.callPromise({
            collectionName: StaticFinancials.getCollectionName(),
            definitionData,
          });
        }
      } catch (error) {
        // console.error(`Error processing data for year ${year}:`, error);
        errors.push(`Failed to update or insert data for year ${year}`);
      }
    });

    if (errors.length > 0) {
      throw new Meteor.Error('incomplete-data', `Missing or failed data: ${errors.join('; ')}`);
    }

    return 'Historical data updated! Make sure to generate projections to reflect these changes.';
  },

  'staticFinancials.updateFromBudgetForm'({ profileId, year }) {
    check(profileId, String);
    check(year, Number);

    // Fetch data from BudgetFormInput for the given profileId and year
    const budgetData = BudgetFormInput.findOne({ profileId, year });
    if (!budgetData) {
      throw new Meteor.Error('no-budget-data', `No BudgetFormInput data found for year ${year}`);
    }

    // Extract required fields from BudgetFormInput
    const {
      totalRevenue = 0,
      totalExpenses = 0,
      personnelAndFringeAdmin = 0,
      personnelAndFringeStaff = 0,
      personnelAndFringeManagement = 0,
      management = 0,
      supportServices = 0,
      beneficiaryAdvocacy = 0,
    } = budgetData;

    // Calculate fields
    const revenues = totalRevenue;
    const opex = totalExpenses;
    const netIncome = revenues - opex;

    const inflow = revenues + management + supportServices + beneficiaryAdvocacy;
    const outflow = revenues - inflow;
    const cashFlow = { inflow, outflow, net: inflow - outflow };

    const incrementalFringeBenefits = {
      admin: personnelAndFringeAdmin,
      mgmtStaff: personnelAndFringeStaff,
      mgmt: personnelAndFringeManagement,
    };

    // Find existing StaticFinancials record for the profileId and year
    const existingRecord = StaticFinancials.findOne({ profileId, year });

    const updateData = {
      revenues,
      opex,
      netIncome,
      cashFlow,
      incrementalFringeBenefits,
    };

    if (existingRecord) {
    // Update the existing record
      StaticFinancials.update(existingRecord._id, { $set: updateData });
    } else {
    // Define a new record if it doesn't exist
      StaticFinancials.insert({
        profileId,
        year,
        ...updateData,
        owner: Meteor.userId(),
      });
    }

    return 'Static financials updated successfully!';
  },
});
