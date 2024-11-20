import { Meteor } from 'meteor/meteor';
import { StaticFinancials } from '../../../api/financial/StaticFinancialsCollection';
import {
  calculateAssetsProjection,
  calculateLiabilitiesProjection,
  calculateNetPositionProjection,
  calculateCashOnHandProjection,
  calculateInvestmentProjection,
  calculateLiquidityProjection,
  calculateDebtProjection,
  calculateRevenuesProjection,
  calculateOpexProjection,
  calculateNetIncomeProjection,
  calculateCashFlowInflowProjection,
  calculateCashFlowOutflowProjection,
  calculateCashFlowNetProjection,
  calculateFringeBenefitsAdminProjection,
  calculateFringeBenefitsMgmtStaffProjection,
  calculateFringeBenefitsMgmtProjection,
} from './dashboardProjectionFormulas';

import { defineMethod, updateMethod } from '../../../api/base/BaseCollection.methods';

// This file seeks to generate the projection of the next 12 years given a baseyear set to latestYearData.
// The formulas can be found in dashboardProjectionFormulas.js and they are placeholder formulas until we can parse the real ones
// This file is implemented as a button on ProfileDashboard.jsx in the pages directory

export const generateDashboardProjections = async (profileId) => {
  // Get the current year
  const latestYear = new Date().getFullYear();
  const latestYearData = StaticFinancials.findOne({ profileId, year: latestYear });

  if (!latestYearData) {
    throw new Error(`No data found for the latest year for profile ${profileId}`);
  }

  // Initialize the base values for projections based on 2024
  let {
    assets, liabilities, cashOnHand, investment, liquidity, debt,
    revenues, opex, cashFlow, incrementalFringeBenefits,
  } = latestYearData;

  // Collect promises for each year's projection
  const projectionPromises = [];

  // Generate 12 years of data
  for (let i = 1; i <= 12; i++) {
    const projectionYear = 2024 + i;

    // Apply projection formulas
    const projectedAssets = calculateAssetsProjection(assets);
    const projectedLiabilities = calculateLiabilitiesProjection(liabilities);
    const projectedNetPosition = calculateNetPositionProjection(projectedAssets, projectedLiabilities);
    const projectedCashOnHand = calculateCashOnHandProjection([cashOnHand, projectedAssets, projectedLiabilities]);
    const projectedInvestment = calculateInvestmentProjection(investment);
    const projectedLiquidity = calculateLiquidityProjection(liquidity);
    const projectedDebt = calculateDebtProjection(debt);
    const projectedRevenues = calculateRevenuesProjection(revenues);
    const projectedOpex = calculateOpexProjection(opex);
    const projectedNetIncome = calculateNetIncomeProjection(projectedRevenues, projectedOpex);
    const projectedCashFlowInflow = calculateCashFlowInflowProjection(cashFlow.inflow);
    const projectedCashFlowOutflow = calculateCashFlowOutflowProjection(cashFlow.outflow);
    const projectedCashFlowNet = calculateCashFlowNetProjection(projectedCashFlowInflow, projectedCashFlowOutflow);
    const projectedFringeBenefitsAdmin = calculateFringeBenefitsAdminProjection(incrementalFringeBenefits.admin);
    const projectedFringeBenefitsMgmtStaff = calculateFringeBenefitsMgmtStaffProjection(incrementalFringeBenefits.mgmtStaff);
    const projectedFringeBenefitsMgmt = calculateFringeBenefitsMgmtProjection(incrementalFringeBenefits.mgmt);

    const projectedData = {
      profileId,
      year: projectionYear,
      assets: projectedAssets,
      liabilities: projectedLiabilities,
      netPosition: projectedNetPosition,
      cashOnHand: projectedCashOnHand,
      investment: projectedInvestment,
      liquidity: projectedLiquidity,
      debt: projectedDebt,
      revenues: projectedRevenues,
      opex: projectedOpex,
      netIncome: projectedNetIncome,
      cashFlow: {
        inflow: projectedCashFlowInflow,
        outflow: projectedCashFlowOutflow,
        net: projectedCashFlowNet,
      },
      incrementalFringeBenefits: {
        admin: projectedFringeBenefitsAdmin,
        mgmtStaff: projectedFringeBenefitsMgmtStaff,
        mgmt: projectedFringeBenefitsMgmt,
      },
      owner: Meteor.userId(),
    };

    // Check if data for the current year already exists, update it if so
    const existingData = StaticFinancials.findOne({ profileId, year: projectionYear });
    if (existingData) {
      projectionPromises.push(
        updateMethod.callPromise({
          collectionName: StaticFinancials.getCollectionName(),
          updateData: { ...projectedData, id: existingData._id },
        }),
      );
    } else {
      projectionPromises.push(
        defineMethod.callPromise({
          collectionName: StaticFinancials.getCollectionName(),
          definitionData: projectedData,
        }),
      );
    }

    // Update base values for next iteration
    assets = projectedAssets;
    liabilities = projectedLiabilities;
    cashOnHand = projectedCashOnHand;
    investment = projectedInvestment;
    liquidity = projectedLiquidity;
    debt = projectedDebt;
    revenues = projectedRevenues;
    opex = projectedOpex;
    cashFlow = { inflow: projectedCashFlowInflow, outflow: projectedCashFlowOutflow, net: projectedCashFlowNet };
    incrementalFringeBenefits = {
      admin: projectedFringeBenefitsAdmin,
      mgmtStaff: projectedFringeBenefitsMgmtStaff,
      mgmt: projectedFringeBenefitsMgmt,
    };
  }

  // Execute all update and insert promises in parallel
  await Promise.all(projectionPromises);

  return `12-year projections generated and saved for profile ${profileId}`;
};
