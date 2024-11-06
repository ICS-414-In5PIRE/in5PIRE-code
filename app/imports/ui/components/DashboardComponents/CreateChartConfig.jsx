export const createChartConfig = (labels, datasets, error, leftAxisTitle, rightAxisTitle, chartTitle) => ({
  data: {
    labels,
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      // Assuming error is an array of error bars (for each dataset)
      // Error bars are defined in each data point
      data: dataset.data.map((dataPoint, i) => ({
        x: i, // Use index for x-axis
        y: dataPoint,
        // Extract error bar values
        error: error[index] ? error[index].dataPoints[i].y : null, // Assuming error[index].dataPoints[i].y is an array like [lowerBound, upperBound]
      })),
    })),
  },
  options: {
    scales: {
      x: {
        type: 'category',
        labels: labels, // Use your labels for the x-axis
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: leftAxisTitle,
        },
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: rightAxisTitle,
        },
        grid: {
          drawOnChartArea: false, // Prevent grid overlap
        },
      },
    },
    plugins: {
      annotation: {
        annotations: datasets.map((dataset, index) => datasets.data.map((dataPoint, i) => {
          if (error[index] && error[index].dataPoints[i].y) {
            const [lowerBound, upperBound] = error[index].dataPoints[i].y;
            return {
              type: 'box',
              xScaleID: 'x', // Use x-axis for positioning
              yScaleID: 'y', // Use y-axis for positioning
              xMin: i,
              xMax: i,
              yMin: lowerBound,
              yMax: upperBound,
              // Add styling for error bars
              borderColor: 'red',
              borderWidth: 2,
              backgroundColor: 'rgba(255, 0, 0, 0.2)', // Optional background color
            };
          } else {
            return null;
          }
        })).flat(), // Flatten the array of annotations
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  },
});
