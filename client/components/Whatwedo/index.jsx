import { Header } from "../Header/Header";
import { Footer } from "../footer/Footer";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./index.css";
import {
  faFacebookF,
  faGoogle,
  faTiktok,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useScreenSize from "../utils/screensize";
const WhatWeDo = () => {
  const navigation = useNavigate();

  const size = useScreenSize();
  return (
    <main className="fade">
      {size.width > 1200 ? (
        <Header />
      ) : (
        <div className="header-mobile">
          <div className="back" onClick={() => navigation(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="18"
              height="18"
            >
              <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"></path>
            </svg>
            Back
          </div>
          <h2>What We Do</h2>
          <div className="cart_avatar" onClick={() => navigation("/mycars")}>
            <img src="/images/Untitled.png" height={35} width={35} />
          </div>
        </div>
      )}

      <section className="product-body">
        <div className="section_div">
          <h2>What We Do</h2>
          <hr></hr>
          <p>We offer Automotive services in the whole of kenya .</p>
          <p>
            Currently we have two categories of services that is the{" "}
            <Link to={"/carbooking"}>Booking</Link> and{" "}
            <Link to={"/carhire"}>Car Hire</Link> services.
          </p>
          <div className="contact-icon-div">
            <div className="icon-div">
              {" "}
              <a href={`tel:${+254796331359}`}>
                <FontAwesomeIcon className="icon" icon={faPhoneVolume} />
              </a>
            </div>
            <div className="icon-div">
              {" "}
              <a href="https://www.facebook.com/iris.maye.10" target="_blank">
                <FontAwesomeIcon className="icon" icon={faFacebookF} />
              </a>
            </div>
            <div className="icon-div">
              <a
                href={`https://wa.me/+254796094399?text=${encodeURIComponent(
                  `Hello🖐️ I Have Checked Services Of Zuri Travels and i would like to be one of your customers thank you.`
                )}`}
                target="_blank"
              >
                <FontAwesomeIcon className="icon" icon={faWhatsapp} />
              </a>
            </div>
            <div className="icon-div">
              <FontAwesomeIcon className="icon" icon={faGoogle} />
            </div>
            <div className="icon-div">
              <FontAwesomeIcon className="icon" icon={faTwitter} />
            </div>

            <div className="icon-div">
              <FontAwesomeIcon className="icon" icon={faTiktok} />
            </div>
          </div>
        </div>
        <div className="card-container">
          <div
            style={{
              backgroundImage: `url(./images/taxi-in-the-rain-at-night-cologne-north-rhine-westphalia-germany-DWNMHR.jpg)`,
            }}
            className="card"
          >
            <div className="c-content">
              <button onClick={() => navigation("/carbooking")}>
                Car Booking
              </button>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(./images/automotive-industry-concept-new-cars-production-line-brand-new-vehicles-on-the-factory-lot-M9RB7R.jpg)`,
            }}
            className="card"
          >
            <div className="c-content">
              <button onClick={() => navigation("/carhire")}> Car Hire</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export { WhatWeDo };
