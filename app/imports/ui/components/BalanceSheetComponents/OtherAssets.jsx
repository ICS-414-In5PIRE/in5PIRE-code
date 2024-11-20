import React from 'react';
import { Form, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Component for Other Assets form for Balance Input Sheet
 */
const OtherAssets = ({ formData, handleChange }) => (
  <Form>
    <Form.Input
      label="Accounts Receivables"
      name="accountsReceivables"
      value={formData.accountsReceivables ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Due From Other Funds"
      name="dueFromOtherFunds"
      value={formData.dueFromOtherFunds ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Interests and Dividends Receivable"
      name="interestAndDividendsReceivable"
      value={formData.interestAndDividendsReceivable ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Inventory, prepaid items and other assets"
      name="otherAssets"
      value={formData.otherAssets ?? ''}
      onChange={handleChange}
      type="number"
    />

    <Form.Input
      label="Notes receivable - due within one year"
      name="notesReceivableBeforeOneYear"
      value={formData.notesReceivableBeforeOneYear ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Notes receivable - due after one year"
      name="notesReceivableAfterOneYear"
      value={formData.notesReceivableAfterOneYear ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Security Deposits"
      name="securityDeposits"
      value={formData.securityDeposits ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Cash Held by Investment Manager"
      name="cashByInvestmentManager"
      value={formData.cashByInvestmentManager ?? ''}
      onChange={handleChange}
      type="number"
    />

    <Form.Input
      label="Restricted Cash"
      name="restrictedCash"
      value={formData.restrictedCash ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      className="dotted-input"
      label="Total Other Assets"
      name="totalOtherAssets"
      value={formData.totalOtherAssets ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
      icon="calculator"
    />

    <Form.Input
      label="Deferred outflows of resources related to pensions"
      name="deferredOutflowsPensions"
      value={formData.deferredOutflowsPensions ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Deferred outflows of resources related to OPEB"
      name="deferredOutflowsOPEB"
      value={formData.deferredOutflowsOPEB ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      className="dotted-input"
      label="Net assets and deferred outflows of resources"
      name="netAssetsDeferredOutflows"
      value={formData.netAssetsDeferredOutflows ?? ''}
      onChange={handleChange}
      readOnly
      icon="calculator"
    />

    {/* Formerly Investments Tab */}
    <h5>Assets</h5>
    <Form.Input
      label="Buildings"
      name="buildings"
      value={formData.buildings ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Leasehold Improvements"
      name="leaseholdImprovements"
      value={formData.leaseholdImprovements ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Furniture, Fixtures, Equipment"
      name="furnitureFixturesEquipment"
      value={formData.furnitureFixturesEquipment ?? ''}
      onChange={handleChange}
      type="number"
    />

    <Form.Input
      label="Less: Accumulated Depreciation"
      name="accumulatedDepreciation"
      value={formData.accumulatedDepreciation ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      className="dotted-input"
      label="Net"
      name="netCapitalAssets"
      value={formData.netCapitalAssets ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
      icon="calculator"
    />
    <Divider />
    <h5>Land</h5>
    <Form.Input
      label="Land A"
      name="landA"
      value={formData.landA ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Land B"
      name="landB"
      value={formData.landB ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Construction in Progress"
      name="constructionInProgress"
      value={formData.constructionInProgress ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      className="dotted-input"
      label="Subtotal - Capital Assets, net"
      name="subtotalCapitalAssetsNet"
      value={formData.subtotalCapitalAssetsNet ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
      icon="calculator"
    />
    <Divider />
    <h5>Limited Liability Company B&apos;s Assets</h5>
    <Form.Input
      label="Buildings"
      name="llcBuildings"
      value={formData.llcBuildings ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Leasehold Improvements"
      name="llcLeaseholdImprovements"
      value={formData.llcLeaseholdImprovements ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Furniture, Fixtures, Equipment"
      name="llcFurnitureFixturesEquipment"
      value={formData.llcFurnitureFixturesEquipment ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Vehicles"
      name="vehicles"
      value={formData.vehicles ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Less Accumulated Depreciation"
      name="llcAccumulatedDepreciation"
      value={formData.llcAccumulatedDepreciation ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      className="dotted-input"
      label="Net"
      name="llcNet"
      value={formData.llcNet ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
      icon="calculator"
    />
    <Divider />
    <Form.Input
      label="Land"
      name="llcLand"
      value={formData.llcLand ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      className="dotted-input"
      label="Limited Liability Company B's assets, net"
      name="llcAssetsNet"
      value={formData.llcAssetsNet ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
      icon="calculator"
    />
    <Divider />
    <Form.Input
      className="dotted-input"
      label="Total Capital Assets, net"
      name="totalCapitalAssetsNet"
      value={formData.totalCapitalAssetsNet ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
      icon="calculator"
    />
  </Form>
);

OtherAssets.propTypes = {
  formData: PropTypes.shape({
    accountsReceivables: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dueFromOtherFunds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    interestAndDividendsReceivable: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    otherAssets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    notesReceivableBeforeOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    notesReceivableAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    securityDeposits: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cashByInvestmentManager: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mutualFunds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    commingledFunds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hedgeFunds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    privateEquityFunds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    commonTrustFunds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    commonAndPreferredStocks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    privateDebt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    otherInvestments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subtotalInvestments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    usTreasuries: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    usAgencies: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subtotalLoanFund: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalInvestments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    buildings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    leaseholdImprovements: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    furnitureFixturesEquipment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    accumulatedDepreciation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netCapitalAssets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    landA: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    landB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    constructionInProgress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subtotalCapitalAssetsNet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    llcBuildings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    llcLeaseholdImprovements: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    llcFurnitureFixturesEquipment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vehicles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    llcAccumulatedDepreciation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    llcNet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    llcLand: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    llcAssetsNet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalCapitalAssetsNet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    restrictedCash: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalOtherAssets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deferredOutflowsPensions: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deferredOutflowsOPEB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netAssetsDeferredOutflows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func,
};

OtherAssets.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default OtherAssets;
