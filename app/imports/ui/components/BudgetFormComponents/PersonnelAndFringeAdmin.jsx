import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PersonnelAndFringeAdmin = ({ formData, handleChange, canEdit }) => (
  <>
    <Form.Input
      width={4}
      label="Salary"
      name="salaryAdmin"
      value={formData.salaryAdmin ?? ''}
      onChange={handleChange}
      type="number"
      readOnly={!canEdit}
    />
    <h3>Fringe Benefits</h3>
    <Form.Group widths="equal">
      <Form.Input
        label="Pension Accumulation"
        name="pensionAccumulationAdmin"
        value={formData.pensionAccumulationAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Retiree Health Insurance"
        name="retireeHealthInsuranceAdmin"
        value={formData.retireeHealthInsuranceAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Other Post-Employment Benefits"
        name="postEmploymentBenefitsAdmin"
        value={formData.postEmploymentBenefitsAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Employees Health Fund"
        name="employeesHealthFundAdmin"
        value={formData.employeesHealthFundAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Social Security"
        name="socialSecurityAdmin"
        value={formData.socialSecurityAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Medicare"
        name="medicareAdmin"
        value={formData.medicareAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Workers Compensation"
        name="workersCompensationAdmin"
        value={formData.workersCompensationAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Unemployment Compensation"
        name="unemploymentCompensationAdmin"
        value={formData.unemploymentCompensationAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Pension Administration"
        name="pensionAdministrationAdmin"
        value={formData.pensionAdministrationAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
    </Form.Group>
    <Form.Group className="total-fields">
      <Form.Input
        className="dotted-input"
        label="Fringe Benefits"
        name="fringeBenefitsAdmin"
        value={formData.fringeBenefitsAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
      />
      <Form.Input
        className="dotted-input"
        label="Personnel & Fringe"
        name="personnelAndFringeAdmin"
        value={formData.personnelAndFringeAdmin ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

PersonnelAndFringeAdmin.propTypes = {
  formData: PropTypes.shape({
    salaryAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pensionAccumulationAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    retireeHealthInsuranceAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    postEmploymentBenefitsAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    employeesHealthFundAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    socialSecurityAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    medicareAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    workersCompensationAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    unemploymentCompensationAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pensionAdministrationAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fringeBenefitsAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    personnelAndFringeAdmin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
  canEdit: PropTypes.bool,
};

PersonnelAndFringeAdmin.defaultProps = {
  formData: {},
  handleChange: () => {},
  canEdit: true,
};

export default PersonnelAndFringeAdmin;
