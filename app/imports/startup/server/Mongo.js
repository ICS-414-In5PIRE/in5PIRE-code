import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';
import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { InvestmentStaticPercentages } from '../../api/Investment/InvestmentStaticPercentagesCollection';

/* eslint-disable no-console */

function addData(data) {
  console.log(`Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

if (Stuffs.count() === 0 && Meteor.settings.defaultData) {
  console.log('Initializing default Stuffs data...');
  Meteor.settings.defaultData.forEach(addData);
}

function initializeStaticFinancials() {
  if (!Meteor.settings.defaultStaticFinancials || !Array.isArray(Meteor.settings.defaultStaticFinancials)) {
    console.error('No valid defaultStaticFinancials in settings.');
    return;
  }

  Meteor.settings.defaultStaticFinancials.forEach((data) => {
    const user = Meteor.users.findOne({ 'emails.address': data.owner });
    const financialProfile = FinancialProfiles.findOne({ owner: user?.username });

    if (!financialProfile) {
      console.warn(`No financial profile found for ${data.owner}. Skipping StaticFinancials initialization.`);
      return;
    }

    const profileId = financialProfile._id;
    if (!StaticFinancials.findOne({ profileId, year: data.year })) {
      StaticFinancials.define({ ...data, profileId });
      console.log(`Initialized StaticFinancials for year ${data.year}, owner: ${data.owner}`);
    } else {
      console.log(`StaticFinancials for year ${data.year}, owner: ${data.owner} already exists.`);
    }
  });
}

if (StaticFinancials.count() === 0 && Meteor.settings.defaultStaticFinancials) {
  console.log('Initializing StaticFinancials...');
  Meteor.settings.defaultStaticFinancials.forEach(initializeStaticFinancials);
}

function addBudgetFormInputData(data) {
  const userProfile = global.userProfiles[data.owner];
  if (!userProfile || !userProfile.financialProfileId) {
    console.warn(`No financial profile found for owner: ${data.owner}. Skipping.`);
    return;
  }
  BudgetFormInput.define({ ...data, profileId: userProfile.financialProfileId });
}

if (BudgetFormInput.count() === 0 && Meteor.settings.defaultBudgetFormInput) {
  console.log('Initializing default BudgetFormInput data...');
  Meteor.settings.defaultBudgetFormInput.forEach(addBudgetFormInputData);
}

function addBalanceSheetData(data) {
  const userProfile = global.userProfiles[data.owner];
  if (!userProfile || !userProfile.financialProfileId) {
    console.warn(`No financial profile found for owner: ${data.owner}. Skipping.`);
    return;
  }
  BalanceSheetInputs.define({ ...data, profileId: userProfile.financialProfileId });
}

if (BalanceSheetInputs.count() === 0 && Meteor.settings.defaultBalanceSheetData) {
  console.log('Initializing default BalanceSheetInputs data...');
  Meteor.settings.defaultBalanceSheetData.forEach(addBalanceSheetData);
}

function addFinancialStatementData(data) {
  const userProfile = global.userProfiles[data.owner];
  if (!userProfile || !userProfile.financialProfileId) {
    console.warn(`No financial profile found for owner: ${data.owner}. Skipping.`);
    return;
  }
  FinancialStatementInput.define({ ...data, profileId: userProfile.financialProfileId });
}

if (FinancialStatementInput.count() === 0 && Meteor.settings.defaultFinancialStatementData) {
  console.log('Initializing default FinancialStatementInput data...');
  Meteor.settings.defaultFinancialStatementData.forEach(addFinancialStatementData);
}

// function addInvestmentStaticPercentages(data) {
//   const userProfile = global.userProfiles[data.owner];
//   if (!userProfile || !userProfile.financialProfileId) {
//     console.warn(`No financial profile found for owner: ${data.owner}. Skipping.`);
//     return;
//   }
//   InvestmentStaticPercentages.define({ ...data, profileId: userProfile.financialProfileId });
// }
//
// if (InvestmentStaticPercentages.count() === 0 && Meteor.settings.defaultFinancialStatementData) {
//   console.log('Initializing default Investment Static Percentages data...');
//   Meteor.settings.defaultInvestmentPercentages.forEach(addInvestmentStaticPercentages);
// }
function addInvestmentStaticPercentages(data) {
  // Check if a record with the same targetAllocation already exists to avoid duplicates
  const existingRecord = InvestmentStaticPercentages.findOne({
    targetAllocationTraditionalGlobalEquity: data.targetAllocationTraditionalGlobalEquity,
  });

  if (existingRecord) {
    console.warn('Skipping duplicate static percentage entry:', data);
    return;
  }

  // Insert the new investment static percentage record
  InvestmentStaticPercentages.define(data);
}

// Initialize default data if the collection is empty and settings are available
if (
  InvestmentStaticPercentages.count() === 0 &&
  Meteor.settings?.defaultInvestmentPercentages?.length > 0
) {
  console.log('Initializing default Investment Static Percentages data...');
  Meteor.settings.defaultInvestmentPercentages.forEach((data) => {
    try {
      addInvestmentStaticPercentages(data);
    } catch (err) {
      console.error('Error adding investment static percentages:', err);
    }
  });
}
