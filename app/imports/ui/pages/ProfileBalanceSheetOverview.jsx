import React, { useEffect, useState } from 'react';
import { Table, Container, Header, Button, Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { useParams, useNavigate } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
import Loader from '../components/Loader';
import { PAGE_IDS } from '../utilities/PageIDs';
import { exportToExcel } from '../utilities/ExportData';

const ProfileBalanceSheetOverview = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backToDataInput = () => {
    navigate(`/balance-sheet/${profileId}`);
  };

  // Function to handle exporting the table to Excel
  const handleExportToExcel = () => {
    exportToExcel(fields, years, data, "BalanceSheetOverview");
  };

  useEffect(() => {
    // Subscribe to balance sheet data for the given profileId
    const subscription = Meteor.subscribe('BalanceSheet', profileId);

    // Set up a Tracker to monitor the subscription and collection
    const tracker = Tracker.autorun(() => {
      const ready = subscription.ready();

      if (ready) {
        // Fetch all balance sheet data for the given profileId, sorted by year
        const balanceSheetData = BalanceSheetInputs.find({ profileId }, { sort: { year: 1 } }).fetch();

        setData(balanceSheetData);
        setIsLoading(false);
      }
    });

    return () => {
      tracker.stop();
    };
  }, [profileId]);

  if (isLoading) {
    return <Loader text="Loading balance sheet overview..." />;
  }

  if (data.length === 0) {
    return (
      <Container>
        <br />
        <Header>No balance sheet data available for this profile.</Header>
        <Button primary onClick={backToDataInput}>
          Back to Data Input
        </Button>
      </Container>
    );
  }

  // Get the years from the data
  const years = data.map(item => item.year);
  const fields = Object.keys(data[0]).filter(field => field !== '_id' && field !== 'owner' && field !== 'profileId' && field !== 'year');

  return (
    <Container id={PAGE_IDS.PROFILE_BALANCE_SHEET_OVERVIEW}>
      <br />
      <Grid.Column className="pt-3" textAlign="left">
        <Button labelPosition="left" icon="left chevron" content="Back to Data Input" onClick={backToDataInput} />
        <Button labelPosition="right" className="ui right floated green" icon="download" content="Export to Excel" onClick={handleExportToExcel} />
      </Grid.Column>
      <Header as="h2">Balance Sheet Overview</Header>
      <hr />
      <br />
      <div className="overview-table">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Field</Table.HeaderCell>
              {years.map(year => (
                <Table.HeaderCell key={year}>{year}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {fields.map(field => (
              <Table.Row key={field}>
                <Table.Cell>{field}</Table.Cell>
                {data.map(entry => (
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

export default ProfileBalanceSheetOverview;
