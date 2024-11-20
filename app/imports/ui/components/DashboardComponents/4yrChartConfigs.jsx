import { createChartConfig } from './CreateChartConfig';

const netPosition4yrDatasets = [
  {
    label: 'Assets',
    data: [369418004, 403370308, 422605819, 432669418],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Liabilities',
    data: [72700000, 69700000, 66193142, 41686285],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
  {
    label: 'Volatility',
    data: [367016787, 400748401, 419858881, 429857066.8],
    borderColor: 'green',
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    yAxisID: 'y-axis-left',
  },
];

const yearsOfSolvency4yrDatasets = [
  {
    label: 'Liquidity',
    data: [369418004, 403370308, 422605819, 432669418],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Opex (exclude lands)',
    data: [35860814.66, 34998258.59, 35603263, 36014771],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const demandForCapital4yrDatasets = [
  {
    label: 'Liquidity',
    data: [369418004, 403370308, 422605819, 432669418],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
];

const financing4yrDatasets = [
  {
    label: 'Cash on Hand',
    data: [369418004, 403370308, 422605819, 432669418],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Debt',
    data: [72700000, 69700000, 66193142, 41686285],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const yearsOfSolvencyBasedOnCashFlow4yrDatasets = [
  {
    label: 'Cash In-flow',
    data: [36140210, 36587523, 35693705, 35567019],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Cash Out-flow',
    data: [35860814.66, 34998258.59, 35603263, 36014771],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const budget4yrDatasets = [
  {
    label: 'Budget',
    data: [36140210, 36587523, 35693705, 35567019],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Actual vs Encumberance',
    data: [35860814.66, 34998258.59, 35603263, 36014771],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
    borderDash: [5, 5],
  },
];

// Create chart configurations using the reusable function
export const netPosition4yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
  netPosition4yrDatasets, // Datasets
  'Assets', // Left y-axis title
  'Liabilities', // Right y-axis title
  'Net Position (4 Years)', // Chart title
);

export const yearsOfSolvency4yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
  yearsOfSolvency4yrDatasets, // Datasets
  'Liquidity', // Left y-axis title
  'Opex (excluding lands)', // Right y-axis title
  'Years of Solvency (4 Years)', // Chart title
);

export const demandForCapital4yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
  demandForCapital4yrDatasets, // Datasets
  'Liquidity', // Left y-axis title
  '', // Chart title
  'Demand for Capital (4 Years)', // Chart title
);

export const financing4yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
  financing4yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Chart title
  'Financing (4 Years)',
);

export const yearsOfSolvencyBasedOnCashFlow4yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
  yearsOfSolvencyBasedOnCashFlow4yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Chart title
  'Years of Solvency Based on Cash Flow (4 Years)',
);

export const budget4yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
  budget4yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Chart title
  'Budget (4 years)',
);
