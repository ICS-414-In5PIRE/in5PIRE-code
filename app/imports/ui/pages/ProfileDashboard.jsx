import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment, Container, Grid, Menu, Header, Card, Loader, Button, Icon } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';
import ProfileSnapshot from '../components/DashboardComponents/ProfileSnapshot';
import { PAGE_IDS } from '../utilities/PageIDs';
// import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
// import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';
// import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';
import { generateDashboardProjections } from '../components/DashboardComponents/generateDashboardProjections';
import prepareChartData from '../components/DashboardComponents/PrepareChartData';

// This page is a fork of dashboard.jsx and seeks to dynamically allocate values of the years 2020-2024 as defined
// in 'staticFinancials.updateHistoricalData' in methods.js
// It then seeks to dynamically generate 12 years of projections using generateDashboardProjections.js, which relies on
// formulas in dashboardProjectionFormulas.js. The formulas are not currently complete and are placeholders

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProfileDashboard = () => {
  const { profileId } = useParams();
  const [activeTab, setActiveTab] = useState('ProfileSnapshot');
  const [loadingProjections, setLoadingProjections] = useState(false);
  const navigate = useNavigate();

  const { financialData, isLoading } = useTracker(() => {
    const balanceSheetHandle = Meteor.subscribe('defaultBalanceSheetData', profileId);
    const budgetFormHandle = Meteor.subscribe('defaultBudgetFormInput', profileId);
    const financialStatementHandle = Meteor.subscribe('defaultFinancialStatementData', profileId);
    const staticFinancialsHandle = Meteor.subscribe('staticFinancialsForProfile', profileId);
    const username = Meteor.user()?.username;

    const loading =
      !balanceSheetHandle.ready() ||
      !budgetFormHandle.ready() ||
      !financialStatementHandle.ready() ||
      !staticFinancialsHandle.ready();

    return {
      financialData: StaticFinancials.find({ owner: username, profileId }).fetch(),
      isLoading: loading,
    };
  }, [profileId]);

  if (isLoading) {
    return <Loader text="Loading data..." />;
  }

  const handleTabChange = (e, { name }) => setActiveTab(name);

  const renderCharts = (configs) => (
    <Grid stackable columns={2}>
      {Object.keys(configs).map((key, index) => (
        <Grid.Column key={index}>
          <Card fluid>
            <Card.Content>
              <Header as="h5" textAlign="center">{configs[key].options.plugins.title.text}</Header>
              <Line data={configs[key].data} options={configs[key].options} />
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  );

  const formatFinancialData = (financialEntries) => {
    const formattedData = [];
    financialEntries.forEach((financial) => {
      Object.keys(financial).forEach((key) => {
        if (!['customerName', 'profileId', 'year', '_id', 'owner'].includes(key)) {
          if (key === 'cashFlow') {
            formattedData.push(
              { name: 'Cash Flow Inflow', year: financial.year, value: `$${financial[key].inflow.toLocaleString()}` },
              { name: 'Cash Flow Outflow', year: financial.year, value: `$${financial[key].outflow.toLocaleString()}` },
              { name: 'Net Cash Flow', year: financial.year, value: `$${financial[key].net.toLocaleString()}` },
            );
          } else if (key === 'incrementalFringeBenefits') {
            formattedData.push(
              { name: 'Admin', year: financial.year, value: `$${financial[key].admin.toLocaleString()}` },
              { name: 'Management Staff', year: financial.year, value: `$${financial[key].mgmtStaff.toLocaleString()}` },
              { name: 'Management', year: financial.year, value: `$${financial[key].mgmt.toLocaleString()}` },
            );
          } else {
            formattedData.push({
              name: key,
              year: financial.year,
              value: `$${financial[key].toLocaleString()}`,
            });
          }
        }
      });
    });
    return formattedData;
  };

  const handleGenerateProjections = async () => {
    setLoadingProjections(true);
    try {
      await generateDashboardProjections(profileId);
      alert('12-year projections generated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to generate projections.');
    } finally {
      setLoadingProjections(false);
    }
  };

  const snapshotData = formatFinancialData(financialData);
  const chartConfigs4Year = prepareChartData(financialData, 4);
  const chartConfigs8Year = prepareChartData(financialData, 8);
  const chartConfigs12Year = prepareChartData(financialData, 12);

  return (
    <Container id={PAGE_IDS.DASHBOARD} style={{ marginTop: '2em' }}>
      <Grid.Column textAlign="left">
        <Button labelPosition="left" icon="left chevron" content="Back to Scenarios" onClick={() => navigate('/financial-profiles')} />
        <Button color="green" onClick={handleGenerateProjections} loading={loadingProjections} disabled={loadingProjections}>
          Generate 12-Year Projections
        </Button>
      </Grid.Column>
      <Grid centered>
        <Grid.Column width={16}>
          <Header as="h2" textAlign="center">
            Dashboard
          </Header>
          <hr />
          <Menu pointing secondary>
            <Menu.Item
              name="ProfileSnapshot"
              active={activeTab === 'ProfileSnapshot'}
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
            {activeTab === 'ProfileSnapshot' && <ProfileSnapshot data={snapshotData} />}
            {activeTab === 'Dashboard 4 Year' && renderCharts(chartConfigs4Year)}
            {activeTab === 'Dashboard 8 Year' && renderCharts(chartConfigs8Year)}
            {activeTab === 'Dashboard 12 Year' && renderCharts(chartConfigs12Year)}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default ProfileDashboard;
