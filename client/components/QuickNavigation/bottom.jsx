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
        to={"/contact"}
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
            <path d="M11.998 2.5A9.503 9.503 0 0 0 3.378 8H5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1V4.75a.75.75 0 0 1 1.5 0v1.697A10.997 10.997 0 0 1 11.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 0 1 1.5-.037 9.5 9.5 0 0 0 9.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5Z"></path>
            <path d="M12.5 7.25a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 0 0 .744-1.302L12.5 12.315V7.25Z"></path>
          </svg>
          <p>Activity</p>
        </div>
      </NavLink>
    </div>
  );
};

export { BottomNav };
