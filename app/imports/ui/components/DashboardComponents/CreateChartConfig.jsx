export const createChartConfig = (labels, datasets, leftAxisTitle, rightAxisTitle, chartTitle) => ({
  data: {
    labels,
    datasets,
  },
  options: {
    scales: {
      'y-axis-left': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: leftAxisTitle,
        },
        ticks: {
          beginAtZero: true,
        },
      },
      'y-axis-right': {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: rightAxisTitle,
        },
        ticks: {
          beginAtZero: true,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
  },
});
