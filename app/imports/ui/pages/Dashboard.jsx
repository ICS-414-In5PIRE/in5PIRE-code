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

  // Mock data to pass to the Snapshot component
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
  // Data and options for the first graph (Net Position) - 4 Years
  const chartData4yr = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Example years
    datasets: [
      {
        label: 'Assets',
        data: [500000, 600000, 700000, 800000], // Example assets data for 4 years
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        yAxisID: 'y-axis-left',
      },
      {
        label: 'Liabilities',
        data: [200000, 250000, 300000, 350000], // Example liabilities data for 4 years
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        yAxisID: 'y-axis-right',
      },
    ],
  };

  const chartOptions4yr = {
    scales: {
      'y-axis-left': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Assets',
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
          text: 'Liabilities',
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
        text: 'Net Position (4 Years)',
      },
    },
  };

  // Data and options for the 8-year graph
  const chartData8yr = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'], // Example years for 8 years
    datasets: [
      {
        label: 'Assets',
        data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000], // Example assets data for 8 years
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        yAxisID: 'y-axis-left',
      },
      {
        label: 'Liabilities',
        data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000], // Example liabilities data for 8 years
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        yAxisID: 'y-axis-right',
      },
    ],
  };

  const chartOptions8yr = {
    scales: {
      'y-axis-left': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Assets',
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
          text: 'Liabilities',
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
        text: 'Net Position (8 Years)',
      },
    },
  };

  // Data and options for the 12-year graph
  const chartData12yr = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'], // Example years for 12 years
    datasets: [
      {
        label: 'Assets',
        data: [500000, 600000, 700000, 800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000], // Example assets data for 12 years
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        yAxisID: 'y-axis-left',
      },
      {
        label: 'Liabilities',
        data: [200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000], // Example liabilities data for 12 years
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        yAxisID: 'y-axis-right',
      },
    ],
  };

  const chartOptions12yr = {
    scales: {
      'y-axis-left': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Assets',
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
          text: 'Liabilities',
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
        text: 'Net Position (12 Years)',
      },
    },
  };

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
                {/* First Graph: Net Position for 4 Years */}
                <Line data={chartData4yr} options={chartOptions4yr} />
                {/* You can add 5 more charts here for the 4-year tab */}
              </div>
            )}
            {activeTab === 'Dashboard 8 Year' && (
              <div>
                <Header as="h4">Dashboard 8 Year</Header>
                {/* First Graph: Net Position for 8 Years */}
                <Line data={chartData8yr} options={chartOptions8yr} />
                {/* You can add 5 more charts here for the 8-year tab */}
              </div>
            )}
            {activeTab === 'Dashboard 12 Year' && (
              <div>
                <Header as="h4">Dashboard 12 Year</Header>
                {/* First Graph: Net Position for 12 Years */}
                <Line data={chartData12yr} options={chartOptions12yr} />
                {/* You can add 5 more charts here for the 12-year tab */}
              </div>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Dashboard;
