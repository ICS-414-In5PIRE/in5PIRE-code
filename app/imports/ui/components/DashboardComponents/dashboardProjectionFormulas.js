// /imports/api/projections/projectionFormulas.js

// Basic projection formulas for each field.
// Each function takes the previous year's data as an input and applies a default growth rate.
// These should be updated and marked as updated and complete as we parse the real formulas from the excel sheet
// See generateDashboardProjections.js for implementation

export const calculateAssetsProjection = (previousYearValue) => previousYearValue * 1.05;
export const calculateLiabilitiesProjection = (previousYearValue) => previousYearValue * 1.05;

export const calculateNetPositionProjection = (assets, liabilities) => assets - liabilities;

export const calculateCashOnHandProjection = (previousValues) => (previousValues.reduce((sum, val) => sum + val, 0) / previousValues.length) * 1.05;

export const calculateInvestmentProjection = (previousYearValue) => previousYearValue * 1.05;
export const calculateLiquidityProjection = (previousYearValue) => previousYearValue * 1.05;

export const calculateDebtProjection = (previousYearValue) => previousYearValue * 1.03;

export const calculateRevenuesProjection = (previousYearValue) => previousYearValue * 1.07;
export const calculateOpexProjection = (previousYearValue) => previousYearValue * 1.04;
export const calculateNetIncomeProjection = (revenues, opex) => revenues - opex;

export const calculateCashFlowInflowProjection = (previousYearValue) => previousYearValue * 1.06;
export const calculateCashFlowOutflowProjection = (previousYearValue) => previousYearValue * 1.04;
export const calculateCashFlowNetProjection = (inflow, outflow) => inflow - outflow;

// Incremental Fringe Benefits could be broken down into different categories
export const calculateFringeBenefitsAdminProjection = (previousYearValue) => previousYearValue * 1.03;
export const calculateFringeBenefitsMgmtStaffProjection = (previousYearValue) => previousYearValue * 1.04;
export const calculateFringeBenefitsMgmtProjection = (previousYearValue) => previousYearValue * 1.05;
