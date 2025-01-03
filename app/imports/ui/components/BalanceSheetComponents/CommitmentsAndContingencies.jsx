import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Component for Commitments and Contingencies form for Balance Input Sheet
 */
const CommitmentsAndContingencies = ({ formData, handleChange, canEdit }) => (
  <>
    <Form.Group widths="equal">
      <Form.Input
        label="Invested in capital assets, net of related debt"
        name="investedInCapitalAssets"
        value={formData.investedInCapitalAssets ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Restricted - federal funds"
        name="restrictedFederalFunds"
        value={formData.restrictedFederalFunds ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
      <Form.Input
        label="Unrestricted"
        name="unrestricted"
        value={formData.unrestricted ?? ''}
        onChange={handleChange}
        type="number"
        readOnly={!canEdit}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        className="dotted-input"
        label="Total net position"
        name="totalNetPosition"
        value={formData.totalNetPosition ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
        icon="calculator"
      />
      <Form.Input
        className="dotted-input"
        label="Total Liabilities, Deferred Inflows of Resources and Net Position"
        name="totalLiabilitiesDeferredNetPosition"
        value={formData.totalLiabilitiesDeferredNetPosition ?? ''}
        onChange={handleChange}
        type="number"
        readOnly
        icon="calculator"
      />
    </Form.Group>
  </>
);

CommitmentsAndContingencies.propTypes = {
  formData: PropTypes.shape({
    investedInCapitalAssets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    restrictedFederalFunds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unrestricted: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalNetPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalLiabilitiesDeferredNetPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func,
  canEdit: PropTypes.bool,
};

CommitmentsAndContingencies.defaultProps = {
  formData: {},
  handleChange: () => {},
  canEdit: true,
};

export default CommitmentsAndContingencies;
