// src/components/EmptiesAndLogChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Log_Chart = ({ empties, log }) => {
  const emptiesCount = empties.length;
  const barNames = Object.keys(log);
  const drinksSentData = barNames.map(bar => log[bar].length);

  const labels = ['Empties', ...barNames];
  const dataValues = [emptiesCount, ...drinksSentData];
  const colors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ].slice(0, labels.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Count',
        data: dataValues,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.2', '1')),
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
      title: {
        display: true,
        text: 'Empties and Drinks Sent to Bars',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Log_Chart;
