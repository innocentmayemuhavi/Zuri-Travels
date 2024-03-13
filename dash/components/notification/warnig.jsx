import { useContext } from "react";
import { AppContext } from "../context/appcontext";
import "./index.css";
import { FirebaseContext } from "../context/firebase";

const WarningModal = (props) => {
  const {
    showWarning,
    setShowModal,
    carData,
    setShowNotification,
    setNotification,
  } = useContext(AppContext);
  const { cars, setCars } = useContext(FirebaseContext);
  const deleteCar = (id) => {
    const newCars = Object.values(cars).filter((car) => car.id !== id);

    setCars((prev) => {
      return {
        ...newCars,
      };
    });
    setShowModal(false);
    setNotification((prev) => {
      return <p>You Have deleted the car directly</p>;
    });
    setShowNotification(true);
  };
  return (
    <div
      className="overlay1"
      onClick={() => {
        setShowNav((prev) => !prev);
      }}
    >
      <div className="warning_modal ">
        <p>You sure you want to delete this car?</p>
        <div className="warning_modal_buttons">
          <button className="button" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="button" onClick={() => deleteCar(carData.id)}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export { WarningModal };
