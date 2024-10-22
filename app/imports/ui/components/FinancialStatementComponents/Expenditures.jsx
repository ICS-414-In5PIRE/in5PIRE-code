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
        name="supportServices"
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
        label="Total Expenses"
        name="totalExpenses"
        value={formData.totalExpenses}
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
    management: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    supportServices: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    beneficiaryAdvocacy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    depreciation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    llcA: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    llcBExpenditures: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalExpenses: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    excessRevenuesOverExpenditures: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    proceedsFromDebt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    proceedsFromCapital: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    netTransfers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    changeInNetAssets: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
};

Expenditures.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default Expenditures;
