import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Holdings",
    },
  },
};

// Functional component
export function VerticalGraph({ data }) {
  // Defensive check to prevent crash if data is undefined or malformed
  if (
    !data ||
    typeof data !== "object" ||
    !Array.isArray(data.labels) ||
    !Array.isArray(data.datasets)
  ) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No holdings data to display.</p>;
  }

  return <Bar options={options} data={data} />;
}
