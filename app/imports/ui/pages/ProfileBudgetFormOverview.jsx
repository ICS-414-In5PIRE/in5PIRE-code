import React, { useEffect, useState } from 'react';
import { Table, Container, Header, Button, Grid, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { useParams, useNavigate } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import Loader from '../components/Loader';
import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

const ProfileBudgetFormOverview = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [data, setData] = useState([]);
  const [calculatedFields, setCalculatedFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backToDataInput = () => {
    navigate(`/budget-form/${profileId}`);
  };

  useEffect(() => {
    const subscription = Meteor.subscribe('BudgetForm', profileId);

    const tracker = Tracker.autorun(() => {
      const ready = subscription.ready();

      if (ready) {
        const budgetFormData = BudgetFormInput.find({ profileId }, { sort: { year: 1 } }).fetch();

        // Extract calculated fields for display in a separate box
        const calculatedFieldsData = budgetFormData.map(({
          totalRevenue,
          totalExpenses,
          surplusDeficit,
          personnelAndFringeAdmin,
          fringeBenefitsAdmin,
          personnelAndFringeManagement,
          fringeBenefitsManagement,
          fringeBenefitsStaff,
          personnelAndFringeStaff,
          year,
        }) => ({
          year,
          totalRevenue,
          totalExpenses,
          surplusDeficit,
          personnelAndFringeAdmin,
          fringeBenefitsAdmin,
          personnelAndFringeManagement,
          fringeBenefitsManagement,
          fringeBenefitsStaff,
          personnelAndFringeStaff,
        }));

        setCalculatedFields(calculatedFieldsData);

        // Filter out calculated fields for the main table
        const filteredData = budgetFormData.map((item) => {
          const { totalRevenue, totalExpenses, surplusDeficit, personnelAndFringeAdmin,
            fringeBenefitsAdmin, personnelAndFringeManagement, fringeBenefitsManagement, fringeBenefitsStaff, personnelAndFringeStaff, ...rest } = item;
          return rest;
        });

        setData(filteredData);
        setIsLoading(false);
      }
    });

    return () => {
      tracker.stop();
    };
  }, [profileId]);

  if (isLoading) {
    return <Loader text="Loading budget form overview..." />;
  }

  if (data.length === 0) {
    return (
      <Container>
        <br />
        <Header>No budget form data available for this profile.</Header>
        <Button primary onClick={backToDataInput}>
          Back to Data Input
        </Button>
      </Container>
    );
  }

  // Get the years from the data
  const years = data.map((item) => item.year);
  const fields = Object.keys(data[0]).filter(
    (field) => field !== '_id' && field !== 'owner' && field !== 'profileId' && field !== 'year',
  );

  return (
    <Container id={PAGE_IDS.PROFILE_BUDGET_FORM_OVERVIEW}>
      <Grid.Column className="pt-3" textAlign="left">
        <Button labelPosition="left" icon="left chevron" content="Back to Data Input" onClick={backToDataInput} />
      </Grid.Column>
      <Header as="h2">Budget Form Overview</Header>
      <hr />
      <br />
      {/* Summary Box for Calculated Fields */}
      <Segment>
        <Header as="h3">Summary of Calculated Fields</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Total Revenue</Table.HeaderCell>
              <Table.HeaderCell>Total Expenses</Table.HeaderCell>
              <Table.HeaderCell>Surplus/Deficit</Table.HeaderCell>
              <Table.HeaderCell>Admin Personnel & Fringe</Table.HeaderCell>
              <Table.HeaderCell>Admin Fringe Benefits</Table.HeaderCell>
              <Table.HeaderCell>Management Personnel & Fringe</Table.HeaderCell>
              <Table.HeaderCell>Management Fringe Benefits</Table.HeaderCell>
              <Table.HeaderCell>Staff Fringe Benefits</Table.HeaderCell>
              <Table.HeaderCell>Staff Personnel & Fringe</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {calculatedFields.map((entry) => (
              <Table.Row key={entry.year}>
                <Table.Cell>{entry.year}</Table.Cell>
                <Table.Cell>{entry.totalRevenue}</Table.Cell>
                <Table.Cell>{entry.totalExpenses}</Table.Cell>
                <Table.Cell>{entry.surplusDeficit}</Table.Cell>
                <Table.Cell>{entry.personnelAndFringeAdmin}</Table.Cell>
                <Table.Cell>{entry.fringeBenefitsAdmin}</Table.Cell>
                <Table.Cell>{entry.personnelAndFringeManagement}</Table.Cell>
                <Table.Cell>{entry.fringeBenefitsManagement}</Table.Cell>
                <Table.Cell>{entry.fringeBenefitsStaff}</Table.Cell>
                <Table.Cell>{entry.personnelAndFringeStaff}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
      <br />
      {/* Main Table */}
      <div className="overview-table">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Field</Table.HeaderCell>
              {years.map((year) => (
                <Table.HeaderCell key={year}>{year}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {fields.map((field) => (
              <Table.Row key={field}>
                <Table.Cell>{field}</Table.Cell>
                {data.map((entry) => (
                  <Table.Cell key={`${field}-${entry.year}`}>
                    {entry[field] !== undefined ? entry[field] : 'N/A'}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Container>
  );
};

export default ProfileBudgetFormOverview;
