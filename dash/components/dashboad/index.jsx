import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import Chart from "react-apexcharts";

import { Loader } from "../loading";
import { Header } from "../header";
const DashBoard = () => {
  const { isLoading, orders } = useContext(FirebaseContext);
  const [no, setNo] = useState(0);
  console.log(orders);

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

  const state = {
          
    series: [44, 55, 67, 83],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249
              }
            }
          }
        }
      },
      labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    },
  
  
  };

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

          <Chart
            options={state.options}
            series={state.series}
            width={380}
            type="donut"
          />


    

          {/* <button
            onClick={async () => {
              const auth = new Buffer(`${key}:${sec}`).toString("base64");
              try {
                await fetch(
                  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
                  {
                    headers: {
                      Authorization: `Basic ${auth}`,
                    },
                  }
                ).then((data) => console(data.json()));
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Generate
          </button> */}
        </>
      )}
    </>
  );
};

export { DashBoard };
