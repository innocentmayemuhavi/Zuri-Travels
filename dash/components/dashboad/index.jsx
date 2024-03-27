import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { RadialChart } from "react-vis";
import { Bar } from "react-chartjs-2";
// import { Chart, LinearScale } from "chart.js";
import { Link } from "react-router-dom";
import "./index.css";
import { Loader } from "../loading";
import { Header } from "../header";
// import { BarChart } from "@mui/x-charts/BarChart";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
import TransactionChart from "../charts/bar";
const DashBoard = () => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
  );
  const { isLoading, orders, signin, transactions, allOrders } =
    useContext(FirebaseContext);
  const [no, setNo] = useState({
    hires: 0,
    bookings: 0,
    total: 0,
  });

  const key = "FacMP6gkbqa90AsNgfkBTVdZ9htaGqAB";
  const sec = "yzKJYxiVMjxSOYKl";

  console.log(allOrders);

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
  }, [orders]);

  const completedTransactions = transactions
    .filter((data) => data.status === "Completed")
    .slice(0, 7);

  const totalHireAmount = completedTransactions.reduce((total, transaction) => {
    return total + transaction.hireAmount;
  }, 0);

  const totalBookingAmount = completedTransactions.reduce(
    (total, transaction) => {
      return total + transaction.bookingsAmount;
    },
    0
  );

  const data = {
    labels: ["Total Car Hires", "Total Car Bookings"],
    datasets: [
      {
        label: "",
        data: [allOrders.hires.length, allOrders.bookings.length],
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

  const renderCompletedTransactions = completedTransactions.map(
    (transaction, index) => {
      console.log();
      const date = transaction.timestamp.toDate();
      const formattedDate = date.toDateString();

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const formattedTime = `${hours}:${minutes}:${seconds}`;

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{transaction.code}</td>
          <td>{parseInt(transaction.amount).toLocaleString()}</td>
          <td>{formattedDate}</td>
        </tr>
      );
    }
  );
  return (
    <main className="fade">
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <main className="fade">
          <Header title="DashBoard" />
          <div className="progress-flex">
            <div className="progress_div">
              <div>
                <h3>Car Hires</h3>
                <h4>{parseInt(allOrders.hires.length).toLocaleString()}</h4>
              </div>

              <CircularProgressbar
                value={
                  allOrders.hires.length === 0
                    ? 0
                    : (allOrders.hires.length /
                        (allOrders.hires.length + allOrders.bookings.length)) *
                      100
                }
                text={`${Math.floor(
                  allOrders.hires.length === 0
                    ? 0
                    : (allOrders.hires.length /
                        (allOrders.hires.length + allOrders.bookings.length)) *
                        100
                )} %`}
                height={100}
                className="progress"
                backgroundPadding={30}
              />
            </div>

            <div className="progress_div">
              <div>
                <h3>Car Bookings</h3>
                <h4>{parseInt(allOrders.bookings.length).toLocaleString()}</h4>
              </div>
              <CircularProgressbar
                value={
                  allOrders.bookings.length === 0
                    ? 0
                    : (allOrders.bookings.length /
                        (allOrders.hires.length + allOrders.bookings.length)) *
                      100
                }
                text={`${Math.floor(
                  allOrders.bookings.length === 0
                    ? 0
                    : (allOrders.bookings.length /
                        (allOrders.hires.length + allOrders.bookings.length)) *
                        100
                )} %`}
                height={100}
                className="progress"
                backgroundPadding={30}
              />
            </div>
            <div className="progress_div">
              <div>
                <h3>Hires Revenues</h3>
                <h4>Ksh.{parseInt(totalHireAmount).toLocaleString()}</h4>
              </div>
              <CircularProgressbar
                value={
                  totalHireAmount === 0
                    ? 0
                    : (totalHireAmount /
                        (totalBookingAmount + totalHireAmount)) *
                      100
                }
                text={`${Math.floor(
                  totalHireAmount === 0
                    ? 0
                    : (totalHireAmount /
                        (totalBookingAmount + totalHireAmount)) *
                        100
                )} %`}
                height={100}
                className="progress"
                backgroundPadding={30}
              />
            </div>
            <div className="progress_div">
              <div>
                <h3>Bookings Revenue</h3>
                <h4>Ksh.{parseInt(totalBookingAmount).toLocaleString()}</h4>
              </div>
              <CircularProgressbar
                value={
                  totalBookingAmount === 0
                    ? 0
                    : (totalBookingAmount /
                        (totalBookingAmount + totalHireAmount)) *
                      100
                }
                text={
                  totalBookingAmount === 0
                    ? "0 %"
                    : `${Math.floor(
                        (totalBookingAmount /
                          (totalBookingAmount + totalHireAmount)) *
                          100
                      )} %`
                }
                height={100}
                className="progress"
                backgroundPadding={30}
              />
            </div>
          </div>

          {allOrders.hires.length >= 0 && allOrders.bookings.length >= 0 && (
            <div className="chart">
              <div className="table_title">
                <h3>Total Hires And Orders Pie Chart</h3>
              </div>
              <Doughnut data={data} />
            </div>
          )}
        </main>
      )}
      {/* <button
        onClick={() => {
          signin("admin@gmail.com", "123456");
        }}
      >
        Login
      </button> */}
      <div className="chart_flex">
        <div className="chart">
          <div className="table_title">
            <h3>Total Weekly Transactions</h3>
            <Link to={"/transactionschart"}>Generate Report</Link>
          </div>
          <TransactionChart />
        </div>
        <div className="table_holder">
          <div className="table_title">
            <h3>Recent Transactions</h3>

            <Link to={"/transactions"}>View All</Link>
          </div>
          <table>
            <thead>
              <th>SN</th>
              <th>T-Code</th>
              <th>Amount</th>
              <th>Date</th>
            </thead>

            <tbody>{renderCompletedTransactions}</tbody>
          </table>
        </div>
      </div>
      <Nav />
    </main>
  );
};

export { DashBoard };
