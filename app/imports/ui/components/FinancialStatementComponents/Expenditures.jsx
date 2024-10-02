import React from 'react';
import PropTypes from 'prop-types';
import { Form, Divider } from 'semantic-ui-react';

const Expenditures = ({ formData, handleChange }) => (
  <>
    <Form.Group widths="equal">
      <Form.Input
        label="Management"
        name="management"
        value={formData.management}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Support Services"
        name="supportServies"
        value={formData.supportServices}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Beneficiary Advocacy"
        name="beneficiaryAdvocacy"
        value={formData.beneficiaryAdvocacy}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Depreciation"
        name="depreciation"
        value={formData.depreciation}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Limited Liability Company A"
        name="llcA"
        value={formData.llcA}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Limited Liability Company B"
        name="llcBExpenditures"
        value={formData.llcBExpenditures}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group className="total-fields">
      <Form.Input
        className="dotted-input"
        label="Total Expenditures"
        name="totalExpenditures"
        value={formData.totalExpenditures}
        onChange={handleChange}
        type="number"
        readOnly
      />
      <Form.Input
        className="dotted-input"
        label="Excess of Revenues (deficiency) Over Expenditures"
        name="excessRevenuesOverExpenditures"
        value={formData.excessRevenuesOverExpenditures}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
    <Divider />
    <Form.Group widths="equal">
      <Form.Input
        label="Proceeds from Debt"
        name="proceedsFromDebt"
        value={formData.proceedsFromDebt}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Proceeds from Capital Lease Obligations"
        name="proceedsFromCapital"
        value={formData.proceedsFromCapital}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Net Transfers (to)/from Other Funds"
        name="netTransfers"
        value={formData.netTransfers}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        className="dotted-input"
        label="Change in Net Assets"
        name="changeInNetAssets"
        value={formData.changeInNetAssets}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

Expenditures.propTypes = {
  formData: PropTypes.shape({
    management: PropTypes.number,
    supportServices: PropTypes.number,
    beneficiaryAdvocacy: PropTypes.number,
    depreciation: PropTypes.number,
    llcA: PropTypes.number,
    llcBExpenditures: PropTypes.number,
    totalExpenditures: PropTypes.number,
    excessRevenuesOverExpenditures: PropTypes.number,
    proceedsFromDebt: PropTypes.number,
    proceedsFromCapital: PropTypes.number,
    netTransfers: PropTypes.number,
    changeInNetAssets: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

Expenditures.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default Expenditures;
