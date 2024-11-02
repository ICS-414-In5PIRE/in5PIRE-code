/**
 * Calculates projections for specified years based on actual data and growth rates.
 * @param {Object} actualValues - The actual base values from the latest data.
 * @param {Object} growthRates - The specified growth rates for each field.
 * @param {Array} years - Forecast years (e.g., [4, 8, 12]).
 * @returns {Object} An object containing projected values for each field.
 */
export const calculateProjectionValues = (actualValues, growthRates, years = [4, 8, 12]) => {
  const projections = {};

  // Iterate over each field in actual values and apply the growth formula
  Object.keys(actualValues).forEach((field) => {
    const baseValue = actualValues[field] || 0;
    const growthRate = growthRates[field] || 0;

    projections[field] = years.map((year) => Math.round(baseValue * (1 + growthRate) ** year));
  });

  return projections;
};
