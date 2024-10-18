import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PersonnelAndFringeManagement = ({ formData, handleChange }) => (
  <>
    <Form.Input
      width={4}
      label="Salary"
      name="salary"
      value={formData.salaryManagement ?? ''}
      onChange={handleChange}
      type="number"
    />
    <h3>Fringe Benefits</h3>
    <Form.Group widths="equal">
      <Form.Input
        label="Pension Accumulation"
        name="pensionAccumulation"
        value={formData.pensionAccumulationManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Retiree Health Insurance"
        name="retireeHealthInsurance"
        value={formData.retireeHealthInsuranceManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Other Post-Employment Benefits"
        name="postEmploymentBenefits"
        value={formData.postEmploymentBenefitsManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Employees Health Fund"
        name="employeesHealthFund"
        value={formData.employeesHealthFundManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Social Security"
        name="socialSecurity"
        value={formData.socialSecurityManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Medicare"
        name="medicare"
        value={formData.medicareManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Workers Compensation"
        name="workersCompensation"
        value={formData.workersCompensationManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Unemployment Compensation"
        name="unemploymentCompensation"
        value={formData.unemploymentCompensationManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Pension Administration"
        name="pensionAdministration"
        value={formData.pensionAdministrationManagement ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
  </>
);

PersonnelAndFringeManagement.propTypes = {
  formData: PropTypes.shape({
    salaryManagement: PropTypes.number,
    pensionAccumulationManagement: PropTypes.number,
    retireeHealthInsuranceManagement: PropTypes.number,
    postEmploymentBenefitsManagement: PropTypes.number,
    employeesHealthFundManagement: PropTypes.number,
    socialSecurityManagement: PropTypes.number,
    medicareManagement: PropTypes.number,
    workersCompensationManagement: PropTypes.number,
    unemploymentCompensationManagement: PropTypes.number,
    pensionAdministrationManagement: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

PersonnelAndFringeManagement.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default PersonnelAndFringeManagement;
