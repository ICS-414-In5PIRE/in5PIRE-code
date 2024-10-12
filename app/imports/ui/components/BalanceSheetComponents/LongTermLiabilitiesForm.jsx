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
        name={netWording === 'Long-term liabilities - due within one year' ? 'accruedVacationDueWithinOneYear' : 'accruedVacationDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.accruedVacationDueWithinOneYear ?? '' : formData.accruedVacationDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Workers' Compensation"
        name={netWording === 'Long-term liabilities - due within one year' ? 'workersCompensationDueWithinOneYear' : 'workersCompensationDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.workersCompensationDueWithinOneYear ?? '' : formData.workersCompensationDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Accrued Management Retirement Plan"
        name={netWording === 'Long-term liabilities - due within one year' ? 'accruedRetirementPlanDueWithinOneYear' : 'accruedRetirementPlanDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.accruedRetirementPlanDueWithinOneYear ?? '' : formData.accruedRetirementPlanDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Accrued Lease Guaranty Obligations"
        name={netWording === 'Long-term liabilities - due within one year' ? 'accruedLeaseGuarantyDueWithinOneYear' : 'accruedLeaseGuarantyDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.accruedLeaseGuarantyDueWithinOneYear ?? '' : formData.accruedLeaseGuarantyDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>

    <Form.Group widths="equal">
      <Form.Input
        label="Capital Lease Obligations"
        name={netWording === 'Long-term liabilities - due within one year' ? 'capitalLeaseObligationsDueWithinOneYear' : 'capitalLeaseObligationsDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.capitalLeaseObligationsDueWithinOneYear ?? '' : formData.capitalLeaseObligationsDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Notes payable - Building A acquisition"
        name={netWording === 'Long-term liabilities - due within one year' ? 'notesPayableBuildingADueWithinOneYear' : 'notesPayableBuildingADueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.notesPayableBuildingADueWithinOneYear ?? '' : formData.notesPayableBuildingADueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Net Pension Liability"
        name={netWording === 'Long-term liabilities - due within one year' ? 'netPensionLiabilityDueWithinOneYear' : 'netPensionLiabilityDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.netPensionLiabilityDueWithinOneYear ?? '' : formData.netPensionLiabilityDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Net OPEB Liability"
        name={netWording === 'Long-term liabilities - due within one year' ? 'netOPEBLiabilityDueWithinOneYear' : 'netOPEBLiabilityDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.netOPEBLiabilityDueWithinOneYear ?? '' : formData.netOPEBLiabilityDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>

    <Form.Group widths="equal">
      <Form.Input
        label="Line of Credit - Building A"
        name={netWording === 'Long-term liabilities - due within one year' ? 'lineOfCreditBuildingADueWithinOneYear' : 'lineOfCreditBuildingADueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.lineOfCreditBuildingADueWithinOneYear ?? '' : formData.lineOfCreditBuildingADueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Line of Credit - Building B"
        name={netWording === 'Long-term liabilities - due within one year' ? 'lineOfCreditBuildingBDueWithinOneYear' : 'lineOfCreditBuildingBDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.lineOfCreditBuildingBDueWithinOneYear ?? '' : formData.lineOfCreditBuildingBDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Debt service"
        name={netWording === 'Long-term liabilities - due within one year' ? 'debtServiceDueWithinOneYear' : 'debtServiceDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.debtServiceDueWithinOneYear ?? '' : formData.debtServiceDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>

    <Form.Group widths={4} className="total-fields">
      <Form.Input
        className="dotted-input"
        label={netWording}
        name={netWording === 'Long-term liabilities - due within one year' ? 'netLiabilitiesDueWithinOneYear' : 'netLiabilitiesDueAfterOneYear'}
        value={netWording === 'Long-term liabilities - due within one year' ? formData.netLiabilitiesDueWithinOneYear ?? '' : formData.netLiabilitiesDueAfterOneYear ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
        icon="calculator"
      />
    </Form.Group>
  </>
);

LongTermLiabilitiesForm.propTypes = {
  formData: PropTypes.shape({
    accruedVacationDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    workersCompensationDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    accruedRetirementPlanDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    accruedLeaseGuarantyDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    capitalLeaseObligationsDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    notesPayableBuildingADueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netPensionLiabilityDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netOPEBLiabilityDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lineOfCreditBuildingADueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lineOfCreditBuildingBDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    debtServiceDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netLiabilitiesDueWithinOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    accruedVacationDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    workersCompensationDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    accruedRetirementPlanDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    accruedLeaseGuarantyDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    capitalLeaseObligationsDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    notesPayableBuildingADueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netPensionLiabilityDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netOPEBLiabilityDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lineOfCreditBuildingADueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lineOfCreditBuildingBDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    debtServiceDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netLiabilitiesDueAfterOneYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  netWording: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

LongTermLiabilitiesForm.defaultProps = {
  formData: {},
};

export default LongTermLiabilitiesForm;
