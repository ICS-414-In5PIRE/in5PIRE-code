import { createChartConfig } from './CreateChartConfig';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

const netPosition4yrDatasets = [
  [
    {
      dataPoints: [
        { y: [23650, 26555] }, // Error bars for the first data point
        { y: [16000, 19500] }, // Error bars for the second data point
        { y: [21750, 25900] }, // Error bars for the third data point
      ],
    },
  ], // Error bars for the first dataset
  'Assets', // Left y-axis title
  'Liabilities', // Right y-axis title
  'Net Position (4 Years)', // Chart title
];

const yearsOfSolvency4yrDatasets = [
  [
    {
      dataPoints: [
        { y: [23650, 26555] }, // Error bars for the first data point
        { y: [16000, 19500] }, // Error bars for the second data point
        { y: [21750, 25900] }, // Error bars for the third data point
      ],
    },
  ], // Error bars for the first dataset
  'Liquidity', // Left y-axis title
  'Opex (excluding lands)', // Right y-axis title
  'Years of Solvency (4 Years)', // Chart title
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
