import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PersonnelAndFringeManagement = ({ formData, handleChange }) => (
  <>
    <Form.Input
      width={4}
      label="Salary"
      name="salary"
      value={formData.salary}
      onChange={handleChange}
      type="number"
    />
    <h3>Fringe Benefits</h3>
    <Form.Group widths="equal">
      <Form.Input
        label="Pension Accumulation"
        name="pensionAccumulation"
        value={formData.pensionAccumulation}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Retiree Health Insurance"
        name="retireeHealthInsurance"
        value={formData.retireeHealthInsurance}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Other Post-Employment Benefits"
        name="postEmploymentBenefits"
        value={formData.postEmploymentBenefits}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Employees Health Fund"
        name="employeesHealthFund"
        value={formData.employeesHealthFund}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Social Security"
        name="socialSecurity"
        value={formData.socialSecurity}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Medicare"
        name="medicare"
        value={formData.medicare}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Workers Compensation"
        name="workersCompensation"
        value={formData.workersCompensation}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Unemployment Compensation"
        name="unemploymentCompensation"
        value={formData.unemploymentCompensation}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Pension Administration"
        name="pensionAdministration"
        value={formData.pensionAdministration}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
  </>
);

PersonnelAndFringeManagement.propTypes = {
  formData: PropTypes.shape({
    salary: PropTypes.number,
    pensionAccumulation: PropTypes.number,
    retireeHealthInsurance: PropTypes.number,
    postEmploymentBenefits: PropTypes.number,
    employeesHealthFund: PropTypes.number,
    socialSecurity: PropTypes.number,
    medicare: PropTypes.number,
    workersCompensation: PropTypes.number,
    unemploymentCompensation: PropTypes.number,
    pensionAdministration: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

PersonnelAndFringeManagement.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default PersonnelAndFringeManagement;
