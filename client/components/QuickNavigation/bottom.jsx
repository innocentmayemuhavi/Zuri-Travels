import { NavLink } from "react-router-dom";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCab,
  faCar,
  faCarOn,
} from "@fortawesome/free-solid-svg-icons";
const BottomNav = () => {
  return (
    <div className="phone-navigation">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "bottom-nav-active" : "bottom-nav"
        }
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z"></path>
          </svg>
          <p>Home</p>
        </div>
      </NavLink>

      <NavLink
        to={"/carbooking"}
        className={({ isActive }) =>
          isActive ? "bottom-nav-active" : "bottom-nav"
        }
      >
        <div>
          <FontAwesomeIcon icon={faBus} className="nav-icons" />
          <p>Car booking</p>
        </div>
      </NavLink>
      <NavLink
        to={"/carhire"}
        className={({ isActive }) =>
          isActive ? "bottom-nav-active" : "bottom-nav"
        }
      >
        <div>
          <FontAwesomeIcon icon={faCarOn} className="nav-icons" />
          <p>CarHire</p>
        </div>
      </NavLink>
      <NavLink
        to={"/account"}
        className={({ isActive }) =>
          isActive ? "bottom-nav-active" : "bottom-nav"
        }
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
          </svg>
          <p>Account</p>
        </div>
      </NavLink>
    </div>
  );
};

export { BottomNav };
