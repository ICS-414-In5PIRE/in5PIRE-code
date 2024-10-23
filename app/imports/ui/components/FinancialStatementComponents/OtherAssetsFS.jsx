import React from 'react';
import PropTypes from 'prop-types';
import { Form, Divider } from 'semantic-ui-react';

const OtherAssetsFS = ({ formData, handleChange }) => (
  <>
    <Form.Group widths="equal">
      <Form.Input
        label="Accounts Receivable"
        name="accountsReceivable"
        value={formData.accountsReceivable}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Due From Other Fund"
        name="dueFromOtherFund"
        value={formData.dueFromOtherFund}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Interest and Dividends Receivable"
        name="interestAndDividends"
        value={formData.interestAndDividends}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Inventory, Prepaid Items and Other Assets"
        name="inventoryPrepaidAndOthers"
        value={formData.inventoryPrepaidAndOthers}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Notes Receivable - Due Within One Year"
        name="notesReceivableWithinOneYear"
        value={formData.notesReceivableWithinOneYear}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Input
        label="Notes Receivable - Due After One Year"
        name="notesReceivableAfterOneYear"
        value={formData.notesReceivableAfterOneYear}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Security Deposits"
        name="securityDeposits"
        value={formData.securityDeposits}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Investments"
        name="investments"
        value={formData.investments}
        onChange={handleChange}
        type="number"
      />
      <Form.Input
        label="Capital Assets - Net"
        name="netCapitalAssets"
        value={formData.netCapitalAssets}
        onChange={handleChange}
        type="number"
      />
    </Form.Group>
    <Form.Group className="total-fields">
      <Form.Input
        width={4}
        className="dotted-input"
        label="Total Other Assets"
        name="totalOtherAssets"
        value={formData.totalOtherAssets}
        onChange={handleChange}
        type="number"
        readOnly
      />
    </Form.Group>
    <Divider />
    <Form.Group>
      <Form.Field width={4}>
        <Form.Input
          label="Deferred Outflows of Resources"
          name="deferredOutflowsOfResources"
          value={formData.deferredOutflowsOfResources}
          onChange={handleChange}
          type="number"
        />
      </Form.Field>
      <Form.Field width={4} style={{ marginLeft: 'auto' }}>
        <Form.Input
          label="Total Assets and Deferred Outflows of Resources"
          className="dotted-input"
          name="totalAssetsAndDeferredOutflows"
          value={formData.totalAssetsDeferredOutflows}
          onChange={handleChange}
          type="number"
          readOnly
        />
      </Form.Field>
    </Form.Group>
  </>
);

OtherAssetsFS.propTypes = {
  formData: PropTypes.shape({
    accountsReceivable: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dueFromOtherFund: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    interestAndDividends: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    inventoryPrepaidAndOthers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    notesReceivableWithinOneYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    notesReceivableAfterOneYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    securityDeposits: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    investments: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    netCapitalAssets: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalOtherAssets: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    deferredOutflowsOfResources: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalAssetsDeferredOutflows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleChange: PropTypes.func,
};

OtherAssetsFS.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default OtherAssetsFS;
