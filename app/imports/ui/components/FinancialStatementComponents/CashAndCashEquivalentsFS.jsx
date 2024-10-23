import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const CashAndCashEquivalentsFS = ({ formData, handleChange }) => (
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
        label="Cash Held by Investment Manager"
        name="cashByInvestmentManager"
        value={formData.cashByInvestmentManager}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Restricted Cash"
        name="restrictedCash"
        value={formData.restrictedCash}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group className="total-fields">
      <Form.Input
        width={4}
        className="dotted-input"
        label="Total Cash and Cash Equivalents"
        name="totalCashAndCashEquivalents"
        value={formData.totalCashAndCashEquivalents}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

CashAndCashEquivalentsFS.propTypes = {
  formData: PropTypes.shape({
    pettyCash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    cash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    cashInBanks: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    cashByInvestmentManager: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    restrictedCash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalCashAndCashEquivalents: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
};

CashAndCashEquivalentsFS.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default CashAndCashEquivalentsFS;
