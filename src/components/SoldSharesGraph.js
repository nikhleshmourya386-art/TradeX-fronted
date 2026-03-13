// SoldSharesGraph.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SoldSharesGraph = ({ soldData }) => {
  const labels = soldData.map((item) => item.stockName);
  const pnlData = soldData.map((item) => Number(item.pnl));

  const data = {
    labels,
    datasets: [
      {
        label: "Profit / Loss (₹)",
        data: pnlData,
        backgroundColor: pnlData.map((pnl) => (pnl >= 0 ? "green" : "red")),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sold Shares Profit/Loss",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SoldSharesGraph;
