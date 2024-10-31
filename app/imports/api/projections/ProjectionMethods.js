import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FinancialProfiles } from '../FinancialProfiles/FinancialProfilesCollection';
import { calculateBudgetProjections } from './BudgetProjectionUtils';

Meteor.methods({
  'projections.generateBudgetProjections'(profileId, baseValues, growthRate) {
    check(profileId, String);

    // Ensure baseValues are an object with relevant fields
    check(baseValues, {
      revenue: Number,
      expenses: Number,
      assets: Number,
    });

    check(growthRate, Number); // Check if growthRate is a number

    // Generate budget projections
    const projections = calculateBudgetProjections(baseValues, growthRate);

    // Save the projections back to the profile
    FinancialProfiles.update(profileId, {
      $set: {
        budgetProjections: projections, // Store projections in a new budgetProjections field
      },
    });

    return projections; // Optional: return projections if needed for immediate use
  },
});
