import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';

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
