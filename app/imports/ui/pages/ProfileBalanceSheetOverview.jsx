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
    console.log(`Profile ID in Overview: ${profileId}`);

    // Subscribe to balance sheet data for the given profileId
    const subscription = Meteor.subscribe('balanceSheet', profileId);
    console.log('Subscription created:', subscription);

    // Set up a Tracker to monitor the subscription and collection
    const tracker = Tracker.autorun(() => {
      console.log('Running Tracker autorun...');
      const ready = subscription.ready();
      console.log(`Checking if subscription is ready: ${ready}`);

      if (ready) {
        // Fetch all balance sheet data for the given profileId, sorted by year
        const balanceSheetData = BalanceSheetInputs.find({ profileId }, { sort: { year: 1 } }).fetch();
        console.log('Fetched balance sheet data:', balanceSheetData);

        setData(balanceSheetData);
        setIsLoading(false);
      }
    });

    // Cleanup the tracker when the component unmounts
    return () => {
      console.log('Cleaning up Tracker autorun...');
      tracker.stop();
    };
  }, [profileId]);

  if (isLoading) {
    console.log('Component is still loading...');
    return <Loader text="Loading balance sheet overview..." />;
  }

  if (data.length === 0) {
    console.log('No balance sheet data available for this profile.');
    return <Container><Header>No balance sheet data available for this profile.</Header></Container>;
  }

  // Get the list of years and fields dynamically from the fetched data
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
