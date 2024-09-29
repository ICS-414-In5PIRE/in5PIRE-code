import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const FundBalances = ({ formData, handleChange }) => (
  <Form.Group widths="equal">
    <Form.Input
      label="Beginning of the Year, as Previously Stated"
      name="beginningOfYear"
      value={formData.beginningOfYear}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Restatement Adjustment"
      name="restatementAdjustment"
      value={formData.restatementAdjustment}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      className="dotted-input"
      label="Net Position at End of Year"
      name="netPositionEndOfYear"
      value={formData.netPositionEndOfYear}
      onChange={handleChange}
      type="number"
      readOnly
    />
  </Form.Group>
);

FundBalances.propTypes = {
  formData: PropTypes.shape({
    beginningOfYear: PropTypes.number,
    restatementAdjustment: PropTypes.number,
    netPositionEndOfYear: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

FundBalances.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default FundBalances;
