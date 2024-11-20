import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LongTermLiabilitiesForm from './LongTermLiabilitiesForm';

/**
 * Component for Liabilities form for Balance Input Sheet
 */
const Liabilities = ({ formData, handleChange }) => (
  <Form>
    <Form.Input
      label="Accounts Payable and Accrued Liabilities"
      id="accountsPayable"
      name="accountsPayable"
      value={formData.accountsPayable ?? ''}
      onChange={handleChange}
      type="number"
    />

    <Form.Input
      label="Due to Fund"
      id="dueToFund"
      name="dueToFund"
      value={formData.dueToFund ?? ''}
      onChange={handleChange}
      type="number"
    />

    <Form.Input
      label="Due to Other Funds"
      id="dueToOtherFunds"
      name="dueToOtherFunds"
      value={formData.dueToOtherFunds ?? ''}
      onChange={handleChange}
      type="number"
    />

    <Segment>
      <h4>Long-term Liabilities - Due Within One Year</h4>
      <LongTermLiabilitiesForm
        formData={formData}
        handleChange={handleChange}
        netWording="Long-term liabilities - due within one year"
      />
    </Segment>

    <Segment>
      <h4>Long-term Liabilities - Due After One Year</h4>
      <LongTermLiabilitiesForm
        formData={formData}
        handleChange={handleChange}
        netWording="Long-term liabilities - due after one year"
      />
    </Segment>

    <Form.Input
      label="Total Liabilities"
      id="totalLiabilities"
      name="totalLiabilities"
      value={formData.totalLiabilities ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
    />

    <Form.Input
      label="Deferred inflows of resources related to pensions"
      id="deferredInflowsPensions"
      name="deferredInflowsPensions"
      value={formData.deferredInflowsPensions ?? ''}
      onChange={handleChange}
      type="number"
    />

    <Form.Input
      label="Deferred inflows of resources related to OPEB"
      id="deferredInflowsOPEB"
      name="deferredInflowsOPEB"
      value={formData.deferredInflowsOPEB ?? ''}
      onChange={handleChange}
      type="number"
    />

    <Form.Input
      label="Net liabilities & deferred inflows of resources"
      id="netLiabilitiesDeferredInflows"
      name="netLiabilitiesDeferredInflows"
      value={formData.netLiabilitiesDeferredInflows ?? ''}
      onChange={handleChange}
      type="number"
      readOnly
    />
  </Form>
);

Liabilities.propTypes = {
  formData: PropTypes.shape({
    accountsPayable: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dueToFund: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dueToOtherFunds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalLiabilities: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deferredInflowsPensions: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deferredInflowsOPEB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    netLiabilitiesDeferredInflows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func,
};

Liabilities.defaultProps = {
  formData: {},
  handleChange: () => {},
};

export default Liabilities;
