import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const NetAssets = ({ formData, handleChange }) => (
  <>
    <Form.Group widths="equal">
      <Form.Input
        label="Invested in Capital Assets, Net of Related Debt"
        name="capitalAssetsRelatedDebt"
        value={formData.capitalAssetsRelatedDebt}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Restricted - Federal Funds"
        name="restrictedFederalFunds"
        value={formData.restrictedFederalFunds}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Unrestricted"
        name="unrestricted"
        value={formData.unrestricted}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        className="dotted-input"
        label="Total Net Assets"
        name="totalNetAssets"
        value={formData.totalNetAssets}
        onChange={handleChange}
        type="number"
        readOnly
      />
      <Form.Input
        className="dotted-input"
        label="Total Liabilities and Net Assets"
        name="totalLiabilitiesNetAssets"
        value={formData.totalLiabilitiesNetAssets}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

NetAssets.propTypes = {
  formData: PropTypes.shape({
    capitalAssetsRelatedDebt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    restrictedFederalFunds: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    unrestricted: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalNetAssets: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalLiabilitiesNetAssets: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
};

NetAssets.defaultProps = {
  formData: [],
  handleChange: PropTypes.func,
};

export default NetAssets;
