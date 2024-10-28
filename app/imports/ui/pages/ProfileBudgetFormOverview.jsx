import React, { useEffect, useState } from 'react';
import { Table, Container, Header, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { useParams, useNavigate } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import Loader from '../components/Loader';
import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';

const ProfileBudgetFormOverview = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backToDataInput = () => {
    navigate(`/budget-form/${profileId}`);
  };

  useEffect(() => {
    // Subscribe to budget form data for the given profileId
    const subscription = Meteor.subscribe('budgetform', profileId);

    // Set up a Tracker to monitor the subscription and collection
    const tracker = Tracker.autorun(() => {
      const ready = subscription.ready();

      if (ready) {
        // Fetch all budget sheet data for the given profileId, sorted by year
        const budgetFormData = BudgetFormInput.find({ profileId }, { sort: { year: 1 } }).fetch();

        setData(budgetFormData);
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
    return <Container><Header>No budget form data available for this profile.</Header></Container>;
  }

  // Get the years from the data
  const years = data.map(item => item.year);
  const fields = Object.keys(data[0]).filter(field => field !== '_id' && field !== 'owner' && field !== 'profileId' && field !== 'year');

  return (
    <Container>
      <Button primary onClick={backToDataInput}>
        Back to Data Input
      </Button>
      <Header as="h2">Budget Form Overview</Header>
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

export default ProfileBudgetFormOverview;
