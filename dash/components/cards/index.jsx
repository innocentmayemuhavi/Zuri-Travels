import React, { useState } from "react";
import "./index.css";
import { FirebaseContext } from "../../components/context/firebase";
import { useContext } from "react";

const CarCard = (car) => {
  const [showOptions, setShowOptions] = useState(false);
  const { cars, setCars } = useContext(FirebaseContext);


  const deleteCar = (id) => {
    const newCars = Object.values(cars).filter((car) => car.id !== id);

    setCars((prev) => {
      return {
        ...newCars,
      };
    });

    handleCardActionClick()
  };

  const handleCardActionClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="car-card" onClick={()=>{
      showOptions&&handleCardActionClick()
    }}>
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
            <div className="action" onClick={() => deleteCar(car.id)}>
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
          </div>
        )}
        <img src={car.picture} />
      </div>
      <div className="car-data">
        <p>Title:{car.name}</p>
        <p>Price:{car.price}</p>
      </div>
    </div>
  );
};

export { CarCard };
