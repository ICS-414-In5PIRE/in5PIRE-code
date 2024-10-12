import SimpleSchema from 'simpl-schema';

export const BalanceSheetInputSchema = new SimpleSchema({
  year: {
    type: Number,
    optional: false,
  },
  owner: {
    type: String,
    optional: false,
  },
  // Cash and Cash Equivalents fields
  pettyCash: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  cash: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  cashInBanks: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalCashAndCashEquivalents: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Other Assets fields
  accountsReceivables: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  dueFromOtherFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  interestAndDividendsReceivable: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  otherAssets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  notesReceivableBeforeOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  notesReceivableAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  securityDeposits: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  cashByInvestmentManager: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  mutualFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  commingledFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  hedgeFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  privateEquityFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  commonTrustFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  commonAndPreferredStocks: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  privateDebt: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  otherInvestments: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  subtotalInvestments: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  usTreasuries: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  usAgencies: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  subtotalLoanFund: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalInvestments: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  buildings: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  leaseholdImprovements: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  furnitureFixturesEquipment: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  accumulatedDepreciation: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netCapitalAssets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  landA: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  landB: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  constructionInProgress: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  subtotalCapitalAssetsNet: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  llcBuildings: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  llcLeaseholdImprovements: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  llcFurnitureFixturesEquipment: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  vehicles: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  llcAccumulatedDepreciation: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  llcNet: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  llcLand: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  llcAssetsNet: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalCapitalAssetsNet: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  restrictedCash: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalOtherAssets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  deferredOutflowsPensions: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  deferredOutflowsOPEB: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netAssetsDeferredOutflows: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Liabilities fields
  accountsPayable: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  dueToFund: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  dueToOtherFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalLiabilities: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  deferredInflowsPensions: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  deferredInflowsOPEB: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netLiabilitiesDeferredInflows: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Commitments and Contingencies fields
  investedInCapitalAssets: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  restrictedFederalFunds: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  unrestricted: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalNetPosition: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalLiabilitiesDeferredNetPosition: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  // Liabilities Due Within One Year fields
  accruedVacationDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  workersCompensationDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  accruedRetirementPlanDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  accruedLeaseGuarantyDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  capitalLeaseObligationsDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  notesPayableBuildingADueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netPensionLiabilityDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netOPEBLiabilityDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  lineOfCreditBuildingADueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  lineOfCreditBuildingBDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  debtServiceDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },

  // Liabilities Due After One Year fields
  accruedVacationDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  workersCompensationDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  accruedRetirementPlanDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  accruedLeaseGuarantyDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  capitalLeaseObligationsDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  notesPayableBuildingADueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netPensionLiabilityDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netOPEBLiabilityDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  lineOfCreditBuildingADueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  lineOfCreditBuildingBDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  debtServiceDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netLiabilitiesDueWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  netLiabilitiesDueAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
});
