import React, { useEffect, useState } from 'react';
import { Table, Container, Header, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { useParams, useNavigate } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import Loader from '../components/Loader';
import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';

const ProfileFinancialStatementOverview = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backToDataInput = () => {
    navigate(`/audited-fs/${profileId}`);
  };

  useEffect(() => {
    const subscription = Meteor.subscribe('auditedfs', profileId);

    const tracker = Tracker.autorun(() => {
      const ready = subscription.ready();
      if (ready) {
        const financialStatementData = FinancialStatementInput.find({ profileId }, { sort: { year: 1 } }).fetch();
        setData(financialStatementData);
        setIsLoading(false);
      }
    });

    return () => {
      tracker.stop();
    };
  }, [profileId]);

  if (isLoading) {
    return <Loader text="Loading Financial Statement overview..." />;
  }

  if (data.length === 0) {
    return (
      <Container><Header>No financial statement data available for this profile.</Header>
        <Button primary onClick={backToDataInput}>
          Back to Data Input
        </Button>
      </Container>
    );
  }

  const years = data.map(item => item.year);
  const fields = Object.keys(data[0]).filter(field => field !== '_id' && field !== 'owner' && field !== 'profileId' && field !== 'year');

  return (
    <Container>
      <Button primary onClick={backToDataInput}>
        Back to Data Input
      </Button>
      <Header as="h2">Audited Financial Statements Overview</Header>
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

export default ProfileFinancialStatementOverview;
