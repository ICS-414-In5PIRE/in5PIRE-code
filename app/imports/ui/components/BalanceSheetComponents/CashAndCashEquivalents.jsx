import React from 'react';
import { Form, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Component for Cash and Cash Equivalents form for Balance Input Sheet
 */
const CashAndCashEquivalents = ({ formData, handleChange }) => (
  <>
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
  </>
);

CashAndCashEquivalents.propTypes = {
  formData: PropTypes.shape({
    pettyCash: PropTypes.number,
    cash: PropTypes.number,
    cashInBanks: PropTypes.number,
    totalCashAndCashEquivalents: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

CashAndCashEquivalents.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default CashAndCashEquivalents;
