import React from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CashAndCashEquivalents from './CashAndCashEquivalentsFS';
import OtherAssets from './OtherAssetsFS';
import Liabilities from './LiabilitiesFS';
import NetAssets from './NetAssets';

const NetPosition = ({ formData, handleChange }) => {
  const panes = [
    {
      menuItem: 'Cash and Cash Equivalents',
      render: () => (
        <Tab.Pane>
          <CashAndCashEquivalents formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Other Assets',
      render: () => (
        <Tab.Pane>
          <OtherAssets formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Liabilities',
      render: () => (
        <Tab.Pane>
          <Liabilities formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Net Assets',
      render: () => (
        <Tab.Pane>
          <NetAssets formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Tab panes={panes} />
  );
};

NetPosition.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  handleChange: PropTypes.func,
};

NetPosition.defaultProps = {
  formData: [],
  handleChange: () => {},
};

export default NetPosition;
