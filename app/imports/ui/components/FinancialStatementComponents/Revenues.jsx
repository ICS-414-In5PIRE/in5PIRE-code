import React from 'react';
import { Tab, Segment } from 'semantic-ui-react';
import ProgramRevenues from './ProgramRevenues';
import GeneralRevenues from './GeneralRevenues';
import Expenditures from './Expenditures';
import FundBalances from './FundBalances';

const Revenues = ({ formData, handleChange }) => {
  const panes = [
    {
      menuItem: 'Program Revenues',
      render: () => (
        <Tab.Pane>
          <ProgramRevenues formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'General Revenues',
      render: () => (
        <Tab.Pane>
          <GeneralRevenues formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Expenditures',
      render: () => (
        <Tab.Pane>
          <Expenditures formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Fund Balances',
      render: () => (
        <Tab.Pane>
          <FundBalances formData={formData} handleChange={handleChange} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Tab panes={panes} />
  );
};

export default Revenues;