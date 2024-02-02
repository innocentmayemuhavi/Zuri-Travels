import { useContext } from "react";
import "./index.css";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusSimple,
  faCab,
  faCar,
  faCarOn,
} from "@fortawesome/free-solid-svg-icons";
import { BottomNav } from "../QuickNavigation/bottom";
import { carCompanies } from "../SystemData/ServiceData";
import { useNavigate } from "react-router-dom";
const HomeMobile = () => {
  const { user, cars } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const navShort = [
    {
      svg: <FontAwesomeIcon icon={faBusSimple} color="#fada5e" />,
      name: "Book Car",
      route: "/carbooking",
    },
    {
      svg: <FontAwesomeIcon icon={faCarOn} color="#fada5e" />,
      name: "Hire Car",
      route: "/carbooking",
    },
    {
      svg: <FontAwesomeIcon icon={faCar} color="#fada5e" />,
      name: "Request  Car",
      route: "/carbooking",
    },
  ];

  const filterdPopular = Object.values(cars).filter(
    (data) => data.category === "SUV"
  );
  const filterdHired = Object.values(cars).filter(
    (data) => data.category === "SUV"
  );

  const filterdBooked = Object.values(cars).filter(
    (data) => data.category === "coach"
  );
  const renderCompanies = carCompanies.map((data) => (
    <div className="company-div">
      <img src={data.image} alt={data.name} />
    </div>
  ));

  const shortNavRender = navShort.map((data) => (
    <div
      className="navgate-short"
      key={data.name}
      onClick={() => navigate(data.route)}
    >
      {data.svg}
      <p>{data.name}</p>
    </div>
  ));

  const popularRender = filterdPopular.map((data) => (
    <div className="car-card" key={data.id}>
      <div className="car-card-picture">
        <img src={data.picture} alt={data.name} />
      </div>

      <p className="car-card-name">{data.name}</p>
      <p className="car-card-desc">{data.description.slice(0, 25) + "..."}</p>
      <p className="car-card-price">
        Ksh. {parseInt(data.price).toLocaleString()}
      </p>
    </div>
  ));
  const hiredRender = filterdHired.map((data) => (
    <div className="car-card" key={data.id}>
      <div className="car-card-picture">
        <img src={data.picture} alt={data.name} />
      </div>

      <p className="car-card-name">{data.name}</p>
      <p className="car-card-desc">{data.description.slice(0, 25) + "..."}</p>
      <p className="car-card-price">
        Ksh. {parseInt(data.price).toLocaleString()}
      </p>
    </div>
  ));
  const bookedRender = filterdBooked.map((data) => (
    <div className="car-card" key={data.id}>
      <div className="car-card-picture">
        <img src={data.picture} alt={data.name} />
      </div>

      <p className="car-card-name">{data.name}</p>
      <p className="car-card-desc">{data.description.slice(0, 25) + "..."}</p>
      <p className="car-card-price">
        Ksh. {parseInt(data.price).toLocaleString()}
      </p>
    </div>
  ));

  return (
    <main>
      <div className="header-mobile">
        <div className="user_data_div">
          <div className="user_prof">
            <img src="/images/family-travelling-in-minivan-to-airport-people-on-public-transport-bus-or-van-are-travelling-to-airport-for-vacation-aerodrome-transfer-service-vehi-REMA69.jpg" />
          </div>
          <div className="user_prof_data">
            <h3>Hello,{user.displayName.slice(0, 10) + "..." ?? "There"}</h3>

            <p>Welcome back</p>
          </div>
        </div>
        <button className="rounded_button">
          <img src="/images/Untitled (4).png" height={35} width={35} />
        </button>
      </div>

      <div className="search_div">
        <div className="search_input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
          </svg>
          <input type="search" placeholder="Search" />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M2.75 6a.75.75 0 0 0 0 1.5h18.5a.75.75 0 0 0 0-1.5H2.75ZM6 11.75a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75Zm4 4.938a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path>
        </svg>
      </div>

      <div className="app_nav_short">{shortNavRender}</div>
      <div className="serch_by_brand">
        <div className="brand_header">
          <p>Search by Brands</p>
          <button className="button_yellow">See all</button>
        </div>
        <div className="companies-flex">{renderCompanies}</div>
      </div>
      <div className="car-mobile-div">
        <div className="brand_header">
          <p>Most Popular Cars</p>
          <button className="button_yellow">See all</button>
        </div>
        <div className="phone-car-grid">
          {popularRender.length > 0 ? (
            popularRender
          ) : (
            <div className="no-car">
              <p>No cars available</p>
            </div>
          )}
        </div>
      </div>
      <div className="car-mobile-div">
        <div className="brand_header">
          <p>Popular Hired Cars</p>
          <button className="button_yellow">See all</button>
        </div>
        <div className="phone-car-grid">
          {hiredRender.length > 0 ? (
            hiredRender
          ) : (
            <div className="no-car">
              <p>No cars available</p>
            </div>
          )}
        </div>
      </div>
      <div className="car-mobile-div">
        <div className="brand_header">
          <p>Popular Booked Cars</p>
          <button className="button_yellow">See all</button>
        </div>
        <div className="phone-car-grid">
          {bookedRender.length > 0 ? (
            bookedRender
          ) : (
            <div className="no-car">
              <p>No cars available</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </main>
  );
};

export { HomeMobile };
