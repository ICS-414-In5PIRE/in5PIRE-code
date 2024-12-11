import React, { useEffect, useState } from 'react';
import { Table, Container, Header, Button, Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { useParams, useNavigate } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import Loader from '../components/Loader';
import { PAGE_IDS } from '../utilities/PageIDs';
import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';
import { exportToExcel } from '../utilities/ExportData';

const ProfileFinancialStatementOverview = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backToDataInput = () => {
    navigate(`/audited-fs/${profileId}`);
  };

  const handleExportToExcel = () => {
    exportToExcel(fields, years, data, "AuditedFSOverview");
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
      <Container>
        <br />
        <Header>No financial statement data available for this profile.</Header>
        <Button primary onClick={backToDataInput}>
          Back to Data Input
        </Button>
      </Container>
    );
  }

  const years = data.map(item => item.year);
  const fields = Object.keys(data[0]).filter(field => field !== '_id' && field !== 'owner' && field !== 'profileId' && field !== 'year');

  return (
    <Container id={PAGE_IDS.PROFILE_FINANCIAL_STATEMENT_OVERVIEW}>
      <Grid.Column className="pt-3" textAlign="left">
        <Button labelPosition="left" icon="left chevron" content="Back to Data Input" onClick={backToDataInput} />
        <Button labelPosition="right" className="ui right floated green" icon="download" content="Export to Excel" onClick={handleExportToExcel} />
      </Grid.Column>
      <Header as="h2">Audited Financial Statements Overview</Header>
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

export default ProfileFinancialStatementOverview;
