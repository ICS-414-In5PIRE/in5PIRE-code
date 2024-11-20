import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { StaticFinancials } from '../../../api/financial/StaticFinancialsCollection';
import { createChartConfig } from './CreateChartConfig';

const DataChart = ({ profileId, numYears }) => {
  const [chartDataConfigs, setChartDataConfigs] = useState({});

  // Get the current year and create an array for the desired year range
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: numYears }, (_, i) => currentYear + i + 1);

  // Fetch financial data dynamically based on `numYears`
  const financialData = useTracker(() => StaticFinancials.find(
    { profileId, year: { $in: years } },
    { sort: { year: 1 } },
  ).fetch());

  useEffect(() => {
    if (financialData.length > 0) {
      // Prepare datasets for each chart using financial data
      const assetsData = financialData.map((entry) => entry.assets);
      const liabilitiesData = financialData.map((entry) => entry.liabilities);
      const liquidityData = financialData.map((entry) => entry.liquidity);
      const opexData = financialData.map((entry) => entry.opex);
      const cashOnHandData = financialData.map((entry) => entry.cashOnHand);
      const debtData = financialData.map((entry) => entry.debt);

      // Set configurations dynamically for each chart type
      setChartDataConfigs({
        netPosition: createChartConfig(
          years,
          [
            {
              label: 'Assets',
              data: assetsData,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              yAxisID: 'y-axis-left',
            },
            {
              label: 'Liabilities',
              data: liabilitiesData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              yAxisID: 'y-axis-right',
            },
          ],
          'Assets',
          'Liabilities',
          `Net Position (${numYears} Years)`,
        ),
        yearsOfSolvency: createChartConfig(
          years,
          [
            {
              label: 'Liquidity',
              data: liquidityData,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              yAxisID: 'y-axis-left',
            },
            {
              label: 'Opex',
              data: opexData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              yAxisID: 'y-axis-right',
            },
          ],
          'Liquidity',
          'Opex (excluding lands)',
          `Years of Solvency (${numYears} Years)`,
        ),
        financing: createChartConfig(
          years,
          [
            {
              label: 'Cash on Hand',
              data: cashOnHandData,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              yAxisID: 'y-axis-left',
            },
            {
              label: 'Debt',
              data: debtData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              yAxisID: 'y-axis-right',
            },
          ],
          'Cash on Hand',
          'Debt',
          `Financing (${numYears} Years)`,
        ),
      });
    }
  }, [financialData, years, numYears]);

  return (
    <div>
      {chartDataConfigs.netPosition && (
        <Line data={chartDataConfigs.netPosition.data} options={chartDataConfigs.netPosition.options} />
      )}
      {chartDataConfigs.yearsOfSolvency && (
        <Line data={chartDataConfigs.yearsOfSolvency.data} options={chartDataConfigs.yearsOfSolvency.options} />
      )}
      {chartDataConfigs.financing && (
        <Line data={chartDataConfigs.financing.data} options={chartDataConfigs.financing.options} />
      )}
    </div>
  );
};

DataChart.propTypes = {
  profileId: PropTypes.string.isRequired,
  numYears: PropTypes.number.isRequired,
};
export default DataChart;
