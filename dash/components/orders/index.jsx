import "./index.css";
import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { useState } from "react";
import { useEffect } from "react";
import {Loader} from '../loading'
import { Header } from "../header";


const Orders = () => {
  const { orders, isLoading, updateState, list, updateState1 } =
    useContext(FirebaseContext);

  const [hiredCars, setHiredCars] = useState([]);

  const [bookings, setbookings] = useState([]);

  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (!isLoading) {
      setHiredCars((prev) => {
        return orders.flatMap((data) => data.bucket.cars);
      });
      setbookings((prev) => {
        return orders.flatMap((data) => data.bucket.bookings);
      });
    }
  }, [list]);

 

  const renderHiredCars = hiredCars.map((data, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <img className="order-picture" src={data.picture}></img>
      </td>
      <td>
        <a>
          <p
            onClick={() => {
              setProductData({ ...data });
              navigate("/hiredview");
            }}
          >
            {data.name}
          </p>
        </a>
      </td>

      <td>{data.drop_point}</td>
      <td>{data.pick_up}</td>
      <td>{data.days}</td>
      <td>{Math.round(data.amount * data.days).toLocaleString()}</td>

      <td className="order-status-td">
        <div
          onClick={async () => {
            console.log({
              uid: data.uid,
              id: data.id,
            });

            updateState(data.uid, data.id);
          }}
          className="order-status"
          style={{
            color: "black",
            background:
              data.status === "Pending"
                ? "red"
                : data.status === "Approved"
                ? "green"
                : "grey",
          }}
        >
          {data.status}
        </div>
      </td>
    </tr>
  ));

  const renderBookings = bookings.map((data, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <img className="order-picture" src={data.picture}></img>
      </td>
      <td>
        <a>
          <p
            onClick={() => {
              setProductData({ ...data });
              navigate("/hiredview");
            }}
          >
            {data.name}
          </p>
        </a>
      </td>

      <td>{data.time}</td>
      <td>{data.from}</td>
      <td>{data.to}</td>
      <td>{Math.round(data.price).toLocaleString()}</td>

      <td className="order-status-td">
        <div
          onClick={async () => {
            console.log({
              uid: data.uid,
              id: data.id,
            });

            updateState1(data.uid, data.id);
          }}
          className="order-status"
          style={{
            color: "black",
            background:
              data.status === "Pending"
                ? "red"
                : data.status === "Approved"
                ? "green"
                : "grey",
          }}
        >
          {data.status}
        </div>
      </td>
    </tr>
  ));

  return (

 
    <>
      {isLoading ? (
      <Loader/>
      ) : (
        <>
        <Header/>
          {" "}
          <div className="order-nav">
            <button
              style={{
                // backgroundColor: tab === 0 && "#21262d",
                // color: tab === 0 ? "white":'black',
                backgroundColor: "#21262d",
                border: tab === 0 && ` ${2}px solid white`,
              }}
              onClick={() => {
                setTab(0);
              }}
            >
              Hires
            </button>
            <button
              style={{
                backgroundColor: "#21262d",
                border: tab === 1 && ` ${2}px solid white`,
              }}
              onClick={() => {
                setTab(1);
              }}
            >
              Bookings
            </button>
          </div>
          {tab === 0 ? (
            <>
              <h1>Car Hires</h1>
            <div className="table-holder">
            <table>
                <thead>
                  <th>No</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Drop Point</th>
                  <th>Pick-Up Date</th>
                  <th>Days</th>
                  <th>Cost</th>
                  <th>State</th>
                </thead>
                <tbody>{renderHiredCars}</tbody>
              </table>
            </div>
            </>
          ) : (
            <>
              <h1>Car Bookings</h1>

            <div className="table-holder">
            <table>
                <thead>
                  <th>No</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Time</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Cost</th>
                  <th>Status</th>
                </thead>
                <tbody >{renderBookings}</tbody>
              </table>
            </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export { Orders };
