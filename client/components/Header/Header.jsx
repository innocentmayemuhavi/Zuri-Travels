import { AuthContext } from "../../src/Assets/Context";
import React from "react";
import { useContext } from "react";
import { Notifications } from "../notification/Notification";
import { Account } from "../Account/Account";
import { useState, useEffect } from "react";
import "./index.css";
import { HeaderNav } from "../QuickNavigation/Headernav";
import { Phonenav } from "../QuickNavigation/PhoneNav";
import { useNavigate, NavLink } from "react-router-dom";
import useScreenSize from "../utils/screensize";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";

const Header = () => {
  const navigate = useNavigate();
  const {
    showNotification,
    showAccount,
    setShowaccount,
    showPhoneNav,
    setShowPhoneNav,
    setShowSliderButton,
  } = useContext(AuthContext);

  const { user } = useContext(FirebaseContext);

  const size = useScreenSize();
  return size.width > 1200 ? (
    <header>
      <div className="user_data_div">
        <div className="user_prof">
          <img src={user.photoURL ? user.photoURL : "/images/userprof.png"} />
        </div>
        <div className="user_prof_data">
          <h3>
            Hello,
            {user.displayName
              ? user.displayName.slice(0, 10) + "..." ?? "There"
              : "There"}
          </h3>

          <p>Welcome back</p>
        </div>
      </div>
      <div>
        <section className="desktop-nav">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "linkActive" : "navigationlink"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/carbooking"
            className={({ isActive }) =>
              isActive ? "linkActive" : "navigationlink"
            }
          >
            Booking
          </NavLink>
          <NavLink
            to={"/carhire"}
            className={({ isActive }) =>
              isActive ? "linkActive" : "navigationlink"
            }
          >
            Car Hire
          </NavLink>
          {/* <NavLink
  to={"/addingcar"}
  className={({ isActive }) => (isActive ? "linkActive" : "navigationlink")}
>
Add Car
</NavLink> */}
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive ? "linkActive" : "navigationlink"
            }
          >
            About
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? "linkActive" : "navigationlink"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to={"/mycars"}
            className={({ isActive }) =>
              isActive ? "linkActive" : "navigationlink"
            }
          >
            My Cars
          </NavLink>
          <NavLink
            to={"/account"}
            className={({ isActive }) =>
              isActive ? "linkActive" : "navigationlink"
            }
          >
            Account
          </NavLink>
        </section>
      </div>
    </header>
  ) : (
    <div className="header-mobile">
      <div className="user_data_div">
        <div className="user_prof">
          <img src={user.photoURL ? user.photoURL : "/images/userprof.png"} />
        </div>
        <div className="user_prof_data">
          <h3>
            Hello,
            {user.displayName
              ? user.displayName.slice(0, 10) + "..." ?? "There"
              : "There"}
          </h3>

          <p>Welcome back</p>
        </div>
      </div>
      <div className="cart_avatar" onClick={() => navigate("/mycars")}>
        <img src="/images/Untitled.png" height={35} width={35} />
      </div>
    </div>
  );
};
export { Header };
