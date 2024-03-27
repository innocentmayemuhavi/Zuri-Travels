import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { FirebaseContext } from "../context/firebase";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";
const TransactionChart = () => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
  );
  const { transactions } = useContext(FirebaseContext);
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Sum the transaction amounts by weekday
  const transactionsByWeekday = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.timestamp.seconds * 1000);
    const weekday = weekdays[(date.getDay() + 6) % 7]; // Adjust for getDay's 0-index on Sunday
    
    // Initialize the weekday key with a starting sum of 0 if not already present
    if (!acc[weekday]) {
      acc[weekday] = 0;
    }
    
    // Add the current transaction's amount to the sum for its weekday
    acc[weekday] += transaction.amount; // Assuming `amount` is the property for the transaction's value

    return acc;
  }, {});

  const labels = weekdays;
  const data = labels.map((label) => transactionsByWeekday[label] || 0); // Use the sum of amounts directly

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Transaction Amount",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            // This ensures that tick labels are formatted as whole numbers
            return value.toFixed(0);
          }
        }
      }
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default TransactionChart;
