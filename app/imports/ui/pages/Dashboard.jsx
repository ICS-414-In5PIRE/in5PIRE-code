import React, { useState } from 'react';
import { Segment, Container, Grid, Menu, Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import Snapshot from '../components/DashboardComponents/Snapshot';

/**
 * Dashboard page.
 */

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
            {activeTab === 'Snapshot' && (
              <Snapshot data={mockData} />
            )}
            {activeTab === 'Dashboard 4 Year' && (
              <div>
                {/* Future content for Dashboard 4 Year */}
                <Header as="h4">Dashboard 4 Year</Header>
                <p>Content for Dashboard 4 Year will be here.</p>
              </div>
            )}
            {activeTab === 'Dashboard 8 Year' && (
              <div>
                {/* Future content for Dashboard 8 Year */}
                <Header as="h4">Dashboard 8 Year</Header>
                <p>Content for Dashboard 8 Year will be here.</p>
              </div>
            )}
            {activeTab === 'Dashboard 12 Year' && (
              <div>
                {/* Future content for Dashboard 12 Year */}
                <Header as="h4">Dashboard 12 Year</Header>
                <p>Content for Dashboard 12 Year will be here.</p>
              </div>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Dashboard;
