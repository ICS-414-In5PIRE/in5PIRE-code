import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment, Container, Grid, Menu, Header, Card, Loader, Button } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';
import ProfileSnapshot from '../components/DashboardComponents/ProfileSnapshot';
import { PAGE_IDS } from '../utilities/PageIDs';
import { yearsOfSolvency4yrConfig, netPosition4yrConfig, demandForCapital4yrConfig, financing4yrConfig, yearsOfSolvencyBasedOnCashFlow4yrConfig, budget4yrConfig } from '../components/DashboardComponents/4yrChartConfigs';
import { yearsOfSolvency8yrConfig, netPosition8yrConfig, demandForCapital8yrConfig, financing8yrConfig, yearsOfSolvencyBasedOnCashFlow8yrConfig, budget8yrConfig } from '../components/DashboardComponents/8yrChartConfigs';
import { yearsOfSolvency12yrConfig, netPosition12yrConfig, demandForCapital12yrConfig, financing12yrConfig, yearsOfSolvencyBasedOnCashFlow12yrConfig, budget12yrConfig } from '../components/DashboardComponents/12yrChartConfigs';
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';
import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';
// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProfileDashboard = () => {
  const { profileId } = useParams(); // Use profileId from URL params
  const [activeTab, setActiveTab] = useState('ProfileSnapshot');
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // const { balanceSheetData, budgetFormData, financialStatementData, financialData, isLoading } = useTracker(() => {
  const { financialData, isLoading } = useTracker(() => {

    const balanceSheetHandle = Meteor.subscribe('balanceSheet', profileId);
    const budgetFormHandle = Meteor.subscribe('budgetform', profileId);
    const financialStatementHandle = Meteor.subscribe('auditedfs', profileId);
    const staticFinancialsHandle = Meteor.subscribe('staticFinancialsForProfile', profileId);

    const loading = !balanceSheetHandle.ready() || !budgetFormHandle.ready() || !financialStatementHandle.ready() || !staticFinancialsHandle.ready();

    return {
      balanceSheetData: BalanceSheetInputs.find({ profileId }).fetch(),
      budgetFormData: BudgetFormInput.find({ profileId }).fetch(),
      financialStatementData: FinancialStatementInput.find({ profileId }).fetch(),
      financialData: StaticFinancials.find({ profileId }).fetch(),
      isLoading: loading,
    };
  }, [profileId]);

  if (isLoading) {
    return <Loader text="Loading data..." />;
  }

  const handleUpdateDashboardData = () => {
    setUpdating(true); // Set updating state to true

    Meteor.call('staticFinancials.updateHistoricalData', { profileId }, (error, result) => {
      setUpdating(false); // Reset updating state

      if (error) {
        if (error.error === 'incomplete-data') {
          alert(`Dashboard update incomplete:\n${error.reason}`);
        } else {
          alert('Failed to update dashboard data due to an unexpected error. Check the console for details.');
        }
      } else {
        alert(result || 'Dashboard data updated successfully!');
      }
    });
  };
  const handleTabChange = (e, { name }) => setActiveTab(name);

  const handleBackToFinancialProfiles = () => {
    navigate('/financial-profiles');
  };

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

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while the data is being fetched
  }

  const formatFinancialData = (financialEntries) => {
    const formattedData = [];

    financialEntries.forEach((financial) => {
      Object.keys(financial).forEach((key) => {
        if (!['customerName', 'profileId', 'year', '_id', 'owner'].includes(key)) {
          // Handle nested fields individually for cashFlow and incrementalFringeBenefits
          if (key === 'cashFlow') {
            formattedData.push(
              { name: 'Cash Flow Inflow', year: financial.year, value: `$${financial[key].inflow.toLocaleString()}` },
              { name: 'Cash Flow Outflow', year: financial.year, value: `$${financial[key].outflow.toLocaleString()}` },
              { name: 'Cash Flow Net', year: financial.year, value: `$${financial[key].net.toLocaleString()}` },
            );
          } else if (key === 'incrementalFringeBenefits') {
            formattedData.push(
              { name: 'Fringe Benefits Admin', year: financial.year, value: `$${financial[key].admin.toLocaleString()}` },
              { name: 'Fringe Benefits Mgmt Staff', year: financial.year, value: `$${financial[key].mgmtStaff.toLocaleString()}` },
              { name: 'Fringe Benefits Mgmt', year: financial.year, value: `$${financial[key].mgmt.toLocaleString()}` },
            );
          } else {
            // Handle non-nested fields as before
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

  const snapshotData = formatFinancialData(financialData);

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
      <Button labelPosition="left" icon="left chevron" content="Back to Scenarios" onClick={handleBackToFinancialProfiles} />
      <Button onClick={handleUpdateDashboardData} loading={updating} disabled={updating}>
        {updating ? 'Updating...' : 'Update Dashboard Data'}
      </Button>
      <br />
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
            {activeTab === 'ProfileSnapshot' && <ProfileSnapshot data={snapshotData} />} {/* Use the real financial data */}
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
