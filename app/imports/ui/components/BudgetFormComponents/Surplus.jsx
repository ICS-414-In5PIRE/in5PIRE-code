import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Surplus = ({ formData, handleChange }) => (
  <Form.Group widths="equal">
    <Form.Input
      label="Management"
      name="management"
      value={formData.management ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Support Services"
      name="supportServices"
      value={formData.supportServices ?? ''}
      onChange={handleChange}
      type="number"
    />
    <Form.Input
      label="Beneficiary Advocacy"
      name="beneficiaryAdvocacy"
      value={formData.beneficiaryAdvocacy ?? ''}
      onChange={handleChange}
      type="number"
    />
  </Form.Group>
);

Surplus.propTypes = {
  formData: PropTypes.shape({
    management: PropTypes.number,
    supportServices: PropTypes.number,
    beneficiaryAdvocacy: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

Surplus.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default Surplus;
