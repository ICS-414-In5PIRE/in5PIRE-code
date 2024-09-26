import React, { useState } from 'react';
import { Segment, Container, Grid, Menu, Header, Card } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PAGE_IDS } from '../utilities/PageIDs';
import Snapshot from '../components/DashboardComponents/Snapshot';
import { yearsOfSolvency4yrConfig, netPosition4yrConfig, demandForCapital4yrConfig, financing4yrConfig, yearsOfSolvencyBasedOnCashFlow4yrConfig, budget4yrConfig } from '../components/DashboardComponents/4yrChartConfigs';
import { yearsOfSolvency8yrConfig, netPosition8yrConfig, demandForCapital8yrConfig, financing8yrConfig, yearsOfSolvencyBasedOnCashFlow8yrConfig, budget8yrConfig } from '../components/DashboardComponents/8yrChartConfigs';
import { yearsOfSolvency12yrConfig, netPosition12yrConfig, demandForCapital12yrConfig, financing12yrConfig, yearsOfSolvencyBasedOnCashFlow12yrConfig, budget12yrConfig } from '../components/DashboardComponents/12yrChartConfigs';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Snapshot');

  const handleTabChange = (e, { name }) => setActiveTab(name);

  const renderCharts = (configs) => (
    <Grid stackable columns={2}>
      {configs.map((config, index) => (
        <Grid.Column key={index}>
          <Card fluid>
            <Card.Content>
              <Header as="h5" textAlign="center">{config.title}</Header>
              <Line data={config.data} options={config.options} />
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  );

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
  const chartConfigs4Year = [
    { title: 'Net Position (4 Years)', data: netPosition4yrConfig.data, options: netPosition4yrConfig.options },
    { title: 'Years of Solvency (4 Years)', data: yearsOfSolvency4yrConfig.data, options: yearsOfSolvency4yrConfig.options },
    { title: 'Demand for Capital (4 Years)', data: demandForCapital4yrConfig.data, options: demandForCapital4yrConfig.options },
    { title: 'Financing (4 Years)', data: financing4yrConfig.data, options: financing4yrConfig.options },
    { title: 'Years of Solvency Based on Cash Flow (4 Years)', data: yearsOfSolvencyBasedOnCashFlow4yrConfig.data, options: yearsOfSolvencyBasedOnCashFlow4yrConfig.options },
    { title: 'Budget (4 Years)', data: budget4yrConfig.data, options: budget4yrConfig.options },
  ];

  const chartConfigs8Year = [
    { title: 'Net Position (8 Years)', data: netPosition8yrConfig.data, options: netPosition8yrConfig.options },
    { title: 'Years of Solvency (8 Years)', data: yearsOfSolvency8yrConfig.data, options: yearsOfSolvency8yrConfig.options },
    { title: 'Demand for Capital (8 Years)', data: demandForCapital8yrConfig.data, options: demandForCapital8yrConfig.options },
    { title: 'Financing (8 Years)', data: financing8yrConfig.data, options: financing8yrConfig.options },
    { title: 'Years of Solvency Based on Cash Flow (8 Years)', data: yearsOfSolvencyBasedOnCashFlow8yrConfig.data, options: yearsOfSolvencyBasedOnCashFlow8yrConfig.options },
    { title: 'Budget (8 Years)', data: budget8yrConfig.data, options: budget8yrConfig.options },
  ];

  const chartConfigs12Year = [
    { title: 'Net Position (12 Years)', data: netPosition12yrConfig.data, options: netPosition12yrConfig.options },
    { title: 'Years of Solvency (12 Years)', data: yearsOfSolvency12yrConfig.data, options: yearsOfSolvency12yrConfig.options },
    { title: 'Demand for Capital (12 Years)', data: demandForCapital12yrConfig.data, options: demandForCapital12yrConfig.options },
    { title: 'Financing (12 Years)', data: financing12yrConfig.data, options: financing12yrConfig.options },
    { title: 'Years of Solvency Based on Cash Flow (12 Years)', data: yearsOfSolvencyBasedOnCashFlow12yrConfig.data, options: yearsOfSolvencyBasedOnCashFlow12yrConfig.options },
    { title: 'Budget (12 Years)', data: budget12yrConfig.data, options: budget12yrConfig.options },
  ];

  return (
    <Container id={PAGE_IDS.DASHBOARD} style={{ marginTop: '2em' }}>
      <Grid centered>
        <Grid.Column width={16}>
          <Header as="h2" textAlign="center">
            Dashboard
          </Header>
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

          <Segment>
            {activeTab === 'Snapshot' && <Snapshot data={mockData} />}
            {activeTab === 'Dashboard 4 Year' && renderCharts(chartConfigs4Year)}
            {activeTab === 'Dashboard 8 Year' && renderCharts(chartConfigs8Year)}
            {activeTab === 'Dashboard 12 Year' && renderCharts(chartConfigs12Year)}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Dashboard;
