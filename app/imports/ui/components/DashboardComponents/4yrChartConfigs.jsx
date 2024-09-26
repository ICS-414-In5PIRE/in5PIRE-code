import { createChartConfig } from './CreateChartConfig';

const netPosition4yrDatasets = [
  {
    label: 'Assets',
    data: [640866388, 672865961, 689525419, 698716700],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Liabilities',
    data: [107674223, 111343930, 141198657, 117607300],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const yearsOfSolvency4yrDatasets = [
  {
    label: 'Liquidity',
    data: [500000, 600000, 700000, 800000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Opex (exclude lands)',
    data: [200000, 250000, 300000, 350000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const demandForCapital4yrDatasets = [
  {
    label: 'Liquidity',
    data: [500000, 600000, 700000, 800000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
];

const financing4yrDatasets = [
  {
    label: 'Cash on Hand',
    data: [500000, 600000, 700000, 800000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Debt',
    data: [200000, 250000, 300000, 350000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];
const yearsOfSolvencyBasedOnCashFlow4yrDatasets = [
  {
    label: 'Cash In-flow',
    data: [500000, 600000, 700000, 800000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Cash Out-flow',
    data: [200000, 250000, 300000, 350000],
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    yAxisID: 'y-axis-right',
  },
];

const budget4yrDatasets = [
  {
    label: 'Budget',
    data: [500000, 600000, 700000, 800000],
    borderColor: 'blue',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    yAxisID: 'y-axis-left',
  },
  {
    label: 'Actual vs Encumberance',
    data: [200000, 250000, 300000, 350000],
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
