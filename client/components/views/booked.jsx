import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Assets/Context";
import { Notifications } from "../notification/Notification";

import "./index.css";
import { FirebaseContext } from "../../src/Assets/Context/firebaseContext";

const BookedView = () => {
  const {
    serviceData,
    setServiceData,
    setNotification,
    setShowNotification,

    showNotification,
  } = useContext(AuthContext);

  const { Cart, setCart } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const updatedata = (event, data) => {
    const { name, value } = event.target;

    if (data.to === value) {
      console.log("invalid");
    } else {
      if (data.from === value) {
        console.log("invalid");
      } else {
        setServiceData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
    }
  };
  const systemDataUpdate = async () => {
    await setCart((prev) => {
      const bookingsAmount = prev.bookings.reduce((prev, current) => {
        return prev + current.toBePaid;
      }, 0);
      const hireAmount = prev.cars.reduce((prev, current) => {
        return prev + current.days * current.amount;
      }, 0);

      return {
        ...prev,
        bookingsAmount,
        hireAmount,
        totalAmount: hireAmount + bookingsAmount,
      };
    });
  };
  const DeletingFromBooking = async (id) => {
    const fill = Cart.bookings.filter((cars) => cars.id !== id);
    await setCart((prev) => {
      return {
        cars: prev.cars,
        bookings: fill,
        bookingsAmount: fill.reduce((prev, current) => {
          return prev + current.toBePaid;
        }, 0),
        hireAmount: prev.cars.reduce((prev, current) => {
          return prev + current.days * current.amount;
        }, 0),
        totalAmount: prev.hireAmount + prev.bookingsAmount,
      };
    });

    await systemDataUpdate();
    setNotification((prev) => {
      return (
        <p>
          You have Successfully <strong>Removed</strong>{" "}
          <b> {serviceData.name} </b> scheduled for <b>{serviceData.time}</b>
        </p>
      );
    });
    setShowNotification(true);

    navigate(-1);
  };

  console.log(serviceData);
  return (
    <main className="service-page">
      <div></div>
      {showNotification && <Notifications />}
      <div className="service-page-header">
        <div>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            onClick={() => navigate(-1)}
          >
            <path d="M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 111.06 1.06L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"></path>
          </svg>
        </div>
        <div className="trips-tag">
          <p>{serviceData.trips} Trip(s)/Day</p>
        </div>
      </div>
      <div className="service-page-section">
        <div className="service-page-image">
          <img src={serviceData.picture}></img>
          <div className="offer-tag">
            <p>{serviceData.offer} % OFF</p>
          </div>
        </div>
        <div className="service-page-data">
          <div className="c-d">
            <h3>Bus Name: {serviceData.name}</h3>
            <h3>
              Price:<span>{Math.round(serviceData.cost).toLocaleString()}</span>{" "}
              <p>
                Now:
                {Math.round(
                  serviceData.cost -
                    serviceData.cost * (serviceData.offer * 0.01)
                ).toLocaleString()}
              </p>
            </h3>
          </div>
          <div className="page-input">
            <label>From:</label>
            <select value={serviceData.from} name="from">
              <option>{serviceData.from}</option>
            </select>
          </div>

          <div className="page-input">
            <label>To:</label>
            <select value={serviceData.to} name="to">
              <option>{serviceData.to}</option>
            </select>
          </div>
          <div className="page-input">
            <label>Seat:</label>
            <select value={serviceData.seat} name="seat">
              <option>{serviceData.seat}</option>
            </select>
          </div>
          <div className="page-input">
            <label>Time:</label>
            <select value={serviceData.time} name="time">
              <option>{serviceData.time}</option>
            </select>
          </div>
          <div className="book-btn">
            <button onClick={() => navigate(-1)}>back</button>
            <button onClick={() => DeletingFromBooking(serviceData.id)}>
              Remove
            </button>
          </div>
        </div>
        <div className="card_footer"></div>
      </div>
    </main>
  );
};

export default BookedView;
