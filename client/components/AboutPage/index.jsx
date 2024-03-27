import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button/Index";
import { Footer } from "../footer/Footer";
import { Header } from "../Header/Header";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import {
  faFacebookF,
  faGoogle,
  faTiktok,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "./index.css";
import useScreenSize from "../utils/screensize";
const About = () => {
  const [index, setindex] = useState(0);

  const navigate = useNavigate();
  const images = [
    "../../../images/modern-bus-design-for-travel-and-tour-with-isolated-background-KPA7R0.jpg",
    "../../../images/taxi-in-the-rain-at-night-cologne-north-rhine-westphalia-germany-DWNMHR.jpg",
    "../../../images/close-up-of-a-white-coach-bus-facing-beautiful-morning-sky-with-rising-sun-2DP79P7.jpg",
    "../../../images/modern-high-speed-train-interior-DTMTP7.jpg",
    "../../../images/family-travelling-in-minivan-to-airport-people-on-public-transport-bus-or-van-are-travelling-to-airport-for-vacation-aerodrome-transfer-service-vehi-REMA69.jpg",
    "../../../images/black-pontiac-bonneville-4-door-hardtop-mid-1960s-and-people-enjoying-the-ride-on-salon-maisema-cruising-2019-salo-finland-may-18-2019-2DC39PJ.jpg",
    "../../../images/passengers-sitting-in-minibus-view-from-seat-behind-2G3CE11.jpg",
    "../../../images/yellow-taxi-new-york-city-DW58FN.jpg",
    "../../../images/beautiful-green-ford-f1-v8-pickup-truck-early-1950s-and-people-enjoying-the-ride-on-salon-maisema-cruising-2019-salo-finland-may-18-2019-2DC7H11.jpg",
    "../../../images/interior-of-modern-european-train-new-empty-railway-carriage-KCBC8W.jpg",
    "../../../images/isuzu-grand-toro-intercity-bus-presented-at-the-hannover-iaa-transportation-motor-show-germany-september-20-2022-2K3HXJF.jpg",
    "../../../images/london-black-cab-taxi-at-a-pedestrian-crossing-on-greys-inn-road-holborn-KN351W.jpg",
    "../../../images/white-coach-bus-on-the-road-at-summer-KNM886.jpg",
  ];
  const size = useScreenSize();
  return (
    <main className="fade">
      <div>
        {size.width > 1200 ? (
          <Header />
        ) : (
          <div className="header-mobile">
            <button className="rounded_button" onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"></path>
              </svg>
            </button>
            <h2>About Us</h2>
            <div className="cart_avatar" onClick={() => navigate("/mycars")}>
              <img src="/images/Untitled.png" height={35} width={35} />
            </div>
          </div>
        )}
        <section className="about-page">
          <div className="product-body">
            <div className="section_div">
              <p>
                Super pass travells is a travelling agency that offers
                travelling services in Kenya.
              </p>
              <p>
                It was founded in september 2022 by Maye Iris and a few
                partners.
              </p>
              <p>
                Users can book cars or hire cars using our agency where it will
                deliver its services safely to the users.
              </p>
              <p>
                Below are the various platforms where you can easily contact
                us...
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
                  <a
                    href="https://www.facebook.com/profile.php?id=100075061790231"
                    target="_blank"
                  >
                    <FontAwesomeIcon className="icon" icon={faFacebookF} />
                  </a>
                </div>
                <div className="icon-div">
                  <a
                    href={`https://wa.me/+254796331359?text=${encodeURIComponent(
                      `Hello🖐️ I Have Checked Services Of Zuri Travels and i would like to be one of your customers thank you.`
                    )}`}
                    target="_blank"
                  >
                    <FontAwesomeIcon className="icon" icon={faWhatsapp} />
                  </a>
                </div>
                <div className="icon-div">
                  <a target="_blank" href="https://Zuri-fdeeb.web.app/">
                    <FontAwesomeIcon className="icon" icon={faGoogle} />
                  </a>
                </div>
                <div className="icon-div">
                  <FontAwesomeIcon className="icon" icon={faTwitter} />
                </div>

                <div className="icon-div">
                  <FontAwesomeIcon className="icon" icon={faTiktok} />
                </div>
              </div>
              <p>Below are some of the servises we offer...</p>
              <Link to="/carhire">
                <Button text="Car Hire" class="button" />
              </Link>
              <Link to="/carbooking">
                <Button text="Car Booking" class="button" />
              </Link>
            </div>
            <div>
              <div>
                <div className="about-images">
                  <img src={images[index]}></img>
                  <button
                    onClick={() => {
                      index >= 1 && setindex((prev) => prev - 1);

                      console.log(images.length, index);
                    }}
                    className={index < 1 ? "inactive button" : "button"}
                  >
                    prev
                  </button>
                  <button
                    onClick={() => {
                      index < images.length - 1 && setindex((prev) => prev + 1);

                      console.log(images.length, index);
                    }}
                    className={
                      index >= images.length - 1 ? "inactive button" : "button"
                    }
                  >
                    next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default About;
