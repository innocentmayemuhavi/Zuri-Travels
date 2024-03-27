import { useContext, useEffect, useState } from "react";
import "./index.css";

import { NavLink } from "react-router-dom";
import { AppContext } from "../context/appcontext";
import { FirebaseContext } from "../context/firebase";
const Nav = () => {
  const { setShowNav } = useContext(AppContext);
  const { orders, list, isLoading, transactions } = useContext(FirebaseContext);

  console.log(orders);
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

  const filterBookings = bookings.filter((data) => data.status === "Pending");
  const filterHiredCars = hiredCars.filter((data) => data.status === "Pending");
  const filterTransactions = transactions.filter(
    (data) => data.status === "Pending"
  );

  return (
    <div className="nav-container">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "nav-active" : "nav")}
      >
        <img src="./icons/chat-arrow-grow.svg" className="active" height={25} />
        <img src="./icons/chat-arrow-grow.png" className="not-active" />
      </NavLink>

      <NavLink
        to={"/orders"}
        className={({ isActive }) => (isActive ? "nav-active" : "nav")}
      >
        <img src="./icons/to-do-alt.svg" className="active" height={25} />
        <img src="./icons/to-do-alt.png" className="not-active" />
        {filterBookings.length + filterHiredCars.length > 0 && (
          <div className="notification_indicator">
            {filterBookings.length + filterHiredCars.length}
          </div>
        )}
      </NavLink>
      <NavLink
        to={"/addcars"}
        className={({ isActive }) => (isActive ? "nav-active" : "nav")}
      >
        <img src="./icons/plus.svg" className="active" height={25} />
        <img src="./icons/plus (1).png" className="not-active" />
      </NavLink>
      <NavLink
        to={"/vehiclemanagement"}
        className={({ isActive }) => (isActive ? "nav-active" : "nav")}
      >
        <img
          src="./icons/car-bus (1).svg"
          height={25}
          width={20}
          fill="red"
          className="active"
        ></img>{" "}
        <img
          src="./icons/car-bus.png"
          height={23}
          width={20}
          fill="red"
          className="not-active"
        ></img>{" "}
      </NavLink>
      <NavLink
        to={"/transactions"}
        className={({ isActive }) => (isActive ? "nav-active" : "nav")}
      >
        <img src="./icons/coins.svg" className="active" height={25} />
        <img src="./icons/coins.png" className="not-active" height={25} />
        {filterTransactions.length > 0 && (
          <div className="notification_indicator">
            {filterTransactions.length}
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default Nav;
