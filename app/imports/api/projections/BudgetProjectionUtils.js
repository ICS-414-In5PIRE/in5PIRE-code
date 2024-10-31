// Function to calculate projections over specified periods based on a base value and growth rate
export const calculateProjection = (baseValue, growthRate, periods) => Array.from({ length: periods }, (_, i) => Math.round(baseValue * (1 + growthRate) ** i));

// Wrapper function for multiple categories (e.g., revenue, expenses, assets)
export const calculateBudgetProjections = (baseValues, growthRate) => ({
  revenue: calculateProjection(baseValues.revenue, growthRate, 12),
  expenses: calculateProjection(baseValues.expenses, growthRate, 12),
  assets: calculateProjection(baseValues.assets, growthRate, 12),
});
