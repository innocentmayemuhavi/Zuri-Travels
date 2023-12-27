import { useContext } from "react";
import "./index.css";

import { NavLink } from "react-router-dom";
import { AppContext } from "../context/appcontext";
const Nav = () => {
  const { setShowNav } = useContext(AppContext);

  return (
    <div
      className="overlay"
      onClick={() => {
        console.log("click");
        setShowNav(prev=>!prev)
      }}
    >
      <div className="nav-container">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "nav-active" : "nav")}
        >
          Home
        </NavLink>

        <NavLink
          to={"/orders"}
          className={({ isActive }) => (isActive ? "nav-active" : "nav")}
        >
          Orders
        </NavLink>
        <NavLink
          to={"/addcars"}
          className={({ isActive }) => (isActive ? "nav-active" : "nav")}
        >
          Add Car
        </NavLink>
        <NavLink
          to={"/vehiclemanagement"}
          className={({ isActive }) => (isActive ? "nav-active" : "nav")}
        >
        Vehicle Management
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
