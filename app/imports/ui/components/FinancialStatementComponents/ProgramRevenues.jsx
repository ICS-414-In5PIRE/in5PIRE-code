import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const ProgramRevenues = ({ formData, handleChange }) => (
  <Form.Group widths="equal">
    <Form.Input
      label="Charges for Service"
      name="chargesForService"
      value={formData.chargesForService}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Operating Grants"
      name="operatingGrants"
      value={formData.operatingGrants}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Interest and Investment earnings"
      name="interestAndInvestmentEarnings"
      value={formData.interestAndInvestmentEarnings}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      className="dotted-input"
      label="Total Program Revenues"
      name="totalProgramRevenues"
      value={formData.totalProgramRevenues}
      onChange={handleChange}
      type="number"
      readOnly
    />
  </Form.Group>
);

ProgramRevenues.propTypes = {
  formData: PropTypes.shape({
    chargesForService: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operatingGrants: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    interestAndInvestmentEarnings: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalProgramRevenues: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
};

ProgramRevenues.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default ProgramRevenues;
