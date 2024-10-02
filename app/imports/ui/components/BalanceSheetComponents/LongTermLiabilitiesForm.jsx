import { Form } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for Liabilities form for Balance Input Sheet
 * @param subtitle
 * @returns {React.JSX.Element}
 * @constructor
 */
const LongTermLiabilitiesForm = ({ formData, netWording, handleChange }) => (
  <>
    <Form.Group widths="equal">
      <Form.Input
        label="Accrued Vacation"
        name="accruedVacation"
        value={formData.accruedVacation ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Workers' Compensation"
        name="workersCompensation"
        value={formData.workersCompensation ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Accrued Management Retirement Plan"
        name="accruedRetirementPlan"
        value={formData.accruedRetirementPlan ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Accrued Lease Guaranty Obligations"
        name="accruedLeaseGuaranty"
        value={formData.accruedLeaseGuaranty ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Capital Lease Obligations"
        name="capitalLeaseObligations"
        value={formData.capitalLeaseObligations ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Notes payable - Building A acquisition"
        name="notesPayableBuildingA"
        value={formData.notesPayableBuildingA ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Net Pension Liability"
        name="netPensionLiability"
        value={formData.netPensionLiability ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Net OPEB Liability"
        name="netOPEBLiability"
        value={formData.netOPEBLiability ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Line of Credit - Building A"
        name="lineOfCreditBuildingA"
        value={formData.lineOfCreditBuildingA ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Line of Credit - Building B"
        name="lineOfCreditBuildingB"
        value={formData.lineOfCreditBuildingB ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Debt service"
        name="debtService"
        value={formData.debtService ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths={4} className="total-fields">
      <Form.Input
        className="dotted-input"
        label={netWording}
        name="netLiabilities"
        value={formData.netLiabilities ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

LongTermLiabilitiesForm.propTypes = {
  formData: PropTypes.shape({
    accruedVacation: PropTypes.number,
    workersCompensation: PropTypes.number,
    accruedRetirementPlan: PropTypes.number,
    accruedLeaseGuaranty: PropTypes.number,
    capitalLeaseObligations: PropTypes.number,
    notesPayableBuildingA: PropTypes.number,
    netPensionLiability: PropTypes.number,
    netOPEBLiability: PropTypes.number,
    lineOfCreditBuildingA: PropTypes.number,
    lineOfCreditBuildingB: PropTypes.number,
    debtService: PropTypes.number,
    netLiabilities: PropTypes.number,
  }),
  netWording: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

LongTermLiabilitiesForm.defaultProps = {
  formData: {},
};

export default LongTermLiabilitiesForm;
