import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PersonnelAndFringeAdminStaff = ({ formData, handleChange, canEdit }) => (
  <>
    <Form.Input
      width={4}
      label="Salary"
      name="salaryStaff"
      value={formData.salaryStaff ?? ''}
      onChange={handleChange}
      type="number"
      readOnly={!canEdit}
    />
    <h3>Fringe Benefits</h3>
    <Form.Group widths="equal">
      <Form.Input
        label="Pension Accumulation"
        name="pensionAccumulationStaff"
        value={formData.pensionAccumulationStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Retiree Health Insurance"
        name="retireeHealthInsuranceStaff"
        value={formData.retireeHealthInsuranceStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Other Post-Employment Benefits"
        name="postEmploymentBenefitsStaff"
        value={formData.postEmploymentBenefitsStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Employees Health Fund"
        name="employeesHealthFundStaff"
        value={formData.employeesHealthFundStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Social Security"
        name="socialSecurityStaff"
        value={formData.socialSecurityStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Medicare"
        name="medicareStaff"
        value={formData.medicareStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Workers Compensation"
        name="workersCompensationStaff"
        value={formData.workersCompensationStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Unemployment Compensation"
        name="unemploymentCompensationStaff"
        value={formData.unemploymentCompensationStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Pension Administration"
        name="pensionAdministrationStaff"
        value={formData.pensionAdministrationStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
    </Form.Group>
    <Form.Group className="total-fields">
      <Form.Input
        className="dotted-input"
        label="Fringe Benefits"
        name="fringeBenefitsStaff"
        value={formData.fringeBenefitsStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
      />
      <Form.Input
        className="dotted-input"
        label="Personnel & Fringe"
        name="personnelAndFringeStaff"
        value={formData.personnelAndFringeStaff ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

PersonnelAndFringeAdminStaff.propTypes = {
  formData: PropTypes.shape({
    salaryStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pensionAccumulationStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    retireeHealthInsuranceStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    postEmploymentBenefitsStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    employeesHealthFundStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    socialSecurityStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    medicareStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    workersCompensationStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    unemploymentCompensationStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pensionAdministrationStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fringeBenefitsStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    personnelAndFringeStaff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
  canEdit: PropTypes.bool,
};

PersonnelAndFringeAdminStaff.defaultProps = {
  formData: {},
  handleChange: () => {},
  canEdit: true,
};

export default PersonnelAndFringeAdminStaff;
