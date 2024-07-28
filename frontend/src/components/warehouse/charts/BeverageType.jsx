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

const BeverageTypesChart = ({ beverages }) => {
  const beverageTypes = Object.keys(beverages);
  const beverageData = beverageTypes.map(type => beverages[type].length);
  const colors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)'
  ].slice(0, beverageTypes.length);

  const data = {
    labels: beverageTypes,
    datasets: [
      {
        label: 'Number of Beverages',
        data: beverageData,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.2', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Beverage Types Inventory',
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '600px' }}>
    <Bar data={data} options={options} />
  </div>
  )
};

export default BeverageTypesChart;
