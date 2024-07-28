// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BarPieChart = ({ selectedBar }) => {
  if (!selectedBar || selectedBar.beverageStockLength === 0) {
    return <div>No data available</div>;
  }

  const data = {
    labels: selectedBar.beverageStockDetails.map(detail => detail.Beverage_Type),
    datasets: [
      {
        label: '# of Beverages',
        data: selectedBar.beverageStockDetails.map(detail => detail.Beverages),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed) {
              label += `${context.parsed}`;
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        text: `Beverage Types: ${selectedBar.beverageStockLength} | Total Orders: ${selectedBar.ordersLength}`,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default BarPieChart;
