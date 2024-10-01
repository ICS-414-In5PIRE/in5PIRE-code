import React from 'react';
import { Form, Divider, Icon, Popup, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Component for Cash and Cash Equivalents form for Balance Input Sheet
 */
const CashAndCashEquivalents = ({ formData, handleChange }) => (
  <>
    <Form.Group widths="equal">
      {/* Petty Cash Input with Tooltip */}
      <Form.Input
        label={
          (
            <>
              Petty Cash{' '}
              <Popup
                trigger={<Icon name="info circle" />}
                content="Cash kept on hand for small expenses, e.g., $100."
                inverted
              />
            </>
          )
        }
        name="pettyCash"
        value={formData.pettyCash ?? ''}
        onChange={handleChange}
        type="number"
      />

      <Form.Input
        label={
          (
            <>
              Cash{' '}
              <Popup
                trigger={<Icon name="info circle" />}
                content="Money held in physical form, e.g., $500."
                inverted
              />
            </>
          )
        }
        name="cash"
        value={formData.cash ?? ''}
        onChange={handleChange}
        type="number"
      />

      {/* Cash in Banks Input with Tooltip */}
      <Form.Input
        label={
          (
            <>
              Cash in Banks{' '}
              <Popup
                trigger={<Icon name="info circle" />}
                content="Cash held in bank accounts, e.g., checking or savings accounts."
                inverted
              />
            </>
          )
        }
        name="cashInBanks"
        value={formData.cashInBanks ?? ''}
        onChange={handleChange}
        type="number"
      />

      {/* Read-only Total with Auto-Calculation */}
      <Form.Input
        label="Total Cash and Cash Equivalents"
        name="totalCashAndCashEquivalents"
        value={formData.totalCashAndCashEquivalents ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
        icon="calculator"
        placeholder="Auto-calculated"
      />
    </Form.Group>

    {/* Warning Message for Missing or Negative Values */}
    {(formData.cash < 0 || formData.pettyCash < 0 || formData.cashInBanks < 0) && (
      <Message negative>
        <Message.Header>Invalid input detected</Message.Header>
        <p>All cash values should be positive. Please correct any negative inputs.</p>
      </Message>
    )}

    <Divider />
  </>
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
