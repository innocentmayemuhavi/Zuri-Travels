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

  const { user, Cart } = useContext(FirebaseContext);

  const size = useScreenSize();
  return size.width > 1200 ? (
    <header>
      <div className="user_data_div">
      <div className="user_prof">
          {user.photoURL ? (
            <img src={user.photoURL} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
            </svg>
          )}
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
          {user.photoURL ? (
            <img src={user.photoURL} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
            </svg>
          )}
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
        {Cart.bookings.length + Cart.cars.length > 0 && (
          <div className="notification_indicator">
            {Cart.bookings.length + Cart.cars.length}
          </div>
        )}
      </div>
    </div>
  );
};
export { Header };
