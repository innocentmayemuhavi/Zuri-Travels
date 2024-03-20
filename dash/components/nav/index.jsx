import { useContext } from "react";
import "./index.css";

import { NavLink } from "react-router-dom";
import { AppContext } from "../context/appcontext";
const Nav = () => {
  const { setShowNav } = useContext(AppContext);

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
      </NavLink>
    </div>
  );
};

export default Nav;
