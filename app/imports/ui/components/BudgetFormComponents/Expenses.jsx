import React from 'react';
import { Form, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PersonnelAndFringeAdmin from './PersonnelAndFringeAdmin';
import PersonnelAndFringeManagement from './PersonnelAndFringeManagement';
import PersonnelAndFringeManagementStaff from './PersonnelAndFringeManagementStaff';

/**
 * Component for Expenses form for Budget Form
 */
const Expenses = ({ formData, handleChange }) => {
  const panes = [
    {
      menuItem: 'Personnel & Fringe - Admin',
      render: () => (
        <Tab.Pane>
          <PersonnelAndFringeAdmin formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Personnel & Fringe - Management',
      render: () => (
        <Tab.Pane>
          <PersonnelAndFringeManagement formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Personnel & Fringe - Management Staff',
      render: () => (
        <Tab.Pane>
          <PersonnelAndFringeManagementStaff formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Form.Input
        width={4}
        label="Personnel"
        name="personnel"
        value={formData.personnel ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Tab panes={panes} />
      <Form.Group widths="equal">
        <Form.Input
          label="Program"
          name="program"
          value={formData.program ?? ''}
          onChange={handleChange}
          type="number"
        />
        <Form.Input
          label="Contracts"
          name="contracts"
          value={formData.contracts ?? ''}
          onChange={handleChange}
          type="number"
        />
        <Form.Input
          label="Grants"
          name="grants"
          value={formData.grants ?? ''}
          onChange={handleChange}
          type="number"
        />
        <Form.Input
          label="Travel"
          name="travel"
          value={formData.travel ?? ''}
          onChange={handleChange}
          type="number"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          label="Equipment"
          name="equipment"
          value={formData.equipment ?? ''}
          onChange={handleChange}
          type="number"
        />
        <Form.Input
          label="Overhead"
          name="overhead"
          value={formData.overhead ?? ''}
          onChange={handleChange}
          type="number"
        />
        <Form.Input
          label="Debt Service"
          name="debtService"
          value={formData.debtService ?? ''}
          onChange={handleChange}
          type="number"
        />
        <Form.Input
          label="Other"
          name="other"
          value={formData.other ?? ''}
          onChange={handleChange}
          type="number"
        />
      </Form.Group>
      <Form.Group className="total-fields">
        <Form.Input
          className="dotted-input"
          label="Total Expenses"
          name="totalExpenses"
          value={formData.totalExpenses ?? ''}
          onChange={handleChange}
          type="number"
          readOnly
        />
      </Form.Group>
    </>
  );
};

Expenses.propTypes = {
  formData: PropTypes.shape({
    personnel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    managementSalary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    program: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    contracts: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    grants: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    travel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    equipment: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    overhead: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    debtService: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    other: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalExpenses: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
};

Expenses.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default Expenses;
