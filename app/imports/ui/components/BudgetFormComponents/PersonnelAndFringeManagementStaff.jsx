import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PersonnelAndFringeManagementStaff = ({ formData, handleChange }) => (
  <>
    <Form.Input
      width={4}
      label="Salary"
      name="salary"
      value={formData.salaryStaff ?? ''}
      onChange={handleChange}
      type="number"
    />
    <h3>Fringe Benefits</h3>
    <Form.Group widths="equal">
      <Form.Input
        label="Pension Accumulation"
        name="pensionAccumulation"
        value={formData.pensionAccumulationStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Retiree Health Insurance"
        name="retireeHealthInsurance"
        value={formData.retireeHealthInsuranceStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Other Post-Employment Benefits"
        name="postEmploymentBenefits"
        value={formData.postEmploymentBenefitsStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Employees Health Fund"
        name="employeesHealthFund"
        value={formData.employeesHealthFundStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Social Security"
        name="socialSecurity"
        value={formData.socialSecurityStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Medicare"
        name="medicare"
        value={formData.medicareStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Workers Compensation"
        name="workersCompensation"
        value={formData.workersCompensationStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Unemployment Compensation"
        name="unemploymentCompensation"
        value={formData.unemploymentCompensationStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Pension Administration"
        name="pensionAdministration"
        value={formData.pensionAdministrationStaff ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
  </>
);

PersonnelAndFringeManagementStaff.propTypes = {
  formData: PropTypes.shape({
    salaryStaff: PropTypes.number,
    pensionAccumulationStaff: PropTypes.number,
    retireeHealthInsuranceStaff: PropTypes.number,
    postEmploymentBenefitsStaff: PropTypes.number,
    employeesHealthFundStaff: PropTypes.number,
    socialSecurityStaff: PropTypes.number,
    medicareStaff: PropTypes.number,
    workersCompensationStaff: PropTypes.number,
    unemploymentCompensationStaff: PropTypes.number,
    pensionAdministrationStaff: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

PersonnelAndFringeManagementStaff.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default PersonnelAndFringeManagementStaff;
