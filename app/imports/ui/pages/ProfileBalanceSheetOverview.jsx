import React, { useEffect, useState } from 'react';
import { Table, Container, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { Tracker } from 'meteor/tracker'; // Importing Tracker from meteor/tracker
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputsCollection';
import Loader from '../components/Loader';

const ProfileBalanceSheetOverview = () => {
  const { profileId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to balance sheet data for the given profileId
    const subscription = Meteor.subscribe('balanceSheet', profileId);

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
    return <Container><Header>No balance sheet data available for this profile.</Header></Container>;
  }

  // Get the years from the data
  const years = data.map(item => item.year);
  const fields = Object.keys(data[0]).filter(field => field !== '_id' && field !== 'owner' && field !== 'profileId' && field !== 'year');

  return (
    <Container>
      <Header as="h2">Balance Sheet Overview</Header>
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
    </Container>
  );
};

export default ProfileBalanceSheetOverview;
