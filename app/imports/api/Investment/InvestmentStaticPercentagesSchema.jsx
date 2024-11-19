import SimpleSchema from 'simpl-schema';

export const InvestmentStaticPercentagesSchema = new SimpleSchema({

  targetAllocationTraditionalGlobalEquity: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  compoundReturnTraditionalGlobalEquity: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  standardDeviationTraditionalGlobalEquity: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Traditional Fixed Income
  targetAllocationTraditionalFixedIncome: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  compoundReturnTraditionalFixedIncome: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  standardDeviationTraditionalFixedIncome: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Traditional Real Assets
  targetAllocationTraditionalRealAssets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  compoundReturnTraditionalRealAssets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  standardDeviationTraditionalRealAssets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Hedge Funds
  targetAllocationHedgeFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  compoundReturnHedgeFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  standardDeviationHedgeFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Private Markets
  targetAllocationPrivateMarkets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  compoundReturnPrivateMarkets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  standardDeviationPrivateMarkets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Enhanced Liquidity
  targetAllocationEnhancedLiquidity: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  compoundReturnEnhancedLiquidity: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  standardDeviationEnhancedLiquidity: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Hawaii Direct Investments
  targetAllocationHawaiiDirectInvestments: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  compoundReturnHawaiiDirectInvestments: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  standardDeviationHawaiiDirectInvestments: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Overall Metrics
  totalTargetAllocation: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  overallCompoundReturn: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  overallStandardDeviation: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
});
