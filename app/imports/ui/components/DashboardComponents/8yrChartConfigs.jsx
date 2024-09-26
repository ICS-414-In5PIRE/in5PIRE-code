import { createChartConfig } from './CreateChartConfig';

// data sets for 8 years
const netPosition8yrDatasets = [
  {
    label: 'Assets',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Liabilities',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const yearsOfSolvency8yrDatasets = [
  {
    label: 'Liquidity',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Opex (exclude lands)',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const demandForCapital8yrDatasets = [
  {
    label: 'Liquidity',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
];

const financing8yrDatasets = [
  {
    label: 'Cash on Hand',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Debt',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const yearsOfSolvencyBasedOnCashFlow8yrDatasets = [
  {
    label: 'Cash In-flow',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Cash Out-flow',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const budget8yrDatasets = [
  {
    label: 'Budget',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Actual vs Encumberance',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
    borderDash: [5, 5],
  },
];

export const netPosition8yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'],
  netPosition8yrDatasets,
  'Assets',
  'Liabilities',
  'Net Position (8 Years)',
);

export const yearsOfSolvency8yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
  yearsOfSolvency8yrDatasets, // Datasets
  'Liquidity', // Left y-axis title
  'Opex (excluding lands)', // Right y-axis title
  'Years of Solvency (8 Years)', // Chart title
);

export const demandForCapital8yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
  demandForCapital8yrDatasets, // Datasets
  'Liquidity', // Left y-axis title
  '', // Right y-axis title
  'Demand for Capital (8 Years)', // Chart title
);

export const financing8yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
  financing8yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Right y-axis title
  'Financing (8 Years)', // Chart title
);

export const yearsOfSolvencyBasedOnCashFlow8yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
  yearsOfSolvencyBasedOnCashFlow8yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Right y-axis title
  'Years of Solvency Based on Cash Flow (8 Years)', // Chart title
);

export const budget8yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
  budget8yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Right y-axis title
  'Budget (8 Years)', // Chart title
);
