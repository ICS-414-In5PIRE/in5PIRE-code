import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Revenue = ({ formData, handleChange, canEdit }) => (
  <Form.Group widths="equal">
    <Form.Input
      label="5% of the Investment Portfolio"
      name="fivePercent"
      value={formData.fivePercent ?? ''}
      onChange={handleChange}
      type="number"
      readOnly={!canEdit}
    />
    <Form.Input
      label="Revenues"
      name="revenues"
      value={formData.revenues ?? ''}
      onChange={handleChange}
      type="number"
      readOnly={!canEdit}
    />
    <Form.Input
      label="General Fund"
      name="generalFund"
      value={formData.generalFund ?? ''}
      onChange={handleChange}
      type="number"
      readOnly={!canEdit}
    />
    <Form.Input
      label="Core Operating Budget NOT Authorized"
      name="coreOperatingBudget"
      value={formData.coreOperatingBudget ?? ''}
      onChange={handleChange}
      type="number"
      readOnly={!canEdit}
    />
    <Form.Input
      className="dotted-input"
      label="Total Revenue"
      name="totalRevenue"
      value={formData.totalRevenue ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
    />
  </Form.Group>
);

Revenue.propTypes = {
  formData: PropTypes.shape({
    fivePercent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    revenues: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    generalFund: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    coreOperatingBudget: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalRevenue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
  canEdit: PropTypes.bool,
};

Revenue.defaultProps = {
  formData: {},
  handleChange: () => {},
  canEdit: true,
};

export default Revenue;
