import SimpleSchema from 'simpl-schema';

export const BalanceSheetInputSchema = new SimpleSchema({
  // Cash and Cash Equivalents fields
  pettyCash: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  cash: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  cashInBanks: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalCashAndCashEquivalents: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },

  // Other Assets fields
  accountsReceivables: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  dueFromOtherFunds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  interestAndDividendsReceivable: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  otherAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  notesReceivableBeforeOneYear: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  notesReceivableAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  securityDeposits: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  cashByInvestmentManager: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  mutualFunds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  commingledFunds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  hedgeFunds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  privateEquityFunds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  commonTrustFunds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  commonAndPreferredStocks: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  privateDebt: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  otherInvestments: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  subtotalInvestments: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  usTreasuries: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  usAgencies: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  subtotalLoanFund: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalInvestments: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  buildings: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  leaseholdImprovements: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  furnitureFixturesEquipment: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  accumulatedDepreciation: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  netCapitalAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  landA: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  landB: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  constructionInProgress: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  subtotalCapitalAssetsNet: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcBuildings: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcLeaseholdImprovements: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcFurnitureFixturesEquipment: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  vehicles: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcAccumulatedDepreciation: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcNet: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcLand: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcAssetsNet: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalCapitalAssetsNet: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  restrictedCash: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalOtherAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  deferredOutflowsPensions: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  deferredOutflowsOPEB: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  netAssetsDeferredOutflows: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },

  // Liabilities fields
  accountsPayable: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  dueToFund: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  dueToOtherFunds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalLiabilities: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  deferredInflowsPensions: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  deferredInflowsOPEB: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  netLiabilitiesDeferredInflows: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },

  // Commitments and Contingencies fields
  investedInCapitalAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  restrictedFederalFunds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  unrestricted: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalNetPosition: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalLiabilitiesDeferredNetPosition: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
});
