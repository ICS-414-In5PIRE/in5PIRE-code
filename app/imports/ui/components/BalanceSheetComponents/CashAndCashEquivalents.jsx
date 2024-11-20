import React from 'react';
import { Form, Icon, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Component for Cash and Cash Equivalents form for Balance Input Sheet
 */
const CashAndCashEquivalents = ({ formData, handleChange }) => (
  <Form>
    {/* Petty Cash Input with Tooltip */}
    <Form.Field>
      <label htmlFor="pettyCash">
        Petty Cash{' '}
        <Popup
          trigger={<Icon name="info circle" />}
          content="Cash kept on hand for small expenses, e.g., $100."
          inverted
        />
      </label>
      <Form.Input
        id="pettyCash"
        name="pettyCash"
        value={formData.pettyCash ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Field>

    {/* Cash Input with Tooltip */}
    <Form.Field>
      <label htmlFor="cash">
        Cash{' '}
        <Popup
          trigger={<Icon name="info circle" />}
          content="Money held in physical form, e.g., $500."
          inverted
        />
      </label>
      <Form.Input
        id="cash"
        name="cash"
        value={formData.cash ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Field>

    {/* Cash in Banks Input with Tooltip */}
    <Form.Field>
      <label htmlFor="cashInBanks">
        Cash in Banks{' '}
        <Popup
          trigger={<Icon name="info circle" />}
          content="Cash held in bank accounts, e.g., checking or savings accounts."
          inverted
        />
      </label>
      <Form.Input
        id="cashInBanks"
        name="cashInBanks"
        value={formData.cashInBanks ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Field>

    {/* Read-only Total with Auto-Calculation */}
    <Form.Field>
      <h4>Total Cash and Cash Equivalents</h4>
      <Form.Input
        id="totalCashAndCashEquivalents"
        className="dotted-input"
        name="totalCashAndCashEquivalents"
        value={formData.totalCashAndCashEquivalents ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
        icon="calculator"
      />
    </Form.Field>
  </Form>
);

CashAndCashEquivalents.propTypes = {
  formData: PropTypes.shape({
    pettyCash: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cash: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cashInBanks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalCashAndCashEquivalents: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func,
};

CashAndCashEquivalents.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default CashAndCashEquivalents;
