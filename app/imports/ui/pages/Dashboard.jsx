import React, { useState } from 'react';
import { Segment, Container, Grid, Menu, Header } from 'semantic-ui-react';
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
