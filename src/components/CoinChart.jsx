const API = import.meta.env.VITE_API_COIN_URL
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);
const CoinCart = ({ coinId }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
  const fetchChartData = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );
    const data = await res.json();

    const prices = data.prices.map((price) => ({
      x: price[0],
      y: price[1],
    }));

    setChartData({
      datasets: [
        {
          label: 'Price (USD)',
          data: prices,
           fill: true, // Area under the line is filled
  borderColor: '#007bff', // Line color
  backgroundColor: 'rgba(0, 123, 255, 0.1)', // Fill color
  pointRadius: 0, // Hides points
  tension: 0.3, // Smooths out the line
        },
      ],
    });
    setLoading(false);
  };

  fetchChartData();
}, [coinId]);

if (loading) return <p>Loading chart...</p>;

  return (
  <div style={{ marginTop: '30px' }}>
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
            legend: { display: false }, // Hide the legend
            tooltip: { mode: 'index', intersect: false }, // Tooltip appears when hovering near a point
        },
        scales: {
        x: {
  type: 'time', // Uses date-based axis
  time: {
    unit: 'day', // Each tick on the axis represents a day
  },
  ticks: {
    autoSkip: true, // Skip ticks if there are too many
    maxTicksLimit: 7, // Show at most 7 ticks
},
},
        y: {
  ticks: {
    callback: (value) => `$${value.toLocaleString()}`, // Format numbers like $25,000
  },
}
        },
      }}
    />
  </div>
);
}
 
export default CoinCart;