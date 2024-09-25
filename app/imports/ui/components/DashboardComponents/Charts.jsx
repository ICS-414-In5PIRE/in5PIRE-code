import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const DataChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        const data = response.data;
        setChartData({
          labels: data.map(item => item.label),
          datasets: [
            {
              label: 'Dataset Example',
              data: data.map(item => item.value),
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              fill: true,
            }
          ],
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          {chartData ? (
            <Line data={chartData} />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DataChart;
