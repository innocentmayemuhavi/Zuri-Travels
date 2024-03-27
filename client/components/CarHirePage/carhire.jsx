import { useContext } from "react";
import { BottomNav } from "../QuickNavigation/bottom";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";
import { useState } from "react";
import { CarHireCard } from "../Cards/hire";
import useScreenSize from "../utils/screensize";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import React from "react";
const CarHirePage = () => {
  const { cars } = useContext(FirebaseContext);
  const [searchValue, setSearchValue] = useState("");

  const filterCoach = Object.values(cars).filter(
    (data) => data.category === "coach"
  );

  const navigate = useNavigate();
  const filterdCars = Object.values(cars).filter(
    (data) =>
      data.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const carsRender = filterdCars.map((data) => (
    <CarHireCard {...data} key={data.id} />
  ));

  const size = useScreenSize();
  return (
    <main>
      {size.width > 1200 ? (
        <Header />
      ) : (
        <div className="header-mobile">
          <div className="back" onClick={() => navigate(-1)}>
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
          <h2>Car Hire</h2>
          <div className="cart_avatar" onClick={() => navigate("/mycars")}>
            <img src="/images/Untitled.png" height={35} width={35} />
          </div>
        </div>
      )}
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
          <input
            type="search"
            placeholder="Search"
            onChange={(event) => setSearchValue(event.target.value)}
          />
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
      <div>
        <div className="car-mobile-div">
          <div
            className={size.width <= 1000 ? "phone-car-grid" : "tab-car-grid"}
          >
            {carsRender.length > 0 ? (
              carsRender
            ) : (
              <div className="no-car">
                <p>No cars available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {size.width < 1200 && <BottomNav />}
    </main>
  );
};

export { CarHirePage };
