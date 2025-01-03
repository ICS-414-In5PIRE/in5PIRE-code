import React from 'react';
import { Form, Tab, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PersonnelAndFringeAdmin from './PersonnelAndFringeAdmin';
import PersonnelAndFringeManagement from './PersonnelAndFringeManagement';
import PersonnelAndFringeAdminStaff from './PersonnelAndFringeAdminStaff';

/**
 * Component for Expenses form for Budget Form
 */
const Expenses = ({ formData, handleChange, canEdit }) => {
  const panes = [
    {
      menuItem: 'Personnel & Fringe - Admin',
      render: () => (
        <Tab.Pane>
          <PersonnelAndFringeAdmin formData={formData} handleChange={handleChange} canEdit={canEdit} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Personnel & Fringe - Management',
      render: () => (
        <Tab.Pane>
          <PersonnelAndFringeManagement formData={formData} handleChange={handleChange} canEdit={canEdit} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Personnel & Fringe - Admin Staff',
      render: () => (
        <Tab.Pane>
          <PersonnelAndFringeAdminStaff formData={formData} handleChange={handleChange} canEdit={canEdit} />
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
        readOnly={!canEdit}
      />
      <Tab panes={panes} />
      <Divider />
      <Form.Group widths="equal">
        <Form.Input
          label="Program"
          name="program"
          value={formData.program ?? ''}
          onChange={handleChange}
          type="number"
          readOnly={!canEdit}
        />
        <Form.Input
          label="Contracts"
          name="contracts"
          value={formData.contracts ?? ''}
          onChange={handleChange}
          type="number"
          readOnly={!canEdit}
        />
        <Form.Input
          label="Grants"
          name="grants"
          value={formData.grants ?? ''}
          onChange={handleChange}
          type="number"
          readOnly={!canEdit}
        />
        <Form.Input
          label="Travel"
          name="travel"
          value={formData.travel ?? ''}
          onChange={handleChange}
          type="number"
          readOnly={!canEdit}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          label="Equipment"
          name="equipment"
          value={formData.equipment ?? ''}
          onChange={handleChange}
          type="number"
          readOnly={!canEdit}
        />
        <Form.Input
          label="Overhead"
          name="overhead"
          value={formData.overhead ?? ''}
          onChange={handleChange}
          type="number"
          readOnly={!canEdit}
        />
        <Form.Input
          label="Debt Service"
          name="debtService"
          value={formData.debtService ?? ''}
          onChange={handleChange}
          type="number"
          readOnly={!canEdit}
        />
        <Form.Input
          label="Other"
          name="other"
          value={formData.other ?? ''}
          onChange={handleChange}
          type="number"
          readOnly={!canEdit}
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
  canEdit: PropTypes.bool,
};

Expenses.defaultProps = {
  formData: {},
  handleChange: () => {},
  canEdit: true,
};

export default Expenses;
