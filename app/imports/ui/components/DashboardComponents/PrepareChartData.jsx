import { createChartConfig } from './CreateChartConfig';

const prepareChartData = (financialData, numYears) => {
  const currentYear = new Date().getFullYear();
  // make array starting with next year of defined size length
  const years = Array.from({ length: numYears }, (_, i) => currentYear + 1 + i);

  // Filter financial data to only include data starting from `currentYear + 1`
  const alignedFinancialData = years.map(year => financialData.find(entry => entry.year === year) || {});

  return {
    netPositionConfig: createChartConfig(
      years,
      [
        {
          label: 'Assets',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.assets),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          yAxisID: 'y-axis-left',
        },
        {
          label: 'Liabilities',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.liabilities),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          yAxisID: 'y-axis-right',
        },
      ],
      'Assets',
      'Liabilities',
      `Net Position (${numYears} Years)`,
    ),
    yearsOfSolvencyConfig: createChartConfig(
      years,
      [
        {
          label: 'Liquidity',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.liquidity),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          yAxisID: 'y-axis-left',
        },
        {
          label: 'Opex',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.opex),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          yAxisID: 'y-axis-right',
        },
      ],
      'Liquidity',
      'Opex',
      `Years of Solvency (${numYears} Years)`,
    ),
    demandForCapitalConfig: createChartConfig(
      years,
      [
        {
          label: 'Liquidity',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.liquidity),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          yAxisID: 'y-axis-left',
        },
      ],
      'Liquidity',
      '',
      `Demand for Capital (${numYears} Years)`,
    ),
    financingConfig: createChartConfig(
      years,
      [
        {
          label: 'Cash on Hand',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.cashOnHand),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          yAxisID: 'y-axis-left',
        },
        {
          label: 'Debt',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.debt),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          yAxisID: 'y-axis-right',
        },
      ],
      'Cash on Hand',
      'Debt',
      `Financing (${numYears} Years)`,
    ),
    yearsOfSolvencyBasedOnCashFlowConfig: createChartConfig(
      years,
      [
        {
          label: 'Cash Inflow',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.cashFlow.inflow),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          yAxisID: 'y-axis-left',
        },
        {
          label: 'Cash Outflow',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.cashFlow.outflow),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          yAxisID: 'y-axis-right',
        },
      ],
      'Cash Inflow',
      'Cash Outflow',
      `Years of Solvency Based on Cash Flow (${numYears} Years)`,
    ),
    budgetConfig: createChartConfig(
      years,
      [
        {
          label: 'Budget',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.budget),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          yAxisID: 'y-axis-left',
        },
        {
          label: 'Actual vs Encumbrance',
          data: alignedFinancialData.slice(0, numYears).map(entry => entry.opex),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderDash: [5, 5],
          yAxisID: 'y-axis-right',
        },
      ],
      'Budget',
      'Actual vs Encumbrance',
      `Budget (${numYears} Years)`,
    ),
  };
};

export default prepareChartData;