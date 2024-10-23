import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { Form } from 'semantic-ui-react';

const CashAndCashEquivalents = ({ formData, handleChange }) => (
  <Form>
    <Form.Input
      name="pettyCash"
      label="Petty Cash"
      value={formData?.pettyCash || ''}
      onChange={handleChange}
    />
    <Form.Input
      name="cash"
      label="Cash"
      value={formData?.cash || ''}
      onChange={handleChange}
    />
    <Form.Input
      name="cashInBanks"
      label="Cash in Banks"
      value={formData?.cashInBanks || ''}
      onChange={handleChange}
    />
  </Form>
);

CashAndCashEquivalents.propTypes = {
  formData: PropTypes.shape({
    pettyCash: PropTypes.number,
    cash: PropTypes.number,
    cashInBanks: PropTypes.number,
  }),
  handleChange: PropTypes.func.isRequired,
};

CashAndCashEquivalents.defaultProps = {
  formData: {},
};

export default CashAndCashEquivalents;
