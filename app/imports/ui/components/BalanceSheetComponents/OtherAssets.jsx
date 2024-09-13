import React from 'react';
import { Form, Divider, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Component for Other Assets form for Balance Input Sheet
 */
const OtherAssets = ({ formData, handleChange }) => {
  const panes = [
    {
      menuItem: 'Investments',
      render: () => (
        <Tab.Pane>
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
              name="hedgeFunds"
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
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Capital Assets, net',
      render: () => (
        <Tab.Pane>
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
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Form.Group widths="equal">
        <Form.Input
          label="Accounts Receivables"
          name="accountsReceivables"
          value={formData.accountsReceivables}
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
      <Tab panes={panes} />
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
    </>
  );
};

OtherAssets.propTypes = {
  formData: PropTypes.shape({
    accountsReceivables: PropTypes.number,
    dueFromOtherFunds: PropTypes.number,
    interestAndDividendsReceivable: PropTypes.number,
    otherAssets: PropTypes.number,
    notesReceivableBeforeOneYear: PropTypes.number,
    notesReceivableAfterOneYear: PropTypes.number,
    securityDeposits: PropTypes.number,
    cashByInvestmentManager: PropTypes.number,
    mutualFunds: PropTypes.number,
    commingledFunds: PropTypes.number,
    hedgeFunds: PropTypes.number,
    privateEquityFunds: PropTypes.number,
    commonTrustFunds: PropTypes.number,
    commonAndPreferredStocks: PropTypes.number,
    privateDebt: PropTypes.number,
    otherInvestments: PropTypes.number,
    subtotalInvestments: PropTypes.number,
    usTreasuries: PropTypes.number,
    usAgencies: PropTypes.number,
    subtotalLoanFund: PropTypes.number,
    totalInvestments: PropTypes.number,
    netCapitalAssets: PropTypes.number,
    landA: PropTypes.number,
    landB: PropTypes.number,
    constructionInProgress: PropTypes.number,
    totalCapitalAssetsNet: PropTypes.number,
    restrictedCash: PropTypes.number,
    totalOtherAssets: PropTypes.number,
    deferredOutflowsPensions: PropTypes.number,
    deferredOutflowsOPEB: PropTypes.number,
    netAssetsDeferredOutflows: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

OtherAssets.defaultProps = {
  formData: {},
  handleChange: () => {}, // Default no-op function
};

export default OtherAssets;
