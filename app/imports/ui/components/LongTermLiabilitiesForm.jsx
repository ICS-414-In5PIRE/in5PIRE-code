import { Form } from 'semantic-ui-react';
import React from 'react';

/**
 * Component for Liabilities form for Balance Input Sheet
 * @param subtitle
 * @returns {React.JSX.Element}
 * @constructor
 */
const LongTermLiabilitiesForm = ({ subtitle, netWording }) => (
  <>
    <h5>{ subtitle }</h5>
    <Form.Group widths="equal">
      <Form.Input
        label="Accrued Vacation"
        type="number"
      />
      <Form.Input
        label="Workers' Compensation"
        type="number"
      />
      <Form.Input
        label="Accrued Management Retirement Plan"
        type="number"
      />
      <Form.Input
        label="Accrued Lease Guaranty Obligations"
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Capital Lease Obligations"
        type="number"
      />
      <Form.Input
        label="Notes payable - Building A acquisition"
        type="number"
      />
      <Form.Input
        label="Net Pension Liability"
        type="number"
      />
      <Form.Input
        label="Net OPEB Liability"
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Line of Credit - Building A"
        type="number"
      />
      <Form.Input
        label="Line of Credit - Building B"
        type="number"
      />
      <Form.Input
        label="Debt service"
        type="number"
      />
    </Form.Group>
    <Form.Group widths={4} className="total-fields">
      <Form.Input
        className="dotted-input"
        label={netWording}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

LongTermLiabilitiesForm.propTypes = {
  subtitle: String.isRequired,
  netWording: String.isRequired,
};

export default LongTermLiabilitiesForm;
