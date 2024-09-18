import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Component for Expenses form for Budget Form
 */
const Expenses = ({ formData, handleChange }) => (
  <>
    <Form.Group widths="equal">
      <Form.Input
        label="Personnel"
        name="personnel"
        value={formData.personnel}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Personnel & Fringe Management Salary"
        name="managementSalary"
        value={formData.managementSalary}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Program"
        name="program"
        value={formData.program}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Contracts"
        name="contracts"
        value={formData.contracts}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Grants"
        name="grants"
        value={formData.grants}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Travel"
        name="travel"
        value={formData.travel}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Equipment"
        name="equipment"
        value={formData.equipment}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Overhead"
        name="overhead"
        value={formData.overhead}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Debt Service"
        name="debtService"
        value={formData.debtService}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Other"
        name="other"
        value={formData.other}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Input
      className="dotted-input"
      label="Total Expenses"
      name="totalExpenses"
      value={formData.totalExpenses}
      onChange={handleChange}
      type="number"
      readOnly
    />
  </>
);

Expenses.propTypes = {
  formData: PropTypes.shape({
    personnel: PropTypes.number,
    managementSalary: PropTypes.number,
    program: PropTypes.number,
    contracts: PropTypes.number,
    grants: PropTypes.number,
    travel: PropTypes.number,
    equipment: PropTypes.number,
    overhead: PropTypes.number,
    debtService: PropTypes.number,
    other: PropTypes.number,
    totalExpenses: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

Expenses.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default Expenses;
