import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { InvestmentStaticPercentages } from '../../../api/Investment/InvestmentStaticPercentagesCollection';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvestmentPercentagesTable = () => {
  // Fetch data from the collection
  const investmentData = useTracker(() => {
    Meteor.subscribe('investmentStaticPercentages');
    return InvestmentStaticPercentages.findOne();
  }, []);

  if (!investmentData) {
    return <div>Loading...</div>;
  }

  // Table rows data
  const rows = [
    {
      category: 'Traditional Global Equity',
      target: `${(investmentData.targetAllocationTraditionalGlobalEquity * 100).toFixed(2)}%`,
      return: `${(investmentData.compoundReturnTraditionalGlobalEquity * 100).toFixed(2)}%`,
      deviation: `${(investmentData.standardDeviationTraditionalGlobalEquity * 100).toFixed(2)}%`,
    },
    {
      category: 'Traditional Fixed Income',
      target: `${(investmentData.targetAllocationTraditionalFixedIncome * 100).toFixed(2)}%`,
      return: `${(investmentData.compoundReturnTraditionalFixedIncome * 100).toFixed(2)}%`,
      deviation: `${(investmentData.standardDeviationTraditionalFixedIncome * 100).toFixed(2)}%`,
    },
    {
      category: 'Traditional Real Assets',
      target: `${(investmentData.targetAllocationTraditionalRealAssets * 100).toFixed(2)}%`,
      return: `${(investmentData.compoundReturnTraditionalRealAssets * 100).toFixed(2)}%`,
      deviation: `${(investmentData.standardDeviationTraditionalRealAssets * 100).toFixed(2)}%`,
    },
    {
      category: 'Hedge Funds',
      target: `${(investmentData.targetAllocationHedgeFunds * 100).toFixed(2)}%`,
      return: `${(investmentData.compoundReturnHedgeFunds * 100).toFixed(2)}%`,
      deviation: `${(investmentData.standardDeviationHedgeFunds * 100).toFixed(2)}%`,
    },
    {
      category: 'Private Markets',
      target: `${(investmentData.targetAllocationPrivateMarkets * 100).toFixed(2)}%`,
      return: `${(investmentData.compoundReturnPrivateMarkets * 100).toFixed(2)}%`,
      deviation: `${(investmentData.standardDeviationPrivateMarkets * 100).toFixed(2)}%`,
    },
    {
      category: 'Enhanced Liquidity',
      target: `${(investmentData.targetAllocationEnhancedLiquidity * 100).toFixed(2)}%`,
      return: `${(investmentData.compoundReturnEnhancedLiquidity * 100).toFixed(2)}%`,
      deviation: `${(investmentData.standardDeviationEnhancedLiquidity * 100).toFixed(2)}%`,
    },
    {
      category: 'Hawaii Direct Investments',
      target: `${(investmentData.targetAllocationHawaiiDirectInvestments * 100).toFixed(2)}%`,
      return: `${(investmentData.compoundReturnHawaiiDirectInvestments * 100).toFixed(2)}%`,
      deviation: `${(investmentData.standardDeviationHawaiiDirectInvestments * 100).toFixed(2)}%`,
    },
  ];

  // Summary row
  const summary = {
    target: `${(investmentData.totalTargetAllocation * 100).toFixed(2)}%`,
    return: `${(investmentData.overallCompoundReturn * 100).toFixed(2)}%`,
    deviation: `${(investmentData.overallStandardDeviation * 100).toFixed(2)}%`,
  };

  return (
    <div className="container my-4">
      <h2>Investment Percentages Table</h2>
      <table className="table table-bordered mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Asset Category</th>
            <th>Target Asset Allocation</th>
            <th>Compound Return</th>
            <th>Standard Deviation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.category}</td>
              <td>{row.target}</td>
              <td>{row.return}</td>
              <td>{row.deviation}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{summary.target}</strong></td>
            <td><strong>{summary.return}</strong></td>
            <td><strong>{summary.deviation}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentPercentagesTable;
