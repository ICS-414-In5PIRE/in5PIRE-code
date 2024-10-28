import React from 'react';
import PropTypes from 'prop-types';
import { Form, Divider } from 'semantic-ui-react';

const LiabilitiesFS = ({ formData, handleChange }) => (
  <>
    <Form.Group widths="equal">
      <Form.Input
        label="Accounts Payable and Accrued Liabilities"
        name="accountsPayableAndAccruedLiabilities"
        value={formData.accountsPayableAndAccruedLiabilities}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Due to Fund"
        name="dueToFund"
        value={formData.dueToFund}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Due to Other Funds"
        name="dueToOtherFunds"
        value={formData.dueToOtherFunds}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Long-term Liabilities - Due Within One Year"
        name="longTermLiabilitiesWithinOneYear"
        value={formData.longTermLiabilitiesWithinOneYear}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Long-term Liabilities - Due After One Year"
        name="longTermLiabilitiesAfterOneYear"
        value={formData.longTermLiabilitiesAfterOneYear}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group className="total-fields">
      <Form.Input
        width={4}
        className="dotted-input"
        label="Total Liabilities"
        name="totalLiabilities"
        value={formData.totalLiabilities}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
    <Divider />
    <Form.Group widths="equal">
      <Form.Input
        label="Deferred Inflows of Resources"
        name="deferredInflowsResources"
        value={formData.deferredInflowsResources}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Deferred Infows of OPEB"
        name="deferredInflowsOPEB"
        value={formData.deferredInflowsOPEB}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group className="total-fields">
      <Form.Input
        width={4}
        className="dotted-input"
        label="Total Liabilities and Deferred Inflows of Resources"
        name="totalLiabilitiesAndDeferredInflows"
        value={formData.totalLiabilitiesDeferredInflows}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
  </>
);

LiabilitiesFS.propTypes = {
  formData: PropTypes.shape({
    accountsPayableAndAccruedLiabilities: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dueToFund: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dueToOtherFunds: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    longTermLiabilitiesWithinOneYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    longTermLiabilitiesAfterOneYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalLiabilities: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    deferredInflowsResources: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    deferredInflowsOPEB: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalLiabilitiesDeferredInflows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
};

LiabilitiesFS.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default LiabilitiesFS;
