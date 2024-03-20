import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { RadialChart } from "react-vis";
import { Bar } from "react-chartjs-2";
// import { Chart, LinearScale } from "chart.js";

import "./index.css";
import { Loader } from "../loading";
import { Header } from "../header";
// import { BarChart } from "@mui/x-charts/BarChart";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Nav from "../nav";
const DashBoard = () => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
  );
  const { isLoading, orders, signin, transactions } =
    useContext(FirebaseContext);
  const [no, setNo] = useState({
    hires: 0,
    bookings: 0,
    total: 0,
  });

  const key = "FacMP6gkbqa90AsNgfkBTVdZ9htaGqAB";
  const sec = "yzKJYxiVMjxSOYKl";

  console.log(transactions);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const totalBookings = orders.reduce((prev, current) => {
        return prev + current.bucket.bookings.length;
      }, 0);
      const totalHires = orders.reduce((prev, curr) => {
        return prev + curr.bucket.cars.length;
      }, 0);

      setNo({
        hires: totalHires,
        bookings: totalBookings,
        total: totalBookings + totalHires,
      });
    }

    console.log(orders);
  }, [orders]);

  const data = {
    labels: ["Total Car Hires", "Total Car Bookings"],
    datasets: [
      {
        label: "",
        data: [no.hires, no.bookings],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  transactions.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

  // Create labels and data for the chart
  const labels = transactions.map((transaction) =>
    new Date(transaction.timestamp.seconds * 1000).toLocaleDateString()
  );
  const data1 = transactions.map((transaction) => transaction.amount);
  console.log(data1, labels);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Transaction Amount",
        data: data1,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options1 = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  console.log(isLoading);

  return (
    <main className="fade">
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <main className="fade">
          <Header  title="DashBoard" />

          <>
            <h3>Total hires :{no.hires}</h3>
            <h3>Total bookings : {no.bookings}</h3>
            <h3>Total Hires And Orders : {no.total}</h3>
          </>

          <div className="chart">
            <Doughnut data={data} />
          </div>
        </main>
      )}
      {/* <button
        onClick={() => {
          signin("admin@gmail.com", "123456");
        }}
      >
        Login
      </button> */}
      <div className="chart">
        <Bar data={chartData} options={options1} />
      </div>
      <Nav />
    </main>
  );
};

export { DashBoard };
