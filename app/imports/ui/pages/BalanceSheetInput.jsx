import React, { useState } from 'react';
import { Form, Button, Container, Grid, Message, Divider, Segment } from 'semantic-ui-react';

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

  // Handle input changes
  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

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
          <Form onSubmit={handleSubmit}>
            <h3>Cash and Cash Equivalents</h3>
            <Form.Group widths="equal">
              <Form.Input
                label="Petty Cash"
                name="pettyCash"
                value={formData.pettyCash}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                label="Cash"
                name="cash"
                value={formData.cash}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                label="Cash in Banks"
                name="cashInBanks"
                value={formData.cashInBanks}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                className="dotted-input"
                label="Total Cash and Cash Equivalents"
                name="totalCashAndCashEquivalents"
                value={formData.totalCashAndCashEquivalents}
                onChange={handleChange}
                type="number"
                readOnly
              />
            </Form.Group>
            <Divider />
            <h3>Other Assets</h3>
            <Form.Group widths="equal">
              <Form.Input
                label="Accounts Recievables"
                name="accountsRecievables"
                value={formData.accountsRecievables}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                label="Due From Other Funds"
                name="dueFromOtherFunds"
                value={formData.dueFromOtherFunds}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                label="Interests and Dividends Receivable"
                name="interestAndDividendsReceivable"
                value={formData.interestAndDividendsReceivable}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                label="Inventory, prepaid items and other assets"
                name="otherAssets"
                value={formData.otherAssets}
                onChange={handleChange}
                type="number"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Notes receivable - due within one year"
                name="notesReceivableBeforeOneYear"
                value={formData.notesReceivableBeforeOneYear}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                label="Notes receivable - due after one year"
                name="notesReceivableAfterOneYear"
                value={formData.notesReceivableAfterOneYear}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                label="Security Deposits"
                name="securityDeposits"
                value={formData.securityDeposits}
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                label="Cash Held by Investment Manager"
                name="cashByInvestmentManager"
                value={formData.cashByInvestmentManager}
                onChange={handleChange}
                type="number"
              />
            </Form.Group>
            <h4>Investments</h4>
            <Segment>
              <Form.Group widths="equal">
                <Form.Input
                  label="Mutual Funds"
                  name="mutualFunds"
                  value={formData.mutualFunds}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Commingled Funds"
                  name="commingledFunds"
                  value={formData.commingledFunds}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Hedge Funds"
                  name="hedgedFunds"
                  value={formData.hedgeFunds}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Private Equity"
                  name="privateEquityFunds"
                  value={formData.privateEquityFunds}
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  label="Common Trust Funds"
                  name="commonTrustFunds"
                  value={formData.commonTrustFunds}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Common & Preferred Stocks"
                  name="commonAndPreferredStocks"
                  value={formData.commonAndPreferredStocks}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Private Debt"
                  name="privateDebt"
                  value={formData.privateDebt}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Other Investments"
                  name="otherInvestments"
                  value={formData.otherInvestments}
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>
              <Form.Group widths={4} className="total-fields">
                <Form.Input
                  className="dotted-input"
                  label="Subtotal - Investments"
                  name="subtotalInvestments"
                  value={formData.subtotalInvestments}
                  onChange={handleChange}
                  type="number"
                  readOnly
                />
              </Form.Group>
              <Divider />
              <Form.Group>
                <Form.Input
                  width={6}
                  label="U.S. Treasuries"
                  name="usTreasuries"
                  value={formData.usTreasuries}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  width={6}
                  label="U.S. Agencies"
                  name="usAgencies"
                  value={formData.usAgencies}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  className="dotted-input"
                  width={4}
                  label="Subtotal - Loan Fund"
                  name="subtotalLoanFund"
                  value={formData.subtotalLoanFund}
                  onChange={handleChange}
                  type="number"
                  readOnly
                />
              </Form.Group>
              <Divider />
              <Form.Group className="total-fields">
                <Form.Input
                  className="dotted-input"
                  width={4}
                  label="Total Investments"
                  name="totalInvestments"
                  value={formData.totalInvestments}
                  onChange={handleChange}
                  type="number"
                  readOnly
                />
              </Form.Group>
            </Segment>
            <h4>Capital Assets, net:</h4>
            <Segment>
              <h5>Assets</h5>
              <Form.Group widths="equal">
                <Form.Input
                  label="Buildings"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Leasehold Improvements"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Furniture, Fixtures, Equipment"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Less: Accumulated Depreciation"
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>
              <Form.Group className="total-fields">
                <Form.Input
                  className="dotted-input"
                  width={4}
                  label="Net"
                  onChange={handleChange}
                  type="number"
                  readOnly
                />
              </Form.Group>
              <Divider />
              <h5>Land</h5>
              <Form.Group widths="equal">
                <Form.Input
                  label="Land A"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Land B"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Construction in Progress"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  className="dotted-input"
                  label="Subtotal - Capital Assets, net"
                  onChange={handleChange}
                  type="number"
                  readOnly
                />
              </Form.Group>
              <Divider />
              <h5>Limited Liability Company B&apos;s Assets</h5>
              <Form.Group widths="equal">
                <Form.Input
                  label="Buildings"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Leasehold Improvements"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  label="Furniture, Fixtures, Equipment"
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  width={6}
                  label="Vehicles"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  width={6}
                  label="Less Accumulated Depreciation"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  className="dotted-input"
                  width={4}
                  label="Net"
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>
              <Divider />
              <Form.Group>
                <Form.Input
                  width={12}
                  label="Land"
                  onChange={handleChange}
                  type="number"
                />
                <Form.Input
                  width={4}
                  className="dotted-input"
                  label="Limited Liability Company B's assets, net"
                  onChange={handleChange}
                  type="number"
                  readOnly
                />
              </Form.Group>
              <Divider />
              <Form.Group className="total-fields">
                <Form.Input
                  width={4}
                  className="dotted-input"
                  label="Total Capital Assets, net"
                  onChange={handleChange}
                  type="number"
                  readOnly
                />
              </Form.Group>
            </Segment>
            <Form.Group>
              <Form.Input
                width={12}
                label="Restricted Cash"
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                className="dotted-input"
                width={4}
                label="Total Other Assets"
                onChange={handleChange}
                type="number"
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={6}
                label="Deferred outflows of resources related to pensions"
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                width={6}
                label="Deferred outflows of resources related to OPEB"
                onChange={handleChange}
                type="number"
              />
              <Form.Input
                className="dotted-input"
                width={4}
                label="Net assets and deferred outflows of resources"
                onChange={handleChange}
                type="number"
                readOnly
              />
            </Form.Group>
            <Divider />
            <h3>Liabilities</h3>
            {error && (
              <Message negative>
                <Message.Header>Submission failed</Message.Header>
                <p>{error}</p>
              </Message>
            )}
            <Button primary type="submit">Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default BalanceSheetInput;
