import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PersonnelAndFringeAdmin = ({ formData, handleChange }) => (
  <>
    <Form.Input
      width={4}
      label="Salary"
      name="salary"
      value={formData.salaryAdmin ?? ''}
      onChange={handleChange}
      type="number"
    />
    <h3>Fringe Benefits</h3>
    <Form.Group widths="equal">
      <Form.Input
        label="Pension Accumulation"
        name="pensionAccumulation"
        value={formData.pensionAccumulationAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Retiree Health Insurance"
        name="retireeHealthInsurance"
        value={formData.retireeHealthInsuranceAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Other Post-Employment Benefits"
        name="postEmploymentBenefits"
        value={formData.postEmploymentBenefitsAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Employees Health Fund"
        name="employeesHealthFund"
        value={formData.employeesHealthFundAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Social Security"
        name="socialSecurity"
        value={formData.socialSecurityAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Medicare"
        name="medicare"
        value={formData.medicareAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Workers Compensation"
        name="workersCompensation"
        value={formData.workersCompensationAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Unemployment Compensation"
        name="unemploymentCompensation"
        value={formData.unemploymentCompensationAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Pension Administration"
        name="pensionAdministration"
        value={formData.pensionAdministrationAdmin ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
  </>
);

PersonnelAndFringeAdmin.propTypes = {
  formData: PropTypes.shape({
    salaryAdmin: PropTypes.number,
    pensionAccumulationAdmin: PropTypes.number,
    retireeHealthInsuranceAdmin: PropTypes.number,
    postEmploymentBenefitsAdmin: PropTypes.number,
    employeesHealthFundAdmin: PropTypes.number,
    socialSecurityAdmin: PropTypes.number,
    medicareAdmin: PropTypes.number,
    workersCompensationAdmin: PropTypes.number,
    unemploymentCompensationAdmin: PropTypes.number,
    pensionAdministrationAdmin: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

PersonnelAndFringeAdmin.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default PersonnelAndFringeAdmin;
