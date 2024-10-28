import SimpleSchema from 'simpl-schema';

export const FinancialStatementInputSchema = new SimpleSchema({
  year: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  owner: {
    type: String,
    optional: true,
    defaultValue: 0,
  },
  profileId: {
    type: String,
    optional: false,
  },
  // Cash and cash equivalent inputs
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
  },
  cashByInvestmentManager: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  restrictedCash: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalCashAndCashEquivalents: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  // Other assets inputs
  accountsReceivable: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  dueFromOtherFund: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  interestAndDividends: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  inventoryPrepaidAndOthers: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  notesReceivableWithinOneYear: {
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
  investments: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  netCapitalAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalOtherAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  deferredOutflowsOfResources: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalAssetsDeferredOutflows: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  // Liabilities inputs
  accountsPayableAndAccruedLiabilities: {
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
  longTermLiabilitiesWithinOneYear: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  longTermLiabilitiesAfterOneYear: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalLiabilities: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  deferredInflowsResources: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  deferredInflowsOPEB: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalLiabilitiesDeferredInflows: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  // Net assets inputs
  capitalAssetsRelatedDebt: {
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
  totalNetAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalLiabilitiesNetAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  // Program revenues inputs
  chargesForService: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  operatingGrants: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  interestAndInvestmentEarnings: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalProgramRevenues: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  // General revenues inputs
  appropriationsNetLapses: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  trust: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  interestAndInvestmentLosses: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  newspaperAds: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  donationsAndOther: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  nonImposedFringeBenefits: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcBRevenues: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalGeneralRevenues: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalRevenues: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  // Expenditures inputs
  management: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  supportServices: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  beneficiaryAdvocacy: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  depreciation: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcA: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  llcBExpenditures: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  totalExpenses: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  excessRevenuesOverExpenditures: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  proceedsFromDebt: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  proceedsFromCapital: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  netTransfers: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  changeInNetAssets: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  // Fund balances inputs
  beginningOfYear: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  restatementAdjustment: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
  netPositionEndOfYear: {
    type: Number,
    optional: true,
    defaultValue: 0,
  },
});
