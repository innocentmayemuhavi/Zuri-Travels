import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { RadialChart } from "react-vis";
import "./index.css";
import { Loader } from "../loading";
import { Header } from "../header";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
const DashBoard = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { isLoading, orders } = useContext(FirebaseContext);
  const [no, setNo] = useState({
    hires: 0,
    bookings: 0,
    total: 0,
  });

  const key = "FacMP6gkbqa90AsNgfkBTVdZ9htaGqAB";
  const sec = "yzKJYxiVMjxSOYKl";

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


  console.log(isLoading)

  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <title>DashBoad</title>
          <h1>Dash</h1>

          <>
            <h3>Total hires :{no.hires}</h3>
            <h3>Total bookings : {no.bookings}</h3>
            <h3>Total Hires And Orders : {no.total}</h3>
          </>

          <div className="chart">
            <Doughnut data={data} />
          </div>
        </>
      )}
    </>

    
  );
};

export { DashBoard };
