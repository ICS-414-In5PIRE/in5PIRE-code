// csvSchemaGuide.js

/*
 * CSV File Upload Guide and Full Schema
 * Detailed instructions for formatting CSV files and an extensive schema for all field requirements.
 */

export const csvSchemaGuide = {
  generalInstructions: `
    - Files must be in CSV format with headers matching field names exactly.
    - Use numeric values for all monetary fields without commas or currency symbols.
    - Leave calculated fields blank, as they will be auto-populated upon upload.
    - Required fields must not be left blank, while optional fields may be empty.
  `,

  schemas: {
    balanceSheet: {
      title: 'Balance Sheet CSV Schema',
      fields: [
        { name: 'year', description: 'Year for the balance sheet entry', type: 'Number', required: true },
        // { name: 'owner', description: 'Owner identifier for the profile', type: 'String', required: true },
        // { name: 'profileId', description: 'Unique identifier for the financial profile', type: 'String', required: true },
        // Cash and Cash Equivalents
        { name: 'pettyCash', description: 'Amount in petty cash', type: 'Number', required: false },
        { name: 'cash', description: 'Cash on hand', type: 'Number', required: false },
        { name: 'cashInBanks', description: 'Cash in bank accounts', type: 'Number', required: false },
        { name: 'totalCashAndCashEquivalents', description: 'Auto-calculated; leave blank', type: 'Number', calculated: true },
        // Other Assets
        { name: 'accountsReceivables', description: 'Accounts receivable amount', type: 'Number', required: false },
        { name: 'dueFromOtherFunds', description: 'Amount due from other funds', type: 'Number', required: false },
        { name: 'interestAndDividendsReceivable', description: 'Interest and dividends receivable', type: 'Number', required: false },
        { name: 'otherAssets', description: 'Other miscellaneous assets', type: 'Number', required: false },
        { name: 'notesReceivableBeforeOneYear', description: 'Notes receivable due within one year', type: 'Number', required: false },
        { name: 'notesReceivableAfterOneYear', description: 'Notes receivable due after one year', type: 'Number', required: false },
        { name: 'securityDeposits', description: 'Security deposit amount', type: 'Number', required: false },
        { name: 'cashByInvestmentManager', description: 'Cash managed by investment manager', type: 'Number', required: false },
        { name: 'mutualFunds', description: 'Amount in mutual funds', type: 'Number', required: false },
        { name: 'commingledFunds', description: 'Amount in commingled funds', type: 'Number', required: false },
        { name: 'hedgeFunds', description: 'Amount in hedge funds', type: 'Number', required: false },
        { name: 'privateEquityFunds', description: 'Amount in private equity funds', type: 'Number', required: false },
        { name: 'commonTrustFunds', description: 'Amount in common trust funds', type: 'Number', required: false },
        { name: 'commonAndPreferredStocks', description: 'Amount in common and preferred stocks', type: 'Number', required: false },
        { name: 'privateDebt', description: 'Amount in private debt investments', type: 'Number', required: false },
        { name: 'otherInvestments', description: 'Other types of investments', type: 'Number', required: false },
        { name: 'subtotalInvestments', description: 'Auto-calculated subtotal of investments', type: 'Number', calculated: true },
        { name: 'usTreasuries', description: 'Amount in U.S. treasuries', type: 'Number', required: false },
        { name: 'usAgencies', description: 'Amount in U.S. agency securities', type: 'Number', required: false },
        { name: 'subtotalLoanFund', description: 'Auto-calculated subtotal of loan fund', type: 'Number', calculated: true },
        { name: 'totalInvestments', description: 'Auto-calculated total investments', type: 'Number', calculated: true },
        { name: 'buildings', description: 'Value of buildings', type: 'Number', required: false },
        { name: 'leaseholdImprovements', description: 'Value of leasehold improvements', type: 'Number', required: false },
        { name: 'furnitureFixturesEquipment', description: 'Value of furniture, fixtures, and equipment', type: 'Number', required: false },
        { name: 'accumulatedDepreciation', description: 'Accumulated depreciation', type: 'Number', required: false },
        { name: 'netCapitalAssets', description: 'Auto-calculated net capital assets', type: 'Number', calculated: true },
        { name: 'landA', description: 'Value of Land A', type: 'Number', required: false },
        { name: 'landB', description: 'Value of Land B', type: 'Number', required: false },
        { name: 'constructionInProgress', description: 'Value of construction in progress', type: 'Number', required: false },
        { name: 'subtotalCapitalAssetsNet', description: 'Auto-calculated net of capital assets', type: 'Number', calculated: true },
        { name: 'llcBuildings', description: 'Value of buildings owned by LLC', type: 'Number', required: false },
        { name: 'llcLeaseholdImprovements', description: 'Leasehold improvements by LLC', type: 'Number', required: false },
        { name: 'llcFurnitureFixturesEquipment', description: 'Furniture, fixtures, and equipment by LLC', type: 'Number', required: false },
        { name: 'vehicles', description: 'Value of vehicles', type: 'Number', required: false },
        { name: 'llcAccumulatedDepreciation', description: 'Accumulated depreciation by LLC', type: 'Number', required: false },
        { name: 'llcNet', description: 'Auto-calculated net of LLC assets', type: 'Number', calculated: true },
        { name: 'llcLand', description: 'Land value owned by LLC', type: 'Number', required: false },
        { name: 'llcAssetsNet', description: 'Auto-calculated total LLC assets net', type: 'Number', calculated: true },
        { name: 'totalCapitalAssetsNet', description: 'Auto-calculated total capital assets net', type: 'Number', calculated: true },
        { name: 'restrictedCash', description: 'Amount of restricted cash', type: 'Number', required: false },
        { name: 'totalOtherAssets', description: 'Auto-calculated total other assets', type: 'Number', calculated: true },
        { name: 'deferredOutflowsPensions', description: 'Deferred outflows for pensions', type: 'Number', required: false },
        { name: 'deferredOutflowsOPEB', description: 'Deferred outflows for OPEB', type: 'Number', required: false },
        { name: 'netAssetsDeferredOutflows', description: 'Auto-calculated net assets deferred outflows', type: 'Number', calculated: true },
        // Liabilities
        { name: 'accountsPayable', description: 'Accounts payable amount', type: 'Number', required: false },
        { name: 'dueToFund', description: 'Amount due to fund', type: 'Number', required: false },
        { name: 'dueToOtherFunds', description: 'Amount due to other funds', type: 'Number', required: false },
        { name: 'totalLiabilities', description: 'Auto-calculated total liabilities', type: 'Number', calculated: true },
        { name: 'deferredInflowsPensions', description: 'Deferred inflows for pensions', type: 'Number', required: false },
        { name: 'deferredInflowsOPEB', description: 'Deferred inflows for OPEB', type: 'Number', required: false },
        { name: 'netLiabilitiesDeferredInflows', description: 'Auto-calculated net liabilities deferred inflows', type: 'Number', calculated: true },
        // Commitments and Contingencies
        { name: 'investedInCapitalAssets', description: 'Amount invested in capital assets', type: 'Number', required: false },
        { name: 'restrictedFederalFunds', description: 'Restricted federal funds', type: 'Number', required: false },
        { name: 'unrestricted', description: 'Unrestricted funds', type: 'Number', required: false },
        { name: 'totalNetPosition', description: 'Auto-calculated total net position', type: 'Number', calculated: true },
        { name: 'totalLiabilitiesDeferredNetPosition', description: 'Auto-calculated liabilities deferred net position', type: 'Number', calculated: true },
        // Liabilities Due Within One Year
        { name: 'accruedVacationDueWithinOneYear', description: 'Accrued vacation due within one year', type: 'Number', required: false },
        { name: 'workersCompensationDueWithinOneYear', description: 'Workers compensation due within one year', type: 'Number', required: false },
        { name: 'accruedRetirementPlanDueWithinOneYear', description: 'Accrued retirement plan due within one year', type: 'Number', required: false },
        { name: 'capitalLeaseObligationsDueWithinOneYear', description: 'Capital lease obligations due within one year', type: 'Number', required: false },
        { name: 'notesPayableBuildingADueWithinOneYear', description: 'Notes payable for Building A due within one year', type: 'Number', required: false },
        { name: 'netPensionLiabilityDueWithinOneYear', description: 'Pension liability due within one year', type: 'Number', required: false },
        { name: 'lineOfCreditBuildingADueWithinOneYear', description: 'Line of credit for Building A due within one year', type: 'Number', required: false },
        // Liabilities Due After One Year
        { name: 'accruedVacationDueAfterOneYear', description: 'Accrued vacation due after one year', type: 'Number', required: false },
        { name: 'notesPayableBuildingADueAfterOneYear', description: 'Notes payable for Building A due after one year', type: 'Number', required: false },
        { name: 'netPensionLiabilityDueAfterOneYear', description: 'Pension liability due after one year', type: 'Number', required: false },
      ],
    },

    budgetForm: {
      title: 'Budget Form CSV Schema',
      fields: [
        { name: 'year', description: 'Fiscal year for the budget', type: 'Number', required: true },
        { name: 'owner', description: 'Owner identifier', type: 'String', required: true },
        { name: 'profileId', description: 'Profile ID for the financial entity', type: 'String', required: true },
        // Revenue
        { name: 'fivePercent', description: 'Calculated five percent income', type: 'Number', required: false },
        { name: 'revenues', description: 'Total revenues', type: 'Number', required: false },
        { name: 'generalFund', description: 'General fund contributions', type: 'Number', required: false },
        { name: 'coreOperatingBudget', description: 'Core operating budget', type: 'Number', required: false },
        { name: 'totalRevenue', description: 'Auto-calculated field', type: 'Number', calculated: true },
        // Expense Categories
        { name: 'personnel', description: 'Personnel-related expenses', type: 'Number', required: false },
        { name: 'program', description: 'Program-related expenses', type: 'Number', required: false },
        { name: 'contracts', description: 'Contract expenses', type: 'Number', required: false },
        { name: 'grants', description: 'Grants provided', type: 'Number', required: false },
        { name: 'travel', description: 'Travel expenses', type: 'Number', required: false },
        { name: 'equipment', description: 'Equipment costs', type: 'Number', required: false },
        { name: 'overhead', description: 'Overhead expenses', type: 'Number', required: false },
        { name: 'debtService', description: 'Debt service expenses', type: 'Number', required: false },
        { name: 'other', description: 'Other miscellaneous expenses', type: 'Number', required: false },
        { name: 'totalExpenses', description: 'Auto-calculated total expenses', type: 'Number', calculated: true },
        // Admin Personnel and Fringe Benefits
        { name: 'salaryAdmin', description: 'Admin personnel salary', type: 'Number', required: false },
        { name: 'pensionAccumulationAdmin', description: 'Pension accumulation for admin', type: 'Number', required: false },
        { name: 'retireeHealthInsuranceAdmin', description: 'Health insurance for admin retirees', type: 'Number', required: false },
        { name: 'postEmploymentBenefitsAdmin', description: 'Post-employment benefits for admin', type: 'Number', required: false },
        { name: 'employeesHealthFundAdmin', description: 'Health fund for admin employees', type: 'Number', required: false },
        // Management Personnel and Fringe Benefits
        { name: 'salaryManagement', description: 'Management salary', type: 'Number', required: false },
        { name: 'pensionAccumulationManagement', description: 'Pension accumulation for management', type: 'Number', required: false },
        { name: 'retireeHealthInsuranceManagement', description: 'Health insurance for management retirees', type: 'Number', required: false },
        // Staff Personnel and Fringe Benefits
        { name: 'salaryStaff', description: 'Staff salary', type: 'Number', required: false },
        { name: 'pensionAccumulationStaff', description: 'Pension accumulation for staff', type: 'Number', required: false },
        { name: 'retireeHealthInsuranceStaff', description: 'Health insurance for staff retirees', type: 'Number', required: false },
        { name: 'salaryStaff', description: 'Salary for staff', type: 'Number', required: false },
        { name: 'pensionAccumulationStaff', description: 'Pension accumulation for staff', type: 'Number', required: false },
        { name: 'retireeHealthInsuranceStaff', description: 'Health insurance for retired staff', type: 'Number', required: false },
        { name: 'postEmploymentBenefitsStaff', description: 'Post-employment benefits for staff', type: 'Number', required: false },
        { name: 'employeesHealthFundStaff', description: 'Employee for staff health funds', type: 'Number', required: false },
        { name: 'socialSecurityStaff', description: 'Social Security for staff', type: 'Number', required: false },
        { name: 'medicareStaff', description: 'Medicare for staff', type: 'Number', required: false },
        { name: 'workersCompensationStaff', description: 'Workers compensation for staff', type: 'Number', required: false },
        { name: 'unemploymentCompensationStaff', description: 'Unemployment compensation for staff', type: 'Number', required: false },
        { name: 'pensionAdministrativeStaff', description: 'Pension for administrative staff', type: 'Number', required: false },
        // Surplus
        { name: 'management', description: 'Management', type: 'Number', required: false },
        { name: 'supportServices', description: 'Support Services', type: 'Number', required: false },
        { name: 'beneficiaryAdvocacy', description: 'Beneficiary advocacy', type: 'Number', required: false },
      ],
    },

    financialStatement: {
      title: 'Financial Statement CSV Schema',
      fields: [
        { name: 'year', description: 'Year for the financial statement', type: 'Number', required: true },
        { name: 'owner', description: 'Owner identifier', type: 'String', required: true },
        { name: 'profileId', description: 'Unique identifier for the profile', type: 'String', required: true },
        // Cash and Cash Equivalents
        { name: 'pettyCash', description: 'Amount in petty cash', type: 'Number', required: false },
        { name: 'cash', description: 'Cash on hand', type: 'Number', required: false },
        { name: 'cashInBanks', description: 'Cash in bank accounts', type: 'Number', required: false },
        { name: 'cashByInvestmentManager', description: 'Cash managed by investment manager', type: 'Number', required: false },
        { name: 'restrictedCash', description: 'Restricted cash amount', type: 'Number', required: false },
        { name: 'totalCashAndCashEquivalents', description: 'Auto-calculated; leave blank', type: 'Number', calculated: true },
        // Liabilities
        { name: 'accountsPayableAndAccruedLiabilities', description: 'Payable and accrued liabilities', type: 'Number', required: false },
        { name: 'dueToFund', description: 'Amount due to fund', type: 'Number', required: false },
        { name: 'longTermLiabilitiesWithinOneYear', description: 'Long-term liabilities within one year', type: 'Number', required: false },
        { name: 'longTermLiabilitiesAfterOneYear', description: 'Long-term liabilities after one year', type: 'Number', required: false },
        { name: 'totalLiabilities', description: 'Auto-calculated total liabilities', type: 'Number', calculated: true },
        // Net Assets
        { name: 'capitalAssetsRelatedDebt', description: 'Capital assets related debt', type: 'Number', required: false },
        { name: 'restrictedFederalFunds', description: 'Restricted federal funds', type: 'Number', required: false },
        { name: 'unrestricted', description: 'Unrestricted net assets', type: 'Number', required: false },
        { name: 'totalNetAssets', description: 'Auto-calculated total net assets', type: 'Number', calculated: true },
        { name: 'totalLiabilitiesNetAssets', description: 'Auto-calculated total liabilities and net assets', type: 'Number', calculated: true },
        // Program Revenues
        { name: 'chargesForService', description: 'Charges for services', type: 'Number', required: false },
        { name: 'operatingGrants', description: 'Operating grants received', type: 'Number', required: false },
        { name: 'interestAndInvestmentEarnings', description: 'Interest and investment earnings', type: 'Number', required: false },
        { name: 'totalProgramRevenues', description: 'Auto-calculated total program revenues', type: 'Number', calculated: true },
        // General Revenues
        { name: 'appropriationsNetLapses', description: 'Appropriations net lapses', type: 'Number', required: false },
        { name: 'trust', description: 'Trust income', type: 'Number', required: false },
        { name: 'interestAndInvestmentLosses', description: 'Interest and investment losses', type: 'Number', required: false },
        { name: 'newspaperAds', description: 'Income from newspaper ads', type: 'Number', required: false },
        { name: 'donationsAndOther', description: 'Other donations', type: 'Number', required: false },
        { name: 'totalGeneralRevenues', description: 'Auto-calculated total general revenues', type: 'Number', calculated: true },
        // Expenditures
        { name: 'management', description: 'Management expenses', type: 'Number', required: false },
        { name: 'supportServices', description: 'Support services expenses', type: 'Number', required: false },
        { name: 'beneficiaryAdvocacy', description: 'Beneficiary advocacy expenses', type: 'Number', required: false },
        { name: 'depreciation', description: 'Depreciation expense', type: 'Number', required: false },
        { name: 'llcA', description: 'LLC A expenses', type: 'Number', calculated: true },
        { name: 'llcBExpenditures', description: 'LLC B expenses', type: 'Number', required: false },
        { name: 'totalExpenses', description: 'Total expenses', type: 'Number', required: false },
        { name: 'expressRevenuesOverExpenditures', description: 'Express revenues over expenses', type: 'Number', required: false },
        { name: 'proceedsFromDebt', description: 'Proceeds from debt', type: 'Number', required: false },
        { name: 'proceedsFromCapital', description: 'Proceeds from capital', type: 'Number', calculated: true },
        { name: 'netTransfers', description: 'Net transfers', type: 'Number', required: false },
        { name: 'changeInNetAssets', description: 'Change in net assets', type: 'Number', required: false },
        // Fund Balance Inputs
        { name: 'beginningOfYear', description: 'Fund balance in the beginning of the year', type: 'Number', required: false },
        { name: 'restatementAdjustment', description: 'Restated adjustment', type: 'Number', required: false },
        { name: 'netPositionEndOfYear', description: 'Net position at the end of the year', type: 'Number', calculated: true },
      ],
    },
  },
  examples: `
    Example Format for Balance Sheet:
    year,owner,profileId,pettyCash,cash,cashInBanks,totalCashAndCashEquivalents
    2024,JohnDoe,profile123,500,2000,1500,

    Example Format for Budget Form:
    year,owner,profileId,fivePercent,revenues,generalFund,coreOperatingBudget,totalRevenue
    2024,JaneSmith,profile456,10000,50000,10000,30000,
  `,
};
