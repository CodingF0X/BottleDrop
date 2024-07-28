import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Box } from '@mui/material';

// Register the components required for the Doughnut chart
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ beverages, log }) => {
  const beverageCounts = Object.keys(beverages).reduce((acc, beverageType) => {
    acc[beverageType] = beverages[beverageType].length;
    return acc;
  }, {});

  // Prepare the data for the Doughnut chart
  const data = {
    labels: Object.keys(beverageCounts),
    datasets: [
      {
        data: Object.values(beverageCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderColor: '#fff',
        borderWidth: 1
      }
    ]
  };

  // Prepare chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} items`;
          }
        }
      }
    }
  };

  return (
    <Box  display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    p={2}
    m={2}
    border={1}
    borderColor="grey.300"
    borderRadius={2}>
      <h2>Beverage Consumption Distribution</h2>
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default PieChart;
