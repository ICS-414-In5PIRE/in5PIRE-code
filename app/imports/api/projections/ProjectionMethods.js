import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FinancialProfiles } from '../FinancialProfiles/FinancialProfilesCollection';
import { calculateProjectionValues } from './BudgetProjectionUtils';

Meteor.methods({
  'projections.generateBudgetProjections'(profileId, baseValues, growthRate) {
    check(profileId, String);

    check(baseValues, {
      revenue: Number,
      expenses: Number,
      assets: Number,
    });

    check(growthRate, Number); // Check if growthRate is a number

    // Generate budget projections
    const projections = calculateProjectionValues(baseValues, growthRate);

    // Save the projections back to the profile
    FinancialProfiles.update(profileId, {
      $set: {
        budgetProjections: projections, // Store projections in a new budgetProjections field
      },
    });

    return projections;
  },
});
