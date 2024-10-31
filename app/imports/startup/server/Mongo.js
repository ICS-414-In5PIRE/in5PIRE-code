import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';
import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';

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

function addFinancialData(data) {
  console.log(`  Adding Financial Data: ${data.customerName} (${data.owner})`);
  StaticFinancials.define(data);
}

if (StaticFinancials.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default Financial data.');
    Meteor.settings.defaultFinancialData.forEach(data => addFinancialData(data));
  }
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

if (BudgetFormInput.count() === 0 && Meteor.settings.BudgetFormInput) {
  console.log('Creating default BudgetFormInput data.');
  Meteor.settings.BudgetFormInput.forEach(data => addBudgetFormInputData(data));
}
