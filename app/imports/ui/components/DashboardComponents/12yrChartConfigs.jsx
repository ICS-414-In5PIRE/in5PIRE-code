import { createChartConfig } from './CreateChartConfig';

const netPosition12yrDatasets = [
  {
    label: 'Assets',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Liabilities',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const yearsOfSolvency12yrDatasets = [
  {
    label: 'Liquidity',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Opex (exclude lands)',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const demandForCapital12yrDatasets = [
  {
    label: 'Liquidity',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
];

const financing12yrDatasets = [
  {
    label: 'Cash on Hand',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Debt',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const yearsOfSolvencyBasedOnCashFlow12yrDatasets = [
  {
    label: 'Cash In-flow',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Cash Out-flow',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

export const budget12yrDatasets = [
  {
    label: 'Budget',
    data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Actual vs Encumberance',
    data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];
export const netPosition12yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'],
  netPosition12yrDatasets,
  'Assets',
  'Liabilities',
  'Net Position (12 Years)',
);

export const yearsOfSolvency12yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
  yearsOfSolvency12yrDatasets, // Datasets
  'Liquidity', // Left y-axis title
  'Opex (excluding lands)', // Right y-axis title
  'Years of Solvency (12 Years)', // Chart title
);

export const demandForCapital12yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
  demandForCapital12yrDatasets, // Datasets
  'Liquidity', // Left y-axis title
  'Opex (excluding lands)', // Right y-axis title
  'Demand for Capital (12 Years)', // Chart title
);

export const financing12yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
  financing12yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Right y-axis title
  'Financing (12 Years)', // Chart title
);

export const yearsOfSolvencyBasedOnCashFlow12yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
  yearsOfSolvencyBasedOnCashFlow12yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Right y-axis title
  'Years of Solvency Based on Cash Flow (12 Years)', // Chart title
);

export const budget12yrConfig = createChartConfig(
  ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
  budget12yrDatasets, // Datasets
  'Cash on Hand', // Left y-axis title
  'Debt', // Right y-axis title
  'Budget (12 Years)', // Chart title
);
