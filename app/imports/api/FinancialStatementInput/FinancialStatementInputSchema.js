import SimpleSchema from 'simpl-schema';

export const FinancialStatementInputSchema = new SimpleSchema({
  year: {
    type: Number,
    optional: false,
  },
  owner: {
    type: String,
    optional: false,
  },
  // Cash and cash equivalent inputs
  pettyCash: {
    type: Number,
    optional: false,
  },
  cash: {
    type: Number,
    optional: false,
  },
  cashInBanks: {
    type: Number,
    optional: false,
  },
  cashByInvestmentManager: {
    type: Number,
    optional: false,
  },
  restrictedCash: {
    type: Number,
    optional: false,
  },
  totalCashAndCashEquivalents: {
    type: Number,
    optional: false,
  },
  // Other assets inputs
  accountsReceivable: {
    type: Number,
    optional: false,
  },
  dueFromOtherFund: {
    type: Number,
    optional: false,
  },
  interestAndDividends: {
    type: Number,
    optional: false,
  },
  inventoryPrepaidAndOthers: {
    type: Number,
    optional: false,
  },
  notesReceivableWithinOneYear: {
    type: Number,
    optional: false,
  },
  notesReceivableAfterOneYear: {
    type: Number,
    optional: false,
  },
  securityDeposits: {
    type: Number,
    optional: false,
  },
  investments: {
    type: Number,
    optional: false,
  },
  netCapitalAssets: {
    type: Number,
    optional: false,
  },
  totalOtherAssets: {
    type: Number,
    optional: false,
  },
  deferredOutflowsOfResources: {
    type: Number,
    optional: false,
  },
  totalAssetsDeferredOutflows: {
    type: Number,
    optional: false,
  },
  // Liabilities inputs
  accountsPayableAndAccruedLiabilities: {
    type: Number,
    optional: false,
  },
  dueToFund: {
    type: Number,
    optional: false,
  },
  dueToOtherFunds: {
    type: Number,
    optional: false,
  },
  longTermLiabilitiesWithinOneYear: {
    type: Number,
    optional: false,
  },
  longTermLiabilitiesAfterOneYear: {
    type: Number,
    optional: false,
  },
  totalLiabilities: {
    type: Number,
    optional: false,
  },
  deferredInflowsResources: {
    type: Number,
    optional: false,
  },
  deferredInflowsOPEB: {
    type: Number,
    optional: false,
  },
  totalLiabilitiesDeferredInflows: {
    type: Number,
    optional: false,
  },
  // Net assets inputs
  capitalAssetsRelatedDebt: {
    type: Number,
    optional: false,
  },
  restrictedFederalFunds: {
    type: Number,
    optional: false,
  },
  unrestricted: {
    type: Number,
    optional: false,
  },
  totalNetAssets: {
    type: Number,
    optional: false,
  },
  totalLiabilitiesNetAssets: {
    type: Number,
    optional: false,
  },
  // Program revenues inputs
  chargesForService: {
    type: Number,
    optional: false,
  },
  operatingGrants: {
    type: Number,
    optional: false,
  },
  interestAndInvestmentEarnings: {
    type: Number,
    optional: false,
  },
  totalProgramRevenues: {
    type: Number,
    optional: false,
  },
  // General revenues inputs
  appropriationsNetLapses: {
    type: Number,
    optional: false,
  },
  trust: {
    type: Number,
    optional: false,
  },
  interestAndInvestmentLosses: {
    type: Number,
    optional: false,
  },
  newspaperAds: {
    type: Number,
    optional: false,
  },
  donationsAndOther: {
    type: Number,
    optional: false,
  },
  nonImposedFringeBenefits: {
    type: Number,
    optional: false,
  },
  llcBRevenues: {
    type: Number,
    optional: false,
  },
  totalGeneralRevenues: {
    type: Number,
    optional: false,
  },
  totalRevenues: {
    type: Number,
    optional: false,
  },
  // Expenditures inputs
  management: {
    type: Number,
    optional: false,
  },
  supportServices: {
    type: Number,
    optional: false,
  },
  beneficiaryAdvocacy: {
    type: Number,
    optional: false,
  },
  depreciation: {
    type: Number,
    optional: false,
  },
  llcA: {
    type: Number,
    optional: false,
  },
  llcBExpenditures: {
    type: Number,
    optional: false,
  },
  totalExpenses: {
    type: Number,
    optional: false,
  },
  excessRevenuesOverExpenditures: {
    type: Number,
    optional: false,
  },
  proceedsFromDebt: {
    type: Number,
    optional: false,
  },
  proceedsFromCapital: {
    type: Number,
    optional: false,
  },
  netTransfers: {
    type: Number,
    optional: false,
  },
  changeInNetAssets: {
    type: Number,
    optional: false,
  },
  // Fund balances inputs
  beginningOfYear: {
    type: Number,
    optional: false,
  },
  restatementAdjustment: {
    type: Number,
    optional: false,
  },
  netPositionEndOfYear: {
    type: Number,
    optional: false,
  },
});
