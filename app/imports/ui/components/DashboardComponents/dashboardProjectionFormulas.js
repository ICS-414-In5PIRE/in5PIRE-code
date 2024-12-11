// /imports/api/projections/projectionFormulas.js

// Basic projection formulas for each field.
// Each function takes the previous year's data as an input and applies a default growth rate.
// These should be updated and marked as updated and complete as we parse the real formulas from the excel sheet
// See generateDashboardProjections.js for implementation

export const calculateAssetsProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateLiabilitiesProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateNetPositionProjection = (assets, liabilities) => assets - liabilities;

export const calculateCashOnHandProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateInvestmentProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateLiquidityProjection = (previousYearValue, percentIncrease) => previousYearValue * percentIncrease + 1;

export const calculateDebtProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);

export const calculateRevenuesProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateOpexProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateNetIncomeProjection = (revenues, opex) => revenues - opex;

export const calculateCashFlowInflowProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateCashFlowOutflowProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateCashFlowNetProjection = (inflow, outflow) => inflow - outflow;

// Incremental Fringe Benefits could be broken down into different categories
export const calculateFringeBenefitsAdminProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateFringeBenefitsMgmtStaffProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
export const calculateFringeBenefitsMgmtProjection = (previousYearValue, percentIncrease) => previousYearValue * ((percentIncrease / 100) + 1);
