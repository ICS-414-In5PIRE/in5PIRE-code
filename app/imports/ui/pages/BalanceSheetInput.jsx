import React, { useState } from 'react';
import { Tab, Form, Segment, Container, Message, Grid, Button, Menu } from 'semantic-ui-react';
import OtherAssets from '../components/BalanceSheetComponents/OtherAssets';
import CashAndCashEquivalents from '../components/BalanceSheetComponents/CashAndCashEquivalents';
import Liabilities from '../components/BalanceSheetComponents/Liabilities';
import CommitmentsAndContingencies from '../components/BalanceSheetComponents/CommitmentsAndContingencies';

/**
 * BalanceSheetInput component for entering balance sheet data using Semantic UI React Form.
 */
const BalanceSheetInput = () => {
  const [formData, setFormData] = useState({
    pettyCash: '',
    cash: '',
    cashInBanks: '',
    totalCashAndCashEquivalents: '',
    accountsRecievables: '',
    dueFromOtherFunds: '',
    interestAndDividendsReceivable: '',
    otherAssets: '',
    notesReceivableBeforeOneYear: '',
    notesReceivableAfterOneYear: '',
    securityDeposits: '',
    cashByInvestmentManager: '',
    mutualFunds: '',
    commingledFunds: '',
    hedgeFunds: '',
    privateEquityFunds: '',
    commonTrustFunds: '',
    commonAndPreferredStocks: '',
    privateDebt: '',
    otherInvestments: '',
    subtotalInvestments: '',
    usTreasuries: '',
    usAgencies: '',
    subtotalLoanFund: '',
    totalInvestments: '',
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeItem, setActiveItem] = useState('Cash And Equivalents');

  // Handle input changes
  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handles menu item change
  const handleItemClick = (e, { name }) => setActiveItem(name);

  // Handle form submission
  const handleSubmit = () => {
    try {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError('Submission failed. Please try again.');
    }
  };

  // Render success message after submission
  if (submitted) {
    return (
      <Container>
        <Message positive>
          <Message.Header>Form submitted successfully!</Message.Header>
        </Message>
      </Container>
    );
  }

  return (
    <Container id="balance-sheet-input">
      <Grid centered>
        <Grid.Column>
          <h2>Balance Sheet Input</h2>
          {submitted ? (
            <Message positive>
              <Message.Header>Form submitted successfully!</Message.Header>
            </Message>
          ) : (
            <Form onSubmit={handleSubmit}>
              <div>
                <Menu pointing secondary>
                  <Menu.Item
                    name="Cash And Equivalents"
                    active={activeItem === 'Cash And Equivalents'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name="Other Assets"
                    active={activeItem === 'Other Assets'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name="Liabilities"
                    active={activeItem === 'Liabilities'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name="Commitments And Contingencies"
                    active={activeItem === 'Commitments And Contingencies'}
                    onClick={handleItemClick}
                  />
                </Menu>

                <Segment>
                  {activeItem === 'Cash And Equivalents' && (
                    <CashAndCashEquivalents formData={formData} handleChange={handleChange} />
                  )}
                  {activeItem === 'Other Assets' && (
                    <OtherAssets formData={formData} handleChange={handleChange} />
                  )}
                  {activeItem === 'Liabilities' && (
                    <Liabilities formData={formData} handleChange={handleChange} />
                  )}
                  {activeItem === 'Commitments And Contingencies' && (
                    <CommitmentsAndContingencies formData={formData} handleChange={handleChange} />
                  )}
                </Segment>
              </div>
              {error && (
                <Message negative>
                  <Message.Header>Submission failed</Message.Header>
                  <p>{error}</p>
                </Message>
              )}
              <Grid className="py-3">
                <Grid.Column textAlign="right">
                  <Button primary type="submit">
                    Submit
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default BalanceSheetInput;
