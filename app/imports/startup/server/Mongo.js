import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';
import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

function initializeStaticFinancials(data) {
  const user = Meteor.users.findOne({ 'emails.address': 'john@foo.com' });
  const financialProfile = FinancialProfiles.findOne({ owner: user.username });

  if (!financialProfile) {
    console.error('No financial profile found for john@foo.com');
    return;
  }

  const profileId = financialProfile._id;
  const entry = { ...data, profileId };

  console.log(`Initializing StaticFinancials for year ${data.year}, profile ${profileId}`);
  StaticFinancials.define(entry);
}

if (StaticFinancials.count() === 0 && Meteor.settings.defaultStaticFinancials) {
  console.log('Initializing StaticFinancials with default values...');
  Meteor.settings.defaultStaticFinancials.forEach(data => initializeStaticFinancials(data));
}

function addBudgetFormInputData(data) {
  const userProfile = global.userProfiles[data.owner];
  if (!userProfile || !userProfile.financialProfileId) {
    console.log(`No financial profile found for owner: ${data.owner}. Skipping this entry.`);
    return;
  }

  const dataWithProfileId = { ...data, profileId: userProfile.financialProfileId };
  BudgetFormInput.define(dataWithProfileId);
}

if (BudgetFormInput.count() === 0 && Meteor.settings.defaultBudgetFormInput) {
  console.log('Creating default BudgetFormInput data.');
  Meteor.settings.defaultBudgetFormInput.forEach(data => addBudgetFormInputData(data));
}

function addFinancialData(data) {
  const userProfile = global.userProfiles[data.owner];
  if (!userProfile || !userProfile.financialProfileId) {
    console.log(`No financial profile found for owner: ${data.owner}. Skipping this entry.`);
    return;
  }

  const profileId = userProfile.financialProfileId;

  // Find all years with budget data for this profile
  const budgetDataForProfile = BudgetFormInput.find({ profileId }).fetch();

  if (!budgetDataForProfile.length) {
    console.log(`No budget data found for profileId: ${profileId}.`);
    return;
  }

  budgetDataForProfile.forEach((budgetData) => {
    const year = budgetData.year;
    const existingData = StaticFinancials.findOne({ profileId, year });

    if (existingData) {
      console.log(`StaticFinancials for year ${year} already exists. Skipping.`);
      return;
    }

    const financialDataForYear = {
      profileId,
      year,
      revenues: budgetData.revenues || 0,
      opex: budgetData.totalExpenses || 0,
      netIncome: (budgetData.revenues || 0) - (budgetData.totalExpenses || 0),
      incrementalFringeBenefits: {
        admin: budgetData.fringeBenefitsAdmin || 0,
        mgmtStaff: budgetData.fringeBenefitsStaff || 0,
        mgmt: budgetData.fringeBenefitsManagement || 0,
      },
      owner: data.owner,
    };

    console.log(`Adding StaticFinancials for year ${year} (${data.owner})`);
    StaticFinancials.define(financialDataForYear);
  });
}

if (StaticFinancials.count() === 0) {
  if (Meteor.settings.defaultFinancialData) {
    console.log('Creating default Financial data.');
    Meteor.settings.defaultFinancialData.forEach(data => addFinancialData(data));
  }
}

function addBalanceSheetData(data) {
  const userProfile = global.userProfiles[data.owner];
  if (!userProfile || !userProfile.financialProfileId) {
    console.log(`No financial profile found for owner: ${data.owner}. Skipping this entry.`);
    return;
  }

  const dataWithProfileId = { ...data, profileId: userProfile.financialProfileId };

  console.log(`Adding Balance Sheet Data for Year: ${data.year} (${data.owner})`);
  BalanceSheetInputs.define(dataWithProfileId);
}

if (BalanceSheetInputs.count() === 0 && Meteor.settings.defaultBalanceSheetData) {
  console.log('Creating default BalanceSheetInputs data.');
  Meteor.settings.defaultBalanceSheetData.forEach(data => addBalanceSheetData(data));
}

function addFinancialStatementData(data) {
  const userProfile = global.userProfiles[data.owner];
  if (!userProfile || !userProfile.financialProfileId) {
    console.log(`No financial profile found for owner: ${data.owner}. Skipping this entry.`);
    return;
  }

  const dataWithProfileId = { ...data, profileId: userProfile.financialProfileId };

  console.log(`Adding Financial Statement Data for Year: ${data.year} (${data.owner})`);
  FinancialStatementInput.define(dataWithProfileId);
}

if (FinancialStatementInput.count() === 0 && Meteor.settings.defaultFinancialStatementData) {
  console.log('Creating default FinancialStatementInput data.');
  Meteor.settings.defaultFinancialStatementData.forEach(data => addFinancialStatementData(data));
}

function addStaticFinancialsData(profileId, owner) {
  const years = [2021, 2022, 2023, 2024];
  years.forEach((year) => {
    if (!StaticFinancials.findOne({ profileId, year })) {
      console.log(`  Initializing Static Financials for profile: ${profileId}, year: ${year}`);
      StaticFinancials.define({
        profileId,
        year,
        revenues: 0,
        opex: 0,
        netIncome: 0,
        cashFlow: { inflow: 0, outflow: 0, net: 0 },
        incrementalFringeBenefits: { admin: 0, mgmtStaff: 0, mgmt: 0 },
        owner,
      });
    } else {
      console.log(`  Static Financials already exist for profile: ${profileId}, year: ${year}`);
    }
  });
}

if (StaticFinancials.count() === 0) {
  Object.keys(global.userProfiles).forEach((email) => {
    const { financialProfileId } = global.userProfiles[email];
    addStaticFinancialsData(financialProfileId, email);
  });
}
