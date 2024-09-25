import React, { useState } from 'react';
import { Segment, Container, Grid, Menu, Header } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PAGE_IDS } from '../utilities/PageIDs';
import Snapshot from '../components/DashboardComponents/Snapshot';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('Snapshot');

  // Handle tab change
  const handleTabChange = (e, { name }) => setActiveTab(name);

  // Mock data for the Snapshot component
  const mockData = [
    { name: 'Assets', value: '$' },
    { name: 'Liabilities', value: '$' },
    { name: 'Net Position', value: '$' },
    { name: 'Cash on Hand', value: '$' },
    { name: 'Investment', value: '$' },
    { name: 'Liquidity', value: '$' },
    { name: 'Debt', value: '$' },
    { name: 'Revenues', value: '$' },
    { name: 'Opex', value: '$' },
    { name: 'Net Income', value: '$' },
    { name: 'Cash Inflow', value: '$' },
  ];

  const createChartConfig = (labels, datasets, leftAxisTitle, rightAxisTitle, chartTitle) => ({
    data: {
      labels,
      datasets,
    },
    options: {
      scales: {
        'y-axis-left': {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: leftAxisTitle,
          },
          ticks: {
            beginAtZero: true,
          },
        },
        'y-axis-right': {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: rightAxisTitle,
          },
          ticks: {
            beginAtZero: true,
          },
          grid: {
            drawOnChartArea: false, // Prevent grid overlap
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: chartTitle,
        },
      },
    },
  });

  // Datasets for 4 years
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
    },
  ];

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
    },
  ];

  // Data sets for 12 years
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

  const budget12yrDatasets = [
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

  // Create chart configurations using the reusable function
  const netPosition4yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
    netPosition4yrDatasets, // Datasets
    'Assets', // Left y-axis title
    'Liabilities', // Right y-axis title
    'Net Position (4 Years)', // Chart title
  );

  const yearsOfSolvency4yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
    yearsOfSolvency4yrDatasets, // Datasets
    'Liquidity', // Left y-axis title
    'Opex (excluding lands)', // Right y-axis title
    'Years of Solvency (4 Years)', // Chart title
  );

  const demandForCapital4yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
    demandForCapital4yrDatasets, // Datasets
    'Liquidity', // Left y-axis title
    'Years of Solvency (4 Years)', // Chart title
    'Demand for Capital (4 Years)', // Chart title
  );

  const financing4yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
    financing4yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Chart title
    'Financing (4 Years)',
  );

  const yearsOfSolvencyBasedOnCashFlow4yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
    yearsOfSolvencyBasedOnCashFlow4yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Chart title
    'Years of Solvency Based on Cash Flow (4 Years)',
  );

  const budget4yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Labels
    budget4yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Chart title
    'Budget (4 years)',
  );

  // 8 Year grpahs
  const netPosition8yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'],
    netPosition8yrDatasets,
    'Assets',
    'Liabilities',
    'Net Position (8 Years)',
  );

  const yearsOfSolvency8yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
    yearsOfSolvency8yrDatasets, // Datasets
    'Liquidity', // Left y-axis title
    'Opex (excluding lands)', // Right y-axis title
    'Years of Solvency (8 Years)', // Chart title
  );

  const demandForCapital8yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
    demandForCapital8yrDatasets, // Datasets
    'Liquidity', // Left y-axis title
    'Years of Solvency (8 Years)', // Right y-axis title
    'Demand for Capital (8 Years)', // Chart title
  );

  const financing8yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
    financing8yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Right y-axis title
    'Financing (8 Years)', // Chart title
  );

  const yearsOfSolvencyBasedOnCashFlow8yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
    yearsOfSolvencyBasedOnCashFlow8yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Right y-axis title
    'Years of Solvency Based on Cash Flow (8 Years)', // Chart title
  );

  const budget8yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Labels
    budget8yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Right y-axis title
    'Budget (8 Years)', // Chart title
  );

  // 12 year graphs
  const netPosition12yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'],
    netPosition12yrDatasets,
    'Assets',
    'Liabilities',
    'Net Position (12 Years)',
  );

  const yearsOfSolvency12yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
    yearsOfSolvency12yrDatasets, // Datasets
    'Liquidity', // Left y-axis title
    'Opex (excluding lands)', // Right y-axis title
    'Years of Solvency (12 Years)', // Chart title
  );

  const demandForCapital12yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
    demandForCapital12yrDatasets, // Datasets
    'Liquidity', // Left y-axis title
    'Opex (excluding lands)', // Right y-axis title
    'Demand for Capital (12 Years)', // Chart title
  );

  const financing12yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
    financing12yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Right y-axis title
    'Financing (12 Years)', // Chart title
  );

  const yearsOfSolvencyBasedOnCashFlow12yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
    yearsOfSolvencyBasedOnCashFlow12yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Right y-axis title
    'Years of Solvency Based on Cash Flow (12 Years)', // Chart title
  );

  const budget12yrConfig = createChartConfig(
    ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Labels
    budget12yrDatasets, // Datasets
    'Cash on Hand', // Left y-axis title
    'Debt', // Right y-axis title
    'Budget (12 Years)', // Chart title
  );

  return (
    <Container id={PAGE_IDS.DASHBOARD} style={{ marginTop: '2em' }}>
      <Grid centered>
        <Grid.Column width={16}>
          <Header as="h2" textAlign="center">
            Dashboard
          </Header>
          {/* Tab Navigation */}
          <Menu pointing secondary>
            <Menu.Item
              name="Snapshot"
              active={activeTab === 'Snapshot'}
              onClick={handleTabChange}
            />
            <Menu.Item
              name="Dashboard 4 Year"
              active={activeTab === 'Dashboard 4 Year'}
              onClick={handleTabChange}
            />
            <Menu.Item
              name="Dashboard 8 Year"
              active={activeTab === 'Dashboard 8 Year'}
              onClick={handleTabChange}
            />
            <Menu.Item
              name="Dashboard 12 Year"
              active={activeTab === 'Dashboard 12 Year'}
              onClick={handleTabChange}
            />
          </Menu>

          {/* Tab Content */}
          <Segment>
            {activeTab === 'Snapshot' && <Snapshot data={mockData} />}
            {activeTab === 'Dashboard 4 Year' && (
              <div>
                <Header as="h4">Dashboard 4 Year</Header>
                <Line data={netPosition4yrConfig.data} options={netPosition4yrConfig.options} />
                <Line data={yearsOfSolvency4yrConfig.data} options={yearsOfSolvency4yrConfig.options} />
                <Line data={demandForCapital4yrConfig.data} options={demandForCapital4yrConfig.options} />
                <Line data={financing4yrConfig.data} options={financing4yrConfig.options} />
                <Line data={yearsOfSolvencyBasedOnCashFlow4yrConfig.data} options={yearsOfSolvencyBasedOnCashFlow4yrConfig.options} />
                <Line data={budget4yrConfig.data} options={budget4yrConfig.options} />
              </div>
            )}
            {activeTab === 'Dashboard 8 Year' && (
              <div>
                <Header as="h4">Dashboard 8 Year</Header>
                <Line data={netPosition8yrConfig.data} options={netPosition8yrConfig.options} />
                <Line data={yearsOfSolvency8yrConfig.data} options={yearsOfSolvency8yrConfig.options} />
                <Line data={demandForCapital8yrConfig.data} options={demandForCapital8yrConfig.options} />
                <Line data={financing8yrConfig.data} options={financing8yrConfig.options} />
                <Line data={yearsOfSolvencyBasedOnCashFlow8yrConfig.data} options={yearsOfSolvencyBasedOnCashFlow8yrConfig.options} />
                <Line data={budget8yrConfig.data} options={budget8yrConfig.options} />

              </div>
            )}
            {activeTab === 'Dashboard 12 Year' && (
              <div>
                <Header as="h4">Dashboard 12 Year</Header>
                <Line data={netPosition12yrConfig.data} options={netPosition12yrConfig.options} />
                <Line data={yearsOfSolvency12yrConfig.data} options={yearsOfSolvency12yrConfig.options} />
                <Line data={demandForCapital12yrConfig.data} options={demandForCapital12yrConfig.options} />
                <Line data={financing12yrConfig.data} options={financing12yrConfig.options} />
                <Line data={yearsOfSolvencyBasedOnCashFlow12yrConfig.data} options={yearsOfSolvencyBasedOnCashFlow12yrConfig.options} />
                <Line data={budget12yrConfig.data} options={budget12yrConfig.options} />

              </div>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Dashboard;
