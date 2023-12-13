import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { or } from "firebase/firestore";
import Chart from "react-apexcharts";
const DashBoard = () => {
  const { isLoading, orders } = useContext(FirebaseContext);
  const [no, setNo] = useState(0);
  console.log(orders);

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

  console.log(no);

  console.log(isLoading);

  const state = {
    series: [no.bookings, no.hires],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
          total: {
            show: true,
            label: "Total",
            formatter: () => {
              return 4;
            },
          },
        },
      },
      labels: ["Bookings", "Hires"],
    },
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <title>DashBoad</title>
          <h1>Dash</h1>

          <>
            <h3>Total hires :{no.hires}</h3>
            <h3>Total bookings : {no.bookings}</h3>
            <h3>Total Hires And Orders : {no.total}</h3>
          </>

          <Chart
            options={state.options}
            series={state.series}
            width={380}
            type="donut"
          />
        </>
      )}
    </>
  );
};

export { DashBoard };
