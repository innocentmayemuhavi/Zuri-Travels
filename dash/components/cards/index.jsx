import React, { useState } from "react";
import "./index.css";
import { FirebaseContext } from "../../components/context/firebase";
import { useContext } from "react";
import { AppContext } from "../context/appcontext";
import { useNavigate } from "react-router-dom";

const CarCard = (car) => {
  const [showOptions, setShowOptions] = useState(false);
  const { cars, setCars } = useContext(FirebaseContext);
  const { carData, setCarData, showModal, setShowModal } =
    useContext(AppContext);
  const navigator = useNavigate();

 

  const clearBookings = (id) => {
    const newBookings = Object.values(cars).map((car) => {
      return car.id === id ? { ...car, bookedSeats: [] } : car;
    });
    setCars((prev) => {
      return {
        ...newBookings,
      };
    });
  };

  const handleCardActionClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div
      className="car-card"
      onClick={() => {
        showOptions && handleCardActionClick();
      }}
    >
      <div className="car-image">
        <div className="card-action" onClick={handleCardActionClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M20 14a2 2 0 1 1-.001-3.999A2 2 0 0 1 20 14ZM6 12a2 2 0 1 1-3.999.001A2 2 0 0 1 6 12Zm8 0a2 2 0 1 1-3.999.001A2 2 0 0 1 14 12Z"></path>
          </svg>
        </div>
        {showOptions && (
          <div className="options">
            <div
              className="action"
              onClick={() => {
                setCarData({ ...car });
                setShowModal(true);
              }}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path>
              </svg>
              Delete
            </div>
            <div
              className="action"
              onClick={() => {
                setCarData({ ...car });
                navigator("/caredit");
              }}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
              </svg>
              Edit
            </div>
            {car.category === "coach" && (
              <div className="action" onClick={() => clearBookings(car.id)}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                >
                  <path d="M5.029 2.217a6.5 6.5 0 0 1 9.437 5.11.75.75 0 1 0 1.492-.154 8 8 0 0 0-14.315-4.03L.427 1.927A.25.25 0 0 0 0 2.104V5.75A.25.25 0 0 0 .25 6h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.491 6.491 0 0 1 2.314-1.998ZM1.262 8.169a.75.75 0 0 0-1.22.658 8.001 8.001 0 0 0 14.315 4.03l1.216 1.216a.25.25 0 0 0 .427-.177V10.25a.25.25 0 0 0-.25-.25h-3.646a.25.25 0 0 0-.177.427l1.358 1.358a6.501 6.501 0 0 1-11.751-3.11.75.75 0 0 0-.272-.506Z"></path>
                  <path d="M9.06 9.06a1.5 1.5 0 1 1-2.12-2.12 1.5 1.5 0 0 1 2.12 2.12Z"></path>
                </svg>
                Clear Bookings
              </div>
            )}
          </div>
        )}
        <img src={car.picture} />
      </div>
      <div className="car-data">
        <p>Title:{car.name}</p>
        <p>Price:{parseInt(car.price).toLocaleString()}</p>
      </div>
    </div>
  );
};

export { CarCard };
